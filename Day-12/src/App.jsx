import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import Sidebar from './components/Sidebar';
import ResumePage from './pages/ResumePage';
import CoverLetterPage from './pages/CoverLetterPage';
import ResignationLetterPage from './pages/ResignationLetterPage';
import ResumeModal from './components/ResumeModal';

function App() {
  const { isModalOpen } = useAppContext();

  return (
    <Router>
      <div className="flex h-screen bg-gradient-to-b from-blue-400 to-gray-400 text-white relative">
        <Sidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1 rounded ${isActive ? 'bg-blue-600' : 'bg-gray-700'}`
              }
              end
            >
              Resumes
            </NavLink>
            <NavLink
              to="/cover-letters"
              className={({ isActive }) =>
                `px-3 py-1 rounded ${isActive ? 'bg-blue-600' : 'bg-gray-700'}`
              }
            >
              Cover Letters
            </NavLink>
            <NavLink
              to="/resignation-letters"
              className={({ isActive }) =>
                `px-3 py-1 rounded ${isActive ? 'bg-blue-600' : 'bg-gray-700'}`
              }
            >
              Resignation Letters
            </NavLink>
          </div>

          <Routes>
            <Route path="/" element={<ResumePage />} />
            <Route path="/cover-letters" element={<CoverLetterPage />} />
            <Route path="/resignation-letters" element={<ResignationLetterPage />} />
          </Routes>
        </div>

        {isModalOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <ResumeModal />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
