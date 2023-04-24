import React from "react";
import ReactDOM from "react-dom";
//*CSS
import "./Modal.scss";
//*Icons
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ isShowing, hide, Content, ...props }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modalContainer">
            <div className="modal">
              <AiFillCloseCircle
                className="ml-auto modalCloseBtn"
                onClick={hide}
              />
              {Content}
              <span className="overlay" onClick={hide}></span>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
