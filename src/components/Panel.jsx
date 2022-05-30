import React from "react";
import Form from "./Molecules/form/Form";
import SectionBlock from "./Sections/SectionBlock";

import MesssageCardItem from "./Sections/MessageCardItem";

import UserCardItem from "./Sections/UserCardItem";

import { Button, Text } from "./Atoms/Atoms";

const USID = require("usid");
const usid = new USID();

const Panel = (data) => {
  //console.log(data, "PANEL");

  const props = {
    childData: data,
    onAdd: data.onAdd,
    onExit: data.onExit,
  };
  return (
    <>
      <div className="panel-container">
        <div className="users-box">
          <h3 className="users-box-header">
            <Text className="users-box-" type="title" text={"Users"} />
          </h3>

          <SectionBlock key={usid.rand()} className="users">
            {data.usersList.map((item) => {
              return (
                <UserCardItem
                  key={usid.rand()}
                  {...item}
                  currentUser={data.currentUser}
                  className={"user"}
                />
              );
            })}
            <div className="users-box__btn-block">
              <Button
                key={usid.rand()}
                id={usid.rand()}
                className={"chat-exit"}
                text={"Exit"}
                onClick={props.onExit}
              />
            </div>
          </SectionBlock>
        </div>
        <div className="messages-box">
          <h3 className="messages-box-header">
            <Text className="messages-box-" type="title" text={"Messages"} />
          </h3>

          <SectionBlock key={usid.rand()} className="messages">
            {data.messageList.map((item) => {
              return (
                <MesssageCardItem
                  key={usid.rand()}
                  {...item}
                  currentUser={data.currentUser}
                  className={"message"}
                />
              );
            })}
          </SectionBlock>

          <Form key={usid.rand()} type={"message"} {...props}></Form>
        </div>
      </div>
    </>
  );
};
export default Panel;
