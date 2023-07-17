import React, { useState, useRef, useEffect, lazy } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import useSocket from "../../../hooks/useSocket";
import useTask from "../../../hooks/useTask";
import useModal from "../../utilities/Modal/useModal";

//*css
import "./DragNDrop.scss";

//*components
const TaskCard = lazy(() => import("../TaskCard/TaskCard"));
const AddTaskBtn = lazy(() => import("../AddTaskBtn/AddTaskBtn"));
const Modal = lazy(() => import("../../utilities/Modal/Modal"));
const NewGroupDialog = lazy(() => import("../NewGroupDialog/NewGroupDialog"));
const Editable = lazy(() =>
  import("../../utilities/EditableInput/EditableInput")
);
const LoadingScreen = lazy(() => import("../LoadingScreen/LoadingScreen"));
//*icons
import { AiOutlinePlus } from "react-icons/ai";

let selectedWorkspaceCompare;

const DragNDrop = () => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isShowing, toggle } = useModal();
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  const dragPair = useRef();
  const inputRef = useRef();
  const { user } = useAuth();
  const location = useLocation();
  const { list, setList } = useTask();

  const handleDragStart = async (e, params) => {
    e.stopPropagation();
    // console.log("drag started", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    const grpId =
      dragNode.current?.parentElement?.getAttribute("data-grpid") ||
      dragNode.current?.getAttribute("data-grpid");
    const taskId = dragNode.current?.getAttribute("data-taskid");
    dragPair.current = {
      fromGrp: grpId,
      taskId: taskId,
      fromPos:
        typeof params.itemI === typeof undefined ? params.grpI : params.itemI,
    };
    // console.log(dragPair.current);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = async () => {
    // console.log("ending drag");
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    const response = await axiosPrivate.post("/api/dragsettle", {
      ...dragPair.current,
      workspaceId: params.id,
    });
    setDragging(false);
    dragPair.current = null;
    socket.emit("dragEnd", { workspaceId: params.id });
  };

  const handleDragEnter = (e, params) => {
    e.stopPropagation();
    // console.log("dran enter", params);
    const currentItem = dragItem.current;
    const grpId =
      e.target?.parentElement?.parentElement.getAttribute("data-grpid");
    dragPair.current = {
      ...dragPair.current,
      toGrp: grpId,
      toPos:
        typeof params.itemI === typeof undefined ? params.grpI : params.itemI,
    };
    // console.log(dragPair.current);
    if (e.target != dragNode.current) {
      if (typeof currentItem.itemI === typeof undefined) {
        setList((oldList) => {
          // let newList = [...oldList,]
          let newList = JSON.parse(JSON.stringify(oldList));
          newList.splice(
            params.grpI,
            0,
            newList.splice(currentItem.grpI, 1)[0]
          );
          dragItem.current = params;
          return newList;
        });
      } else {
        setList((oldList) => {
          let newList = JSON.parse(JSON.stringify(oldList));
          newList[params.grpI].tasks.splice(
            params.itemI,
            0,
            newList[currentItem.grpI].tasks.splice(currentItem.itemI, 1)[0]
          );
          dragItem.current = params;
          return newList;
        });
      }
    }
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem?.grpI === params.grpI &&
      currentItem?.itemI === params.itemI
    )
      return "dragCurrent dndItem";
    return "dndItem";
  };

  const changeGrpName = async (e, grpId) => {
    e.preventDefault();
    const name = e.target.value.trim();
    // console.log(name, grpId);
    if (name === "") return;
    setList((oldList) => {
      const index = oldList.findIndex((ele) => ele._id === grpId);
      oldList[index].name = name;
      return [...oldList];
    });
    const response = await axiosPrivate.post("/api/updateTaskGroupName", {
      name: name,
      grpId: grpId,
      workspaceId: params.id,
    });
  };

  const getTasks = async () => {
    try {
      const taskResponse = await axiosPrivate.post("/api/gettasks", {
        workspaceId: params.id,
      });
      const tasks = taskResponse?.data?.taskGroups;
      setList(tasks);
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 404) {
        navigate("/user/404", { state: { from: location }, replace: true });
      } else {
        console.log(err);
        alert(err?.response?.data?.error || "Internal server error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
    selectedWorkspaceCompare = params.id;
    return () => {
      console.log("clean up");
      socket.off("setup", user);
    };
  }, []);

  useEffect(() => {
    socket.on("settleDrag", (newMessageRecieved) => {
      if (
        !selectedWorkspaceCompare ||
        selectedWorkspaceCompare !== newMessageRecieved.workspaceId
      ) {
        //give notification
      } else {
        getTasks();
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen status={true} msg={"Loading tasks.."} />
      ) : (
        <>
          <div className="dragNDrop">
            {list?.map((grp, grpI) => (
              <div
                draggable
                onDragStart={(e) => {
                  e.stopPropagation();
                  handleDragStart(e, { grpI });
                }}
                key={grpI}
                data-grpid={grp._id}
                className={`dndGroup`}
                onDragEnter={
                  dragging &&
                  typeof dragItem.current?.itemI === typeof undefined
                    ? (e) => {
                        handleDragEnter(e, { grpI });
                      }
                    : dragging && !grp.tasks.length
                    ? (e) => {
                        handleDragEnter(e, { grpI, itemI: 0 });
                      }
                    : null
                }
              >
                <div className="groupTitle">
                  <Editable
                    text={grp.name}
                    placeholder="Group Name"
                    type="input"
                    childRef={inputRef}
                    className="groupNameField"
                  >
                    <input
                      className="groupNameFieldInput"
                      type="text"
                      name="groupName"
                      placeholder="Group Name"
                      ref={inputRef}
                      onBlur={(e) => {
                        changeGrpName(e, grp._id);
                      }}
                    />
                  </Editable>
                </div>
                {grp?.tasks?.map((item, itemI) => (
                  <div
                    draggable
                    key={itemI}
                    data-grpid={grp._id}
                    data-taskid={item?._id}
                    className={
                      dragging ? getStyles({ grpI, itemI }) : "dndItem"
                    }
                    onDragStart={(e) => {
                      e.stopPropagation();
                      handleDragStart(e, { grpI, itemI });
                    }}
                    onDragEnter={
                      dragging
                        ? (e) => {
                            e.stopPropagation();
                            handleDragEnter(e, { grpI, itemI });
                          }
                        : null
                    }
                  >
                    <TaskCard
                      data={item}
                      grpId={grp._id}
                      data-grpid={grp._id}
                      data-taskid={item?._id}
                    />
                  </div>
                ))}
                <AddTaskBtn grpId={grp._id} />
              </div>
            ))}
            {/* </TaskContext.Consumer> */}
            <div className="dndGroup">
              <div className="groupTitle">Create New Group</div>
              <button className="createGrp__btn" onClick={toggle}>
                <AiOutlinePlus /> Create Group
              </button>
            </div>
          </div>
          <Modal
            Content={<NewGroupDialog hide={toggle} />}
            isShowing={isShowing}
            hide={toggle}
          />
        </>
      )}
    </>
  );
};

export default DragNDrop;
