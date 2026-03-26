import { useEffect, useState } from "react";

const PLAYER_NAME_KEY = "playerName";

export default function usePlayerName() {
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(PLAYER_NAME_KEY);
    if (saved) setPlayerName(saved);
  }, []);

  const saveName = (name: string) => {
    localStorage.setItem(PLAYER_NAME_KEY, name);
    setPlayerName(name);
  };

  return { playerName, saveName, hasName: !!playerName };
}