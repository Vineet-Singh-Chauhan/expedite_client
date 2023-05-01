import React from "react";
import ReactDOM from "react-dom";
//*css
import "./LoadingScreen.scss";
//*components
import Spinner from "../../utilities/Spinner/Spinner";
//*icons
import { MdError } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
const LoadingScreen = ({ status, msg, hide }) =>
  status
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className="LoadingScreen"
            onClick={() => {
              status === "error" || status === "success" ? hide() : undefined;
            }}
          >
            {status === "error" ? (
              <div className="contentDiv">
                <MdError className="error icon" />
                <p>{msg || "An error occured!"}</p>
              </div>
            ) : status === "success" ? (
              <div>
                <AiFillCheckCircle className="success icon" />
                <p>{msg || "Success"}</p>
              </div>
            ) : (
              <div>
                <Spinner size={"40px"} stroke={"4px"} />
                <p>Loading please wait ...</p>
              </div>
            )}
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
export default LoadingScreen;
