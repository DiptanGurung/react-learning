import { useAppContext } from '../context/AppContext';

export default function ResumePage() {
  const { setIsModalOpen, resumes } = useAppContext();

  return (
    <div className="flex flex-wrap gap-6 ml-20 mt-20">
      {/* Create New Resume Card */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="w-64 h-80 border border-dashed border-gray-500 flex items-center justify-center 
        text-red-700 hover:border-white hover:text-white cursor-pointer rounded-lg"
      >
        <p className="text-xl font-bold">Create new resume</p>
      </div>

      {/* Render Existing Resumes */}
      {resumes && resumes.length > 0 && resumes.map((resume) => (
        <div
          key={resume.id}
          className="w-64 h-80 bg-gray-700 p-4 rounded-lg shadow-md flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold mb-2">{resume.resumeName}</h2>
            <p className="text-sm text-gray-300">Experience: {resume.experience}</p>
            {resume.targetResume && (
              <p className="text-xs text-green-400 mt-1">🎯 Targeted Resume</p>
            )}
          </div>
          {resume.file && (
            <p className="text-xs text-gray-400 mt-4 truncate">
              Uploaded: {resume.file.name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}