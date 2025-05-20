import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumes, setResumes] = useState([]);

  const addResume = (resume) => {
    setResumes((prev) => [...prev, resume]);
  };

  return (
    <AppContext.Provider value={{ isModalOpen, setIsModalOpen, resumes, addResume }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
