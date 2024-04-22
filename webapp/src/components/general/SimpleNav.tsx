
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import React, { useState, useRef } from 'react';
import { useUserStore } from "../../stores/user-store";
import { Link } from "react-router-dom";


export const SimpleNav = () => {
  let username : string = useUserStore(state => state.user?.username!);

  const getLinkStyle = ():string => {
    return "text-text text-sm font-bold hover:text-primary transition-colors duration-300 ease-in-out"
  } 

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs = ['/runningSong.mp3', '/madagascar.mp3', '/madagascarThemeSong.mp3', '/panteraRosa.mp3'];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        let randomSong;
        do {
          randomSong = Math.floor(Math.random() * songs.length);
        } while (randomSong === currentSong);
        setCurrentSong(randomSong);
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="aspect-square h-12 px-5 py-3 flex items-center w-full justify-between border-b ">
      <div className="flex items-center gap-5 ">
      <Avatar className="w-9 h-9 rounded-full">
        <AvatarImage src="https://pbs.twimg.com/media/Frq7CQ-WwAEnXzh?format=jpg&name=large" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2 text-text text-sm font-thin ">
      <h2 className="font-bold">{username}</h2>
      
      </div>
      </div>
      <div className="flex gap-5">
        <Link className={getLinkStyle()} to={`/`}>Home</Link>
        <Link className={getLinkStyle()} to={`/leaderboard`}>Leaderboard</Link>
        <Link className={getLinkStyle()} to={`/stats`}>Statistics</Link>
        <Link id="logout" className={getLinkStyle()} to={`/logout`}>Logout</Link>    
        <button onClick={togglePlay} style={{ color: 'white' } }>
          {isPlaying ? '🔊' :  '🔇'}
        </button>
      </div>
      <audio ref={audioRef} src={songs[currentSong]} />
    </div>
  );
};
