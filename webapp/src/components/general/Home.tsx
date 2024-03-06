import React from "react";
import { Nav } from "./Nav";
import Game from "../Game/Game";
import { usePlayingState, useShowCancellingDialog } from "../../stores/playing-store";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogPortal, AlertDialogTrigger,AlertDialogOverlay,AlertDialogContent } from "../ui/alert-dialog";



export const Home = () => {
    const isPlaying = usePlayingState(state => state.playing);
    const showDialog = useShowCancellingDialog(state => state.show);

    return (<div className="h-1/2">
        <Nav />
        {isPlaying ? <Game /> : (
        <div className="flex h-full justify-center items-center"> 
            <Button onClick={() => {usePlayingState.getState().startPlaying()}}>Start Game</Button>
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