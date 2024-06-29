import React from 'react';

const DeletePopUp = ({closeDelete, handleFunction}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-left text-lg font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to <span className="text-red-500">permanently remove</span> this item?</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={closeDelete}
                        >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                        onClick={handleFunction}
                        >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopUp;