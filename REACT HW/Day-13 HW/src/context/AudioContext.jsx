// context/AudioContext.jsx
import { createContext, useContext, useReducer } from 'react';

const AudioContext = createContext(null);

const initialState = {
  track: null,         // Current playing track (object or null)
  isPlaying: false,    // Whether audio is currently playing
};

function audioReducer(state, action) {
  switch (action.type) {
    case 'SET_TRACK':
      return { ...state, track: action.payload, isPlaying: true };
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    default:
      return state;
  }
}

export function AudioProvider({ children }) {
  const [state, dispatch] = useReducer(audioReducer, initialState);

  return (
    <AudioContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
}

// Custom hook to access audio context
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
