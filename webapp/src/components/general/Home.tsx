import React from "react";
import { Nav } from "./Nav";
import Game from "../Game/Game";
import { useGameQuestions, usePlayingState, useShowCancellingDialog } from "../../stores/playing-store";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogPortal, AlertDialogTrigger,AlertDialogOverlay,AlertDialogContent } from "../ui/alert-dialog";
import { Link } from "react-router-dom";



export const Home = () => {
    const isPlaying = usePlayingState(state => state.playing);
    const showDialog = useShowCancellingDialog(state => state.show);

    const handleStartPlaying = async () => {
        await useGameQuestions.getState().startGame();
        usePlayingState.getState().startPlaying();
      };

    return (<div className="flex flex-col h-full border-red-300">
        {isPlaying ? <Game /> : (
        <div className="flex flex-col gap-10 h-full justify-center items-center"> 
            <Button className="w-2/5 h-24 text-4xl" onClick={() => handleStartPlaying()}>Start Game!</Button>
            <Link className={"bg-primary text-text rounded-md text-center justify-center w-2/5 h-24 text-4xl"} to={`/trivia`}>Trivia Game</Link>
        </div>
        )}
    <AlertDialog open={showDialog}>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent className="bg-background text-text">
            <div >
                <h1 className="text-xl font-bold">Are you sure you want to leave the game?</h1>
                <p className="text-gray-400">You will lose the progress</p>
                <div className="flex w-full justify-end gap-2">
                <Button onClick={() => {useShowCancellingDialog.getState().setShow(false)}}>No</Button>
                <Button className="bg-danger hover:bg-danger/90"  onClick={() => {useShowCancellingDialog.getState().functionToExecute(); useShowCancellingDialog.getState().setShow(false)}}>Yes</Button>
                </div>
            </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>

        </div>
    );
    }