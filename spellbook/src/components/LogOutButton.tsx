import React, { useContext } from "react";
import { Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../App.tsx";
import { AuthContext } from "../contexts/AuthContext.tsx";

const LogoutButton = () => {
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
