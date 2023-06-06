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

const MyTasks = () => {
  const [data, setData] = useState();
  const [workspaceInfo, setWorkspaceInfo] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  let params = useParams();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const workspaceId = params.id;

    // console.log(workspaceId);
    // const getTasks = async () => {
    //   try {
    //     const response = await axiosPrivate.post("/api/gettaskgrp", {
    //       workspaceId: workspaceId,
    //     });
    //     console.log(response?.data);
    //     const taskGrps = response?.data;
    //     const getTasks = async () => {
    //       taskGrps.forEach(async (e) => {
    //         const res = await axiosPrivate.post("/api/gettasks", {
    //           taskGroupInfo: e,
    //           workspaceId: workspaceId,
    //         });
    //         console.log({ name: e.name, id: e.id, items: res?.data });
    //         data = [...data, { name: e.name, id: e.id, items: res?.data }];
    //         data.push({ name: e.name, id: e.id, items: res?.data });
    //       });
    //     };
    //     await getTasks();
    //     data = taskGrps;
    //     console.log(data);
    //   } catch (err) {
    //     // console.log(err?.response?.status);
    //     if (err?.response?.status === 401 || err?.response?.status === 404) {
    //       navigate("/user/404", { state: { from: location }, replace: true });
    //     } else {
    //       console.log(err);
    //       alert(err?.response?.data?.error || "Internal server error");
    //     }
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    async function getTasks() {
      try {
        const response = await axiosPrivate.post("/api/gettasks", {
          workspaceId: workspaceId,
        });
        const tasks = response?.data.tasks;
        setData(tasks);
        setWorkspaceInfo(response?.data?.workspaceInfo);
      } catch (err) {
        // console.log(err?.response?.status);
        if (err?.response?.status === 401 || err?.response?.status === 404) {
          navigate("/user/404", { state: { from: location }, replace: true });
        } else {
          console.log(err);
          alert(err?.response?.data?.error || "Internal server error");
        }
      } finally {
        setLoading(false);
      }
    }
    getTasks();
  }, []);
  return (
    <div>
      {loading ? (
        <LoadingScreen status={true} msg={"Loading tasks.."} />
      ) : (
        <DragNDrop
          data={data}
          workspaceId={workspaceInfo.id}
          workspaceName={workspaceInfo.name}
        />
      )}
    </div>
  );
};

export default MyTasks;
