import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
//*css
import "./MyTasks.scss";
//*Components
import DragNDrop from "../../components/DragNDrop/DragNDrop";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

// const data = [
//   {
//     title: "MyTasks",
//     items: [1, 2, 3],
//   },
//   {
//     title: "My tasks",
//     items: [4, 5],
//   },
//   {
//     title: "Group3",
//     items: [4, 5],
//   },
//   {
//     title: "Group1",
//     items: [1, 2, 3],
//   },
//   {
//     title: "Group2",
//     items: [4, 5],
//   },
//   {
//     title: "Group3",
//     items: [4, 5],
//   },
// ];
let data = [];
const MyTasks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  let params = useParams();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const workspaceId = params.id;
    // console.log(workspaceId);
    const getTasks = async () => {
      try {
        const response = await axiosPrivate.post("/api/gettasks", {
          workspaceId: workspaceId,
        });
        // console.log(response?.data);
        data = response?.data;
      } catch (err) {
        // console.log(err?.response?.status);
        if (err?.response?.status === 401 || err?.response?.status === 404) {
          navigate("/user/404", { state: { from: location }, replace: true });
        } else {
          alert(err?.response?.data?.error || "Internal server error");
        }
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingScreen status={true} msg={"Loading tasks.."} />
      ) : (
        <DragNDrop data={data} />
      )}
    </div>
  );
};

export default MyTasks;
