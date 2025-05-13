import React from 'react'

function Card() {
  return (
    <>
    
    <div className="flex flex-col justify-center items-center my-20 bg-white rounded-xl p-5 min-w-[300px]">
        {submittedData ? (
          <>
            <h2 className="text-lg font-semibold mb-2 underline">Submitted Data:</h2>
            <p><strong>Username:</strong> {submittedData.userName}</p>
            <p><strong>Caption:</strong> {submittedData.caption}</p>
            <img
              src={submittedData.image}
              alt="Uploaded Preview"
              className="w-60 h-60 object-cover mt-4 rounded border"
            />
          </>
        ) : (
          <p className="text-gray-500">Submit the form to see preview here.</p>
        )}
      </div>

    </> 
 )
}

export default Card