import React from "react";
import ReactDOM from "react-dom";
//*CSS
import "./InfoTray.scss";
//*Icons
import { AiFillExclamationCircle, AiOutlineAlert } from "react-icons/ai";

const InfoTray = ({ isShowing, hide, Content, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="InfoTray__container">
            <div className="InfoTray">
              <AiFillExclamationCircle className="infoTrayIcon" />
              {Content}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default InfoTray;
