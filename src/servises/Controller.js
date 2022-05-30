import Storage from "./Storage";

export default class Controller {
  constructor() {
    this.name = undefined;
    this.updateUsers = undefined;
    this.updatePosts = undefined;
    this.storage = new Storage();
    this.state = this.storage.getUser();
  }

  init() {
    this.url = "wss://alexa222-heroku.herokuapp.com/";
    
    //this.url = "ws://localhost:8080/ws";
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener("open", (evt) => {
      console.log("connected");
    });

    this.ws.addEventListener("message", (evt) => {
      this.packingData(evt.data, this.name, this.update);
    });

    this.ws.addEventListener("close", (evt) => {
    this.storage.save([])
      console.log("connection closed", evt);
    });

    this.ws.addEventListener("error", () => {
      console.log("error");
    });
  }

  /**
   * принимает данные сообщений и имя автора
   * обменивается ими с сервером
   */
  sendMessage(data, name) {
    console.log(this.ws, "this.ws");

    //console.log(this.ws.readyState, "readyState");

    if (this.ws.readyState === WebSocket.OPEN) {
      try {
        const jsonMSG = JSON.stringify(data);
        this.ws.send(jsonMSG);
        this.name = name;
        console.log(jsonMSG, "jsonMSG");
        return jsonMSG;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Соединение разорвано, переподключаю...");
      this.ws = new WebSocket(this.url);

    }
  }

  packingData(data, name) {
    const msg = JSON.parse(data);

    console.log(msg, "msg");

    if (msg.type === "message") {
      this.updatePosts([...msg.messages]);
      return { msg, name };
    } else if (msg.type === "connect") {
      console.log(this.state, "STATE");
      this.updateUsers([...msg.users]);
      this.updatePosts([...msg.posts]);
      return msg;
    } else if (msg.type === "add") {
      this.updateUsers([...msg.users]);
      return msg;
    } else if (msg.type === "exit") {
      this.updateUsers([...msg.users]);
      return msg.id;

      // отсюда ws.close() отключает вообще всех
      // мне надо, чтобы отваливался от WS только тот, кто нажал на кнопку
      // и чтобы заново чат пользователь активировался через ajax,
      //window.reload() не особо помогает
      // на the websocket protocol ходила - не помогло
      //выяснила, что прерывает соединение тот, кто его инициировал
      //как это красиво сделать на клиенте,
      //если сервер "думает",что клиент еще активен
      //
      //this.ws.close(1000,"disconnect");
    }
  }
}
