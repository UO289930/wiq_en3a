import React from "react";
import { Nav } from "./Nav";
import Game from "../Game/Game";
import { usePlayingState } from "../../stores/playing-store";
import { Button } from "../ui/button";



export const Home = () => {
    const isPlaying = usePlayingState(state => state.playing);

    return (<div>
        <Nav />
        {isPlaying ? <Game /> : (
        <div> 
            <Button onClick={() => {usePlayingState.getState().startPlaying()}}>Start Game</Button>
        </div>
        )}
        </div>
    );
    }