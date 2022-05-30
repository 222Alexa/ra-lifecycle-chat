import React from "react";

import Form from "./form/Form";

const USID = require("usid");
const usid = new USID();

const Modal = (data) => {
  // console.log(data, "modal")

  const props = {
    childData: data,
  };
  return (
    <React.Fragment>
      <div className="modal modal-active">
        <Form key={usid.rand()} onAdd={data.onAdd} type={"login"} {...props} />
      </div>
    </React.Fragment>
  );
};
export default Modal;
