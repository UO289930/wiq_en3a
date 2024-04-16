import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/user-store";
import { useEffect } from "react"
import { logout } from "../../services/auth-service";


export const Logout = () => {

    let navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/");
        console.log("Logging out...");
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    )

}