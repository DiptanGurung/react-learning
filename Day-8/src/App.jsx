import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Heart, HeartOff, Trash2 } from 'lucide-react'

function App() {
  const [userName, setUserName] = useState("")
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [submittedData, setSubmittedData] = useState([])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const toggleLike = (index) => {
    const updatedData = [...submittedData];
    updatedData[index].liked = !updatedData[index].liked;
    setSubmittedData(updatedData);
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      userName,
      caption,
      image: imagePreview,
      liked: false,
    };

    setSubmittedData([...submittedData, newEntry]);
    setUserName("")
    setCaption("")
    setImage("")
    setImagePreview("")
  }

  return (
    <>

      <div className="bg-black w-screen min-h-screen flex flex-col items-center gap-10 border-8 border-red-500 rounded-xl shadow-lg p-6">



        <div className="bg-blue-200 flex flex-col w-full max-w-md justify-center px-6 py-10 my-10 rounded-xl shadow-lg">

          <h1 className="text-2xl text-black font-bold underline mb-8 text-center">User Submission Form</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-1 font-medium text-gray-700">Username</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                className="border-2 border-green-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="caption" className="mb-1 font-medium text-gray-700">Caption</label>
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                type="text"
                className="border-2 border-green-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="image" className="mb-1 font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 px-6 py-3 rounded-lg text-white font-semibold hover:text-pink-500 hover:bg-blue-400 active:bg-red-500 transition-all"
            >
              Submit
            </button>
          </form>

        </div>

        <div className="bg-white rounded-2xl p-6 w-full max-w-5xl shadow-xl overflow-y-auto">
          <div className="flex flex-wrap gap-6">
            {submittedData.length > 0 ? (
              submittedData.map((entry, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-5 rounded-xl shadow-md w-72 bg-gray-100 flex-shrink-0"
                >
                  <h2 className="text-lg font-bold mb-2 underline text-gray-800">Submitted Data</h2>
                  <p className="text-sm"><strong>Username:</strong> {entry.userName}</p>
                  <p className="text-sm"><strong>Caption:</strong> {entry.caption}</p>
                  <img
                    src={entry.image}
                    alt="Uploaded Preview"
                    className="w-full h-48 object-cover mt-3 rounded-lg"
                  />
                  <div className="mt-4 flex justify-center gap-20">
                    {entry.liked ? (
                      <Heart
                        className="text-red-500 cursor-pointer"
                        onClick={() => toggleLike(index)}
                        fill="red"
                      />
                    ) : (
                      <HeartOff
                        className="text-gray-500 cursor-pointer"
                        onClick={() => toggleLike(index)}
                      />
                    )}

                    <Trash2
                      className="text-gray-600 hover:text-red-600 cursor-pointer"
                      onClick={() => handleDelete(index)}
                    />
                  </div>

                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full text-lg">Submit the form to see previews here.</p>
            )}
          </div>
        </div>


      </div>

    </>
  )
}

export default App
