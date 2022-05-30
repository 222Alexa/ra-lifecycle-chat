import React, { useRef } from "react";
import { Button, Textarea, Input, Text, Image } from "../../Atoms/Atoms";
import Spinner from "../loader/Spinner";

const USID = require("usid");
const usid = new USID();

const Form = (data) => {
  //console.log(data, "form");
  const inputRef = useRef();
  const tooltipeRef = useRef();
 
  tooltipeRef.current = document.querySelector(".tooltipe");
  

  const { childData, onAdd } = data;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputRef.current || inputRef.current.value === "") {
      tooltipeRef.current.style["visibility"] = "visible";

      return null;
    }
    tooltipeRef.current.style["visibility"] = "hidden";
   
    onAdd(inputRef.current.value, data.type);
    inputRef.current.value = "";
   
    
  };

  const handleInput = (e) => {
    e.preventDefault();

    inputRef.current = e.target;
  };

  return (
    <React.Fragment>
      <div className={"form-field-wrapper " + data.type + "-form"}>
        <Text
          key={usid.rand()}
          className={data.type + "-form-title"}
          text={childData.title}
        />
        <Image
          key={usid.rand()}
          type={childData.type + "-forms"}
          name={childData.type + "-avatar"}
          image={childData.image}
        />
        <form onSubmit={handleSubmit} className={childData.type + "-forms"}>
          <div className="spinner-wrapper" >
            <Spinner key={usid.rand()} type={data.type} />
          </div>
          <div className="form-content">
            {data.type === "message" ? (
              <Textarea
                key={usid.rand()}
                className={childData.name}
                name={childData.name}
                label={"New " + data.type}
                type="text"
                onChange={handleInput}
                value=""
              />
            ) : (
              <Input
                key={usid.rand()}
                className={childData.type}
                name={childData.name}
                label={childData.text}
                type="text"
                onChange={handleInput}
                value=""
              />
            )}
            <Text
              ref={tooltipeRef}
              key={usid.rand()}
              className={data.type + "-form-tooltipe tooltipe"}
              text={"*Заполните поле!"}
            />
          </div>
          <Button
            key={usid.rand()}
            id={usid.rand()}
            className={childData.name}
            text={childData.buttonText}
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default Form;
