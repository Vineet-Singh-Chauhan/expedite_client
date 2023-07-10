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
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const UserInfo = () => {
  const { user, setUser } = useAuth();
  const inputRef = useRef();
  const { isShowing, toggle } = useModal();
  const axiosPrivate = useAxiosPrivate();
  const handlePasswordChange = () => {};
  const handleChange = async (e) => {
    try {
      const response = await axiosPrivate.post("/api/updateuser", {
        [e.target.name]: e.target.value,
      });
      if (response?.status == 201) {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };
  return (
    <div className="settings__userInfo">
      <h2>User Information</h2>
      <hr />
      <div>
        <div className="infoWrapper">
          <div className="infoTitle">First Name</div>
          <div className="infoVal">
            <Editable
              text={user.firstName}
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
                onBlur={handleChange}
              />
            </Editable>
          </div>
        </div>
        <div className="infoWrapper">
          <div className="infoTitle">Last Name</div>
          <div className="infoVal">
            <Editable
              text={user.lastName}
              placeholder="Last Name"
              type="input"
              childRef={inputRef}
            >
              <input
                className="settingInput"
                type="text"
                name="lastName"
                placeholder="Last Name"
                ref={inputRef}
                onBlur={handleChange}
              />
            </Editable>
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">Date of Birth</div>
          <div className="infoVal">
            <Editable
              text={
                user.dob
                  ? new Intl.DateTimeFormat("en-US").format(new Date(user.dob))
                  : "Set Date of Birth"
              }
              type="input"
              childRef={inputRef}
            >
              <input
                className="settingInput"
                type="date"
                name="dob"
                ref={inputRef}
                onBlur={handleChange}
              />
            </Editable>
          </div>
        </div>

        <div className="infoWrapper">
          <div className="infoTitle">Email</div>
          <div className="infoVal">
            <span>{user.email}</span>
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
              text={user.about}
              placeholder="Describe yourself"
              type="input"
              childRef={inputRef}
            >
              <textarea
                className="settingInput"
                type="text"
                name="about"
                placeholder="Describe yourself"
                ref={inputRef}
                rows={4}
                onBlur={handleChange}
              />
            </Editable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
