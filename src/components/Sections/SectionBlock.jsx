import React from "react";

const SectionBlock = React.forwardRef(({ className, children }, ref) => {
  //console.log(ref, "ref");
  //console.log(className, children, "SectionBlock");

  return (
    <React.Fragment>
      <div className={className + "-container"} ref={ref}>
        {React.Children.map(children, (child, idx) => {
          //  console.log(child)
          if (child.type === "user" && idx > 1) {
            return;
          }
          return child;
        })}
      </div>
    </React.Fragment>
  );
});

export default SectionBlock;
