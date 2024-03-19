
import {create} from 'zustand';

interface PlayingState {
    playing: boolean,
    isGameOver: boolean,
    startPlaying: () => void,
    stopPlaying: () => void,
    gameOver: () => void
  }
  

export const usePlayingState = create<PlayingState>((set) => ({
    playing: false,
    isGameOver: false,
    startPlaying: () => {set({playing: true}); set({isGameOver: false})},
    stopPlaying: () => {set({playing: false}); set({isGameOver: false})},
    gameOver: () => set({isGameOver: true})
  }));

interface ShowCancellingDialog {
    show: boolean,
    setShow: (show: boolean) => void,
    functionToExecute: () => void,
    setFunctionToExecute: (func: () => void) => void,
}

export const useShowCancellingDialog = create<ShowCancellingDialog>((set) => ({
    show: false,
    setShow: (show: boolean) => set({show: show}),
    functionToExecute: () => {},
    setFunctionToExecute: (func: () => void) => set({functionToExecute: func}),
  }));

export const handleShowDialog = ( func: () => void) =>  {
    if(usePlayingState.getState().playing && !usePlayingState.getState().isGameOver){
      useShowCancellingDialog.getState().setShow(true);
      useShowCancellingDialog.getState().setFunctionToExecute(func);
    } else {
      func();
    }
}

