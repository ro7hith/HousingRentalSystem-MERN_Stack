import React from "react";

function Button (props) {

    return (
        <button {...props} className={(props.full ? "w-full" : "") + (props.noMargins ? "" : " mt-5") +  " text-white bg-gray-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"}>{props.children}</button>
    )

}

export default Button;
