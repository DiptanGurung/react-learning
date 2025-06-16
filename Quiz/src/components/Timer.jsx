import { useEffect, useState } from "react";

export default function Timer({ seconds, onTimeout }) {
  const [time, setTime] = useState(seconds);
  useEffect(() => {
    if (time === 0) onTimeout();
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);
  return <div className="text-lg font-bold">⏳ {time}s</div>;
}
