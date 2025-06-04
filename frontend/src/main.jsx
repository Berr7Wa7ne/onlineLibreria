import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../src/App";
import './App.css';

// Store the token (remove this after initial setup)
const superAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJTVVBFUkFETUlOIiwiaWF0IjoxNzM5MTkwNjA4LCJleHAiOjE3NDE3ODI2MDh9.vhJEYbthJ1yT1aoqcU8ydbsNZzeOpqAsKMxlRWs8xYA';  // Replace with the actual token.
localStorage.setItem('token', superAdminToken);
console.log('Superadmin token stored.');
console.log("Using DATABASE_URL:", process.env.DATABASE_URL);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
