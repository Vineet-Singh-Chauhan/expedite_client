import React, { useRef } from "react";

//*CSS
import "./UserInfo.scss";
//*Components
import Editable from "../../../utilities/EditableInput/EditableInput";
import Modal from "../../../utilities/Modal/Modal";
import useModal from "../../../utilities/Modal/useModal";
import ChangePassword from "../../../components/SettingsComponents/ChangePassword/ChangePassword";
import MainButton from "../../../utilities/MainButton/MainButton";
//*icons
import { BsFillInfoCircleFill } from "react-icons/bs";

const UserInfo = () => {
  const inputRef = useRef();
  const { isShowing, toggle } = useModal();
  const handlePasswordChange = () => {};
  return (
    <div className="settings__userInfo">
      <h2>User Information</h2>
      <hr />
      <div>
        <div className="infoWrapper">
          <div className="infoTitle">Username</div>
          <div className="infoVal">
            <Editable
              text={"Name"}
              placeholder="First Name"
              type="input"
              childRef={inputRef}
            >
              <input
                className="settingInput"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={inputRef}
              />
            </Editable>
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">Date of Birth</div>
          <div className="infoVal">
            <Editable text={"DOB"} type="input" childRef={inputRef}>
              <input
                className="settingInput"
                type="date"
                name="dob"
                ref={inputRef}
              />
            </Editable>
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">Email</div>
          <div className="infoVal">
            <span>vineetksc@gmail.com</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <BsFillInfoCircleFill className="infoBtn" />
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">Password</div>
          <div className="infoVal">
            <span>*********</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <MainButton title="Change Password" onClick={toggle} />
            <Modal
              isShowing={isShowing}
              hide={toggle}
              Content={<ChangePassword />}
            />
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">About</div>
          <div className="infoVal">
            <Editable
              text={"Bio.."}
              placeholder="First Name"
              type="input"
              childRef={inputRef}
            >
              <textarea
                className="settingInput"
                type="text"
                name="firstName"
                placeholder="First Name"
                ref={inputRef}
                rows={5}
              />
            </Editable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
