
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