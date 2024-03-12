import React, { useState } from "react";
import AddUser from "./AddUser";
import Login from "./Login";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Authentication = () => {

  const [value, setValue] = React.useState("login");
  const [postRegisterText, setPostRegisterText] = useState("");

  const handleRegistrationCompleted = (username : String) => {
    setValue("login");
    setPostRegisterText(`User ${username} has been registered. You can now login.`);
  };

  return (
    <div className="flex justify-center items-center h-full">
    <Tabs defaultValue="login" value={value} onValueChange={setValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Login postRegisterText={postRegisterText} />
      </TabsContent>
      <TabsContent value="register">
       <AddUser onRegistrationCompleted={handleRegistrationCompleted} />
      </TabsContent>
    </Tabs>
    </div>
  );
};

export default Authentication;
