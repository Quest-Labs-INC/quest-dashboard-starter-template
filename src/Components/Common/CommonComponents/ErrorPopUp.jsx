import React from 'react';

const ErrorPopUp = ({ closePopUp, errorMessage }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/2 p-6 rounded-lg">
                <h2 className="text-left text-3xl font-bold mb-4 text-red-500">Error!</h2>
                <p>{errorMessage}</p>
                <div className="mt-4">If you need assistance, please contact our support team.</div>
                <div className="flex justify-end mt-4">
                    <button
                        className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={closePopUp}
                        >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPopUp;