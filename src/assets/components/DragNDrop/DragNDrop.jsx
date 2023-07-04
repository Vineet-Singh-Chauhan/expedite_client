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
import { TbDragDrop } from "react-icons/tb";
import { FiEdit2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Editable from "../../utilities/EditableInput/EditableInput";

const DragNDrop = ({ data }) => {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const { isShowing, toggle } = useModal();
  const [list, setList] = useState(data);
  console.log(list);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  const dragPair = useRef();
  const inputRef = useRef();
  const handleDragStart = async (e, params) => {
    e.stopPropagation();
    console.log("drag started", params);
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
    console.log(dragPair.current);
    setTimeout(() => {
      setDragging(true);
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
    dragPair.current = null;
  };
  const handleDragEnter = (e, params) => {
    e.stopPropagation();
    console.log("dran enter", params);
    const currentItem = dragItem.current;
    const grpId =
      e.target?.parentElement?.parentElement.getAttribute("data-grpid");
    dragPair.current = {
      ...dragPair.current,
      toGrp: grpId,
      toPos:
        typeof params.itemI === typeof undefined ? params.grpI : params.itemI,
    };
    console.log(dragPair.current);
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
          newList[params.grpI].items.splice(
            params.itemI,
            0,
            newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
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

  const handleChange = async (e, grpId) => {
    e.preventDefault();
    const name = e.target.value.trim();
    // console.log(name, grpId);
    if (name === "") return;
    const response = await axiosPrivate.post("/api/updateTaskGroupName", {
      name: name,
      grpId: grpId,
      workspaceId: params.id,
    });
  };

  return (
    <>
      <div className="dragNDrop">
        {list.map((grp, grpI) => (
          <div
            draggable
            onDragStart={(e) => {
              e.stopPropagation();
              handleDragStart(e, { grpI });
            }}
            key={grpI}
            data-grpid={grp.id}
            className={`dndGroup`}
            onDragEnter={
              dragging && typeof dragItem.current?.itemI === typeof undefined
                ? (e) => {
                    handleDragEnter(e, { grpI });
                  }
                : dragging && !grp.items.length
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
                    handleChange(e, grp.id);
                  }}
                />
              </Editable>
            </div>
            {grp?.items?.map((item, itemI) => (
              <div
                draggable
                key={itemI}
                data-grpid={grp.id}
                data-taskid={item?.id}
                className={dragging ? getStyles({ grpI, itemI }) : "dndItem"}
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
                  grpId={grp.id}
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
