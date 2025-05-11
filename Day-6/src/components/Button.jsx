import React, { useState } from 'react'

const Button = React.memo(({ children, className = '', onclick }) => {
    console.log("Button Componets is: ");
    return (
        <div>
            <button
                onClick={onclick}
                className={`w-fit px-10 py-2 bg-indigo-500 rounded-xl text-white ${className}`} >{children}</button>
        </div>
    )
});

export default Button