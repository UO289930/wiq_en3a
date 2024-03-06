import { usePlayingState } from "../../stores/playing-store"
import { logout } from "../../services/auth-service"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {Button} from "../ui/button"
import React from "react"


export const Nav = () => {

    return (
        <div className="aspect-square h-12 px-5 py-2 flex items-center w-full justify-between  ">
        <Avatar className="w-10 h-10 rounded-full hover:cursor-pointer">
            <AvatarImage src="https://pbs.twimg.com/media/Frq7CQ-WwAEnXzh?format=jpg&name=large" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex">
        <Button onClick={() => usePlayingState.getState().stopPlaying} className="text-text hover:text-primary" variant="ghost">Home</Button>
        <Button onClick={() => logout()} className="text-text hover:text-primary" variant="ghost">Logout</Button>
        </div>
        </div>
    )

}
