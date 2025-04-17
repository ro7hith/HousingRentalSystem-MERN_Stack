import React from "react";

function Input (props) {

    return (
        <input 
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...props}
        />
    );

}

export default Input;
