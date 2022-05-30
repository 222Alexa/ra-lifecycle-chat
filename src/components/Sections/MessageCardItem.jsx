import React from "react";
import { Text} from "../Atoms/Atoms";

const USID = require("usid");
const usid = new USID();

const MesssageCardItem = (props) => {
  //console.log(props, "messageCard");
  const classes =
    props.currentUser === props.author
      ? "out-msg " + props.type + "-card "
      : props.type + "-card ";
  
  return (
    <div key={usid.rand()} data-id={props.id} className={classes}>
      <div key={usid.rand()} className={props.className + "-header"}>
        <Text
          key={usid.rand()}
          {...props}
          text={props.currentUser === props.author ? "You" : props.author}
          className={"author"}
        ></Text>
        <Text
          key={usid.rand()}
          {...props}
          text={props.created}
          className={"time"}
        ></Text>
      </div>
      <div key={usid.rand()} className={props.className + "-content"}>
        <Text
          key={usid.rand()}
          {...props}
          text={props.message}
          className={"chat-" + props.type + " message"}
        ></Text>
      </div>
    </div>
  );
};

export default MesssageCardItem;
