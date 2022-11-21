import React from "react";
export const UserContext = React.createContext(null);
export const API_BACKEND_URL = process.env.REACT_APP_API_BACKEND_URL || "http://localhost:8080";
console.log("API URL:", API_BACKEND_URL);
export default UserContext;