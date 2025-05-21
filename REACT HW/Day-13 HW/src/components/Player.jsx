// components/Player.jsx
import { useEffect, useRef, useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { LucidePlay, LucidePause } from 'lucide-react';

export default function Player() {
  const { state, dispatch } = useAudio();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const { track, isPlaying } = state;

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, track]);

  const onTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const togglePlay = () => {
    dispatch({ type: isPlaying ? 'PAUSE' : 'PLAY' });
  };

  const onSeek = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 flex items-center gap-4 p-4 shadow-lg z-50">
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => dispatch({ type: 'PAUSE' })}
      />
      <img
        src={track.cover}
        alt={track.title}
        className="rounded-md w-full h-40 object-cover mb-2"
      />
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 flex items-center gap-4 p-4 shadow-neon-pink z-50">        <h3 className="text-white font-semibold">{track.title}</h3>
        <h3 className="text-white font-semibold neon-text">{track.title}</h3>
        <p className="text-zinc-400 text-sm">{track.artist}</p>
      </div>
      <button
        className="text-neonPink hover:shadow-neon-pink transition"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <LucidePause size={28} /> : <LucidePlay size={28} />}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={onSeek}
        className="w-40 h-1 rounded-lg accent-pink-500 cursor-pointer"
      />
    </div>
  );
}
