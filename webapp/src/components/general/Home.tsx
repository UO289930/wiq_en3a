import React from "react";
import { Nav } from "./Nav";
import Game from "../Game/Game";
import { usePlayingState, useShowCancellingDialog } from "../../stores/playing-store";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogPortal, AlertDialogTrigger,AlertDialogOverlay,AlertDialogContent } from "../ui/alert-dialog";



export const Home = () => {
    const isPlaying = usePlayingState(state => state.playing);
    const showDialog = useShowCancellingDialog(state => state.show);

    return (<div>
        <Nav />
        {isPlaying ? <Game /> : (
        <div> 
            <Button onClick={() => {usePlayingState.getState().startPlaying()}}>Start Game</Button>
        </div>
        )}
    <AlertDialog open={showDialog}>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
            <div>
                <h1>Are you sure you want to leave? You will lose the progress of the game</h1>
                <Button onClick={() => {useShowCancellingDialog.getState().functionToExecute(); useShowCancellingDialog.getState().setShow(false)}}>Yes</Button>
                <Button onClick={() => {useShowCancellingDialog.getState().setShow(false)}}>No</Button>
            </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>

        </div>
    );
    }