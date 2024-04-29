import React, { useEffect, useState } from "react";
import { useUserStore } from '../../stores/user-store';
import { getUser } from "../../services/auth-service";
import StatsTable from "./StatsTable"
import * as Avatar from '@radix-ui/react-avatar';
import { Link } from "react-router-dom";

export default function Statistics () {

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        let user = useUserStore.getState().user;
        if(user != null){
            getUser(user.username).then((u) => {
                setUsername(u.username);
                setEmail(u.email);
            }).catch((error) => {
                console.error('Error during retrieving the user', error);
            });
        }   
    } , []);
    

    return (
        <>
            <div id="statsHeader" className="flex flex-col items-center gap-3 mt-3">
                <div className="avatar"> 
                <Avatar.Root className="AvatarRoot" style={{ width: '100px', height: '100px' }}>
                        <Avatar.Fallback className="AvatarFallback" style={{fontSize:'2em'}}>{username.toUpperCase().charAt(0)}{username.toUpperCase().charAt(1)}</Avatar.Fallback>
                    </Avatar.Root>
                </div>
                <h1 id="h1-statistics" className="text-text text-2xl" >{username}</h1> 
                <h1 id="h2-statistics" className="text-text text-2xl" >{email}</h1> 
            </div>
            <StatsTable />
            <div className="flex flex-col gap-5 justify-start items-center p-5"> 
                <Link id="normalGame" className={" text-text border w-70 text-center border-text hover:bg-background2 p-4 rounded-xl font-bold text-2xl"} to={`/}`}>Keep Improving </Link>
            </div>
        </>
    )
} 