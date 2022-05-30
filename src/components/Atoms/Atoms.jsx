import React from "react";

import PropTypes from "prop-types";

/**Изображение со ссылкой */
export const LinkImg = (props) => {
  if (!props) {
    return null;
  }

  const classes = props.className + "-link link__" + props.type;
  return (
    <>
      <a className={classes} href={props.image} target="blanc">
        <img
          className={props.type + "-image " + props.className + "-image"}
          src={props.image}
          alt={props.name}
        />
      </a>
    </>
  );
};

LinkImg.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
};

/**Картинка */

export const Image = (data) => {
 // console.log(data, "Image");
  if (!data.image) {
    return null;
  }
  return (
    <React.Fragment>
      <div className={data.type + "-image__wrapper"}>
        <img
          className={data.type + "-image "}
          src={data.image}
          alt={data.name}
        />
      </div>
    </React.Fragment>
  );
};
/*Image.defaultProps = {
  type: "user",
  image: "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png",
};*/

/**Текст */

export const Text = React.forwardRef((data, ref) => {
  //console.log(data, "text");
  if (!data) {
    return null;
  }
  return (
    <React.Fragment>
      <span ref={ref} className={data.className}>{data.text}</span>
    </React.Fragment>
  );
});

/**Кнопка */
export const Button = (data) => {
 // console.log(data, "btn");
  return (
    <React.Fragment>
      <button
        ref={data.btnRef}
        data-id={data.id}
        className={data.className + "__btn"}
        onClick={data.onClick ? () => data.onClick(data.id) : null}
      >
        {data.text}
      </button>
    </React.Fragment>
  );
};

Button.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    btnRef: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
};

/**Поле ввода в форме поиска */
export const Input = React.forwardRef((data, ref) => {
  //console.log(data);
  return (
    <React.Fragment>
      <div className="input-wrapper">
        <input
          ref={ref}
          className={data.className + "__input"}
          type={data.type}
          name={data.name}
          onChange={data.onChange}
        />
        <label className="label" name={data.label}>
          {data.label}
        </label>
      </div>
    </React.Fragment>
  );
});

/*Input.propTypes = {
  data: PropTypes.object.isRequired,
};*/

/**Поле ввода новой записи */

export const Textarea = React.forwardRef((data, ref) => {
  //console.log(data, "area");
  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="textarea-wrapper">
        <textarea
          ref={ref}
          rows={5}
          cols={35}
          className={data.className + "__input"}
          type={data.type}
          name={data.name}
          onChange={data.onChange}
        />
        <label className="label" name={data.name}>
          {data.label}
        </label>
      </div>
    </React.Fragment>
  );
});

/**Текстовая ссылка */

export const Link = (props) => {
  if (!props) {
    return null;
  }

  //console.log(props, "link");

  const classes = props.className + "-link";
  let result = React.createElement(
    props.tag,
    { className: props.className + "-text" },
    props.text
  );

  return (
    <>
      <a className={classes} href={props.url} target="blanc">
        {result}
      </a>
    </>
  );
};
Link.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }),
};
