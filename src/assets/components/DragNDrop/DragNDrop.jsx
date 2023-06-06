import React, { useState, useRef, useEffect } from "react";
//*css
import "./DragNDrop.scss";
//*components
import TaskCard from "../TaskCard/TaskCard";
import AddTaskBtn from "../AddTaskBtn/AddTaskBtn";
import Modal from "../../utilities/Modal/Modal";
import useModal from "../../utilities/Modal/useModal";
import NewGroupDialog from "../NewGroupDialog/NewGroupDialog";
//*icons
import { AiOutlinePlus } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const DragNDrop = ({ data, workspaceId, workspaceName }) => {
  const { isShowing, toggle } = useModal();
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const [grpDragging, setGrpdragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  const handleDragStart = (e, params) => {
    console.log("drag started", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);

    // this makes fxn a kind of async type
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleGroupDragStart = (e, params) => {
    console.log("drag started", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);

    // this makes fxn a kind of async type
    setTimeout(() => {
      setGrpdragging(true);
    }, 0);
  };
  const handleDragEnd = () => {
    console.log("ending drag");
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    setDragging(false);
  };
  const handleDragEnter = (e, params) => {
    console.log("dran enter", params);
    const currentItem = dragItem.current;
    if (e.target != dragNode.current) {
      console.log("target not smae");
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };
  const handleGroupDragEnd = (e, params) => {
    console.log("dran enter", params);
    const currentItem = dragItem.current;
    console.log(e.target);
    if (e.target != dragNode.current) {
      console.log("target not smae from grp");
      setList((oldList) => {
        // let newList = [...oldList,]
        let newList = JSON.parse(JSON.stringify(oldList));
        newList.splice(params.grpI, 0, newList.splice(currentItem.grpI, 1)[0]);
        dragItem.current = params;
        return newList;
      });
    }
  };
  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI)
      return "dragCurrent dndItem";
    return "dndItem";
  };
  // let params = useParams();
  // const workspaceId = params.id;
  // const axiosPrivate = useAxiosPrivate();
  // async function getTasks() {
  //   // setList([]);
  //   const  tasks = await axiosPrivate.post("/api/gettasks", {
  //     workspaceId: workspaceId,
  //   });
  //   setList(tasks);
  //   // const List = [];
  //   // for (const e of data) {
  //     // const tasks = await axiosPrivate.post("/api/gettasks", {
  //       // taskGroupInfo: e,
  //       // workspaceId: workspaceId,
  //     // });
  //     // List.push({ name: e.name, id: e.id, items: tasks?.data });
  //     // setList([...list, { name: e.name, id: e.id, items: tasks?.data }]);
  //   // }
  //   // setList(List);
  // }
  // console.log(list);
  // // getTasks();
  // useEffect(() => {
  //   data && getTasks();
  // }, [data]);

  console.log(list);
  return (
    <>
      <div className="dragNDrop__settingsButton">
        {workspaceName}
        <Link to={`/user/${workspaceId}/settings`}>
          <FiSettings />
          Workspace Settings
        </Link>
      </div>
      <div className="dragNDrop">
        {list.map((grp, grpI) => (
          <div
            // draggable
            // onDragStart={(e) => {
            //   handleGroupDragStart(e, { grpI });
            // }}
            key={grpI}
            className="dndGroup"
            onDragEnter={
              dragging && !grp.items.length
                ? (e) => {
                    handleDragEnter(e, { grpI, itemI: 0 });
                  }
                : grpDragging
                ? (e) => {
                    handleGroupDragEnd(e, { grpI });
                  }
                : null
            }
          >
            <div className="groupTitle">{grp.name}</div>
            {grp?.items?.map((item, itemI) => (
              <div
                draggable
                key={itemI}
                className={dragging ? getStyles({ grpI, itemI }) : "dndItem"}
                onTouchMove={(e) => {
                  handleDragStart(e, { grpI, itemI });
                }}
                onDragStart={(e) => {
                  handleDragStart(e, { grpI, itemI });
                }}
                onDragEnter={
                  dragging
                    ? (e) => {
                        handleDragEnter(e, { grpI, itemI });
                      }
                    : null
                }
              >
                <TaskCard data={item} />
              </div>
            ))}
            <AddTaskBtn grpId={grp.id} />
          </div>
        ))}
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
  );
};

export default DragNDrop;
