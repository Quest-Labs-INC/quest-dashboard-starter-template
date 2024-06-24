import React from "react";
import Button from './Button'

const DescriptionArea = ({description, handleSubmit, handleChange}) => {
  return (
    <div className="description-form mt-5">
    <form onSubmit={handleSubmit}>
      <textarea
        value={description}
        onChange={handleChange}
        placeholder="Write your project description here..."
        className="border border-gray-300 rounded-md shadow-md mt-1 block w-full"
        rows="10"
      />
       <div className="mb-6 mt-5 flex items-center justify-center">
       <Button
            label="Save"
            handleFunction={handleSubmit}
        />
        </div>
    </form>
  </div>

  );
}

export default DescriptionArea;
