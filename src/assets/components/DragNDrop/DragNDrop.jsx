import React, { useState, useRef } from "react";
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

const DragNDrop = ({ data }) => {
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
  return (
    <>
      <div className="dragNDrop">
        {list.map((grp, grpI) => (
          <div
            draggable
            onDragStart={(e) => {
              handleGroupDragStart(e, { grpI });
            }}
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
            <div className="groupTitle">{grp.title}</div>
            {grp.items.map((item, itemI) => (
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
                {/* <p>{item}</p> */}
                <TaskCard />
              </div>
            ))}
            <AddTaskBtn />
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
