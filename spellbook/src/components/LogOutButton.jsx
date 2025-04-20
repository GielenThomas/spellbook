import React, { useContext } from "react";
import { Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../App";
import { AuthContext } from "../contexts/AuthContext";

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