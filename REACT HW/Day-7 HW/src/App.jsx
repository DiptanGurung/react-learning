import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [userName, setUserName] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [submittedData, setSubmittedData] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      userName,
      caption,
      image: imagePreview,
    };

    setSubmittedData([...submittedData, newEntry]) ;
    setUserName("")
    setCaption("")
    setImage("")
  }

  return (
    <>

      <div className="bg-indigo-500 w-full h-[700px] flex flex-row justify-around border-2 border-black p-5">
        <h1 className="text-xl absolute top-2 left-4">PROGRAM</h1>

        <div className="bg-blue-200 flex flex-col justify-center items-center my-20 px-10 py-5 rounded-xl">
          <h1 className="mb-10 text-lg font-semibold underline">FORMS</h1>

          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start gap-8">
            <div>
              <label htmlFor="userName">UserName:</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                className="border-2 border-green-400 px-2 ml-2"
                required
              />
            </div>

            <div>
              <label htmlFor="caption">Caption:</label>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                className="border-2 border-green-400 px-2 ml-2"
                required
              />
            </div>

            <div>
              <label htmlFor="image">Upload Image:</label>
              <input type="file" onChange={handleImageChange} className="ml-2" required />
            </div>

            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="flex flex-wrap justify-center items-start my-20 gap-6 bg-white rounded-xl p-5 min-w-[300px]">
          {submittedData.length > 0 ? (
            submittedData.map((entry, index) => (
              <div
                key={index}
                className="border p-4 rounded shadow-md w-72 bg-gray-100"
              >
                <h2 className="text-lg font-semibold mb-2 underline">Submitted Data:</h2>
                <p><strong>Username:</strong> {entry.userName}</p>
                <p><strong>Caption:</strong> {entry.caption}</p>
                <img
                  src={entry.image}
                  alt="Uploaded Preview"
                  className="w-full h-60 object-fit mt-4 rounded"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">Submit the form to see previews here.</p>
          )}
        </div>

      </div>

    </>
  )
}

export default App
