import React from "react";

const Button = ({
    label = "Click here",
    handleFunction
}) => {
  return (
         <button
         onClick={handleFunction}
         type="submit"
         className="
             h-10
             px-5
             text-lg
             text-black-100
             rounded-lg
             shadow
             transition-colors
             duration-150
             focus:shadow-outline
             hover:bg-green-500
             "
       >
         { label }
       </button>
  );
}

export default Button;