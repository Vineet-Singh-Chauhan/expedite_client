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
import { Link, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import { useParams } from "react-router-dom";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const DragNDrop = ({ data }) => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const { isShowing, toggle } = useModal();
  const [list, setList] = useState(data);
  const dragPair = useRef();
  // const [dragPair, setDragPair] = useState({
  //   toPos: "",
  //   fromGrp: "",
  //   toGrp: "",
  //   taskId: "",
  // });
  const [dragging, setDragging] = useState(false);
  const [grpDragging, setGrpdragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  const handleDragStart = async (e, params) => {
    console.log("drag started", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    console.log(dragNode.current);
    console.log(dragItem.current);
    const grpId = dragNode.current.parentElement.getAttribute("data-grpid");
    const taskId = dragNode.current.getAttribute("data-taskid");
    console.log(grpId, taskId);
    dragPair.current = {
      fromGrp: grpId,
      taskId: taskId,
    };
    // setDragPair({ ...dragPair, fromGrp: grpId, taskId: taskId });
    // this makes fxn a kind of async type
    // console.log(dragPair);
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
  const handleDragEnd = async () => {
    console.log("ending drag");
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    const response = await axiosPrivate.post("/api/dragsettle", {
      ...dragPair.current,
      workspaceId: params.id,
    });
    setDragging(false);
    console.log(dragPair.current);
    console.log("drag end");
    dragPair.current = null;
  };
  const handleDragEnter = (e, params) => {
    // console.log("dran enter", params);
    const currentItem = dragItem.current;
    const grpId =
      e.target.parentElement.parentElement.getAttribute("data-grpid");
    console.log("toGRp", grpId);
    // setDragPair({
    //   ...dragPair,
    //   toGrp: grpId,
    //   toPos: params.itemI,
    // });
    dragPair.current = {
      ...dragPair.current,
      toGrp: grpId,
      toPos: params.itemI,
    };
    console.log(dragPair.current);
    if (e.target != dragNode.current) {
      // console.log("target not smae");
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
    // console.log(e.target);
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
    if (
      currentItem?.grpI === params.grpI &&
      currentItem?.itemI === params.itemI
    )
      return "dragCurrent dndItem";
    return "dndItem";
  };
  useState(() => {}, [list]);

  return (
    <>
      <div className="dragNDrop">
        {list.map((grp, grpI) => (
          <div
            // draggable
            // onDragStart={(e) => {
            //   handleGroupDragStart(e, { grpI });
            // }}
            key={grpI}
            data-grpid={grp.id}
            className={`dndGroup`}
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
                data-grpid={grp.id}
                data-taskid={item?.id}
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
                <TaskCard
                  data={item}
                  data-grpid={grp.id}
                  data-taskid={item?.id}
                />
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
