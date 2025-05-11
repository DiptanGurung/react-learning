import React from 'react'

function Button({ children, className, onClick, like }) {

    return (
        <div>

            {/* <button className='w-fit px-10 py-3 bg-indigo-500 rounded-md' >{children}</button> */}
            <button className={`w-fit px-10 py-3 bg-indigo-500 rounded-md flex gap-2 ${className}`}
                onClick={onClick}
            >
                <span>{like}</span>
                {children}
            </button>

        </div>
    )
}

export default Button