import React, { useState, useRef } from "react";
import Panel from "./Panel";
import Modal from "./Molecules/Modal";

import Controller from "../servises/Controller";

const USID = require("usid");
const usid = new USID();

const controller = new Controller();
controller.init();

const Chat = (props) => {
  const [isModal, setModal] = useState(controller.state.length ? false : true);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const spinnerRef = useRef();

  let currentUser = controller.state[0];

  controller.updateUsers = setUsers;
  controller.updatePosts = setMessages;

  /*
  *Задержка отправки данных(некрасивая эмуляция)
  */
  const load = (value) => {
    spinnerRef.current = document.querySelector(".spinner-wrapper");
    spinnerRef.current.style["visibility"] = "visible";

    setTimeout(() => {
      createUser(value);
      isModal ? setModal(false) : console.log("");
    }, 3 * 1000);
  };

  /**Добавление в чат участника/сообщения */

  const handleAdd = (value, type) => {
    if (type === "login") {
      const isValid = isValidUserName(value);
console.log(isValid, 'isValid')
      if (isValid !== -1) {
        return false;
      } else {
        load(value);
        controller.state.push(value);
        controller.storage.save(controller.state);
      }
    }
    if (type === "message") {
      createPost(value, currentUser);
    }
  };

  /**
   * Cоздает новое сообщение
   * @param {*} value
   * @returns
   */
  const createPost = (data, name) => {
    const sendData = {
      type: "message",
      author: name,
      created: new Date().toLocaleString(),
      message: data,
    };
    controller.sendMessage(sendData, name);
    return sendData;
  };

  /**Поиск совпадений по никнейму среди юзеров */

  const isValidUserName = (value) => {
    return users.findIndex((item) => item.name === value);
  };

  /**
   * Создает нового участника
   * @returns
   */
  const createUser = (data) => {
    const sendData = {
      type: "add",
      user: data,
    };

    controller.sendMessage(sendData);
  };

  /** Выход из чата(клик по кнопке)*/

  const handleExit = async (value) => {
    exitUsers(currentUser, value);
    controller.state.splice(value, 1);
    controller.storage.save(controller.state);

    await setModal(true);
  };

  /**Удаление участника из чата */
  const exitUsers = (name) => {
    const searchItem = isValidUserName(name);

    const sendData = {
      type: "exit",
      id: users[searchItem].id,
    };

    controller.sendMessage(sendData, name);
  };

  //window.location.reload(); // без этого страница работает некорректно

  return (
    <React.Fragment>
      {isModal ? (
        <Modal
          visible={isModal}
          key={usid.rand()}
          type={"login"}
          name={"login"}
          title={"Добро пожаловаться!"}
          text={"Выберите псевдоним"}
          buttonText={"Ok"}
          onAdd={handleAdd}
        ></Modal>
      ) : (
        <Panel
          key={usid.rand()}
          onAdd={handleAdd}
          onExit={handleExit}
          usersList={users}
          messageList={messages}
          currentUser={currentUser}
          {...props}
        ></Panel>
      )}
    </React.Fragment>
  );
};

export default Chat;
