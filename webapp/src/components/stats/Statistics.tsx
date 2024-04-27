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
            <div id="statsHeader" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , marginTop:'30px'}}>
                <div className="avatar"> 
                <Avatar.Root className="AvatarRoot" style={{ width: '100px', height: '100px' }}>
                        <Avatar.Fallback className="AvatarFallback" style={{fontSize:'2em'}}>{username.toUpperCase().charAt(0)}{username.toUpperCase().charAt(1)}</Avatar.Fallback>
                    </Avatar.Root>
                </div>
                <h1 className="h1-statistics" style={{ marginTop: '0.5em', marginBottom:'0.1em', fontSize:'3.5em'}}>{username}</h1> 
                <h1 className="h2-statistics" >{email}</h1> 
            </div>
            <StatsTable />
            <div className="flex flex-col gap-5 justify-start items-center p-5"> 
                <Link id="normalGame" className={" text-text border w-70 text-center border-text hover:bg-background2 p-5 rounded-xl font-bold text-3xl"} to={`/Home}`}>Continue Improving </Link>
            </div>
        </>
    )
} 