
import {create} from 'zustand';

interface PlayingState {
    playing: boolean,
    startPlaying: () => void,
    stopPlaying: () => void,
  }
  

export const usePlayingState = create<PlayingState>((set) => ({
    playing: false,
    startPlaying: () => set({playing: true}),
    stopPlaying: () => set({playing: false})
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
    if(usePlayingState.getState().playing){
      useShowCancellingDialog.getState().setShow(true);
      useShowCancellingDialog.getState().setFunctionToExecute(func);
    } else {
      func();
    }
}

