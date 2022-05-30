import React from "react";
import { Text, Image } from "../Atoms/Atoms";

const USID = require("usid");
const usid = new USID();

const UserCardItem = (props) => {
 
  return (
    <div
      key={usid.rand()}
      data-id={props.id}
      className={props.className + "-card"}
    >
      <div key={usid.rand()} className={props.className + "-content"}>
        <Image key={usid.rand()} {...props}></Image>
        <Text
          key={usid.rand()}
          {...props}
          text={
            props.name === props.currentUser ? props.name + "(You)" : props.name
          }
        ></Text>
      </div>
    </div>
  );
};

export default UserCardItem;
