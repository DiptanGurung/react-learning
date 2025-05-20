import { useState } from 'react';
import { X, Upload, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ResumeModal() {
  const { isModalOpen, setIsModalOpen, addResume } = useAppContext();

  const [resumeName, setResumeName] = useState('');
  const [experience, setExperience] = useState('');
  const [file, setFile] = useState(null);
  const [targetResume, setTargetResume] = useState(false);

  const canSave = resumeName.trim() !== '';

  const handleSave = () => {
    if (!canSave) return;

    const newResume = {
      id: Date.now(),
      resumeName,
      experience,
      file,
      targetResume,
    };

    console.log('Saving resume with:', {
      resumeName,
      experience,
      file,
      targetResume,
    });

    addResume(newResume);

    console.log('Saved resume:', newResume);
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white w-full max-w-xl rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create a resume</h2>
          <button onClick={() => setIsModalOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">RESUME NAME *</label>
            <input
              type="text"
              placeholder="Enter here..."
              className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">EXPERIENCE</label>
            <select
              className="w-full bg-gray-700 p-2 rounded border border-gray-600"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option>Select...</option>
              <option value="internship">Internship</option>
              <option value="entry-level">Entry Level</option>
              <option value="associate">Associate</option>
              <option value="junior-level">Junior Level</option>
              <option value="mid-senior-level">Mid-Senior Level</option>
              <option value="director">Director</option>
              <option value="executive">Executive</option>
            </select>
          </div>

          <div>
            <p className="text-sm text-gray-300 mb-2">IMPORT YOUR EXISTING RESUME ▼</p>
            <div className="bg-gray-700 p-2 flex items-center rounded border border-gray-600">
              <input
                type="file"
                className="flex-1 bg-transparent text-sm text-gray-400"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Upload className="ml-2 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-start">
              <Info className="w-4 h-4 mr-1 mt-0.5" />
              This process may take up to 60 seconds. Please be patient and keep this page open.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-600">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">Target your resume</p>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={targetResume}
                  onChange={() => setTargetResume(!targetResume)}
                />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
            <p className="text-xs text-green-400 flex items-start">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 mt-1"></span>
              A targeted resume is tailored to a specific job opening. You have a significantly higher chance of getting an interview when your experience is clearly relevant.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded ${canSave
              ? 'bg-blue-600 cursor-pointer opacity-100'
              : 'bg-blue-600 opacity-50 cursor-not-allowed'
              }`}
            disabled={!canSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
