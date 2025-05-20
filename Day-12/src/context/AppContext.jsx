import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumes, setResumes] = useState([]);

  const addResume = (resume) => {
    setResumes((prev) => [...prev, resume]);
  };

  const deleteResume = (id) => {
    setResumes((prevResumes) => prevResumes.filter((resume) => resume.id !== id));
  };

  return (
    <AppContext.Provider value={{ isModalOpen, setIsModalOpen, resumes, addResume, deleteResume }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
