import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <Auth0Provider
      domain="dev-0ks8ixch5md580yv.us.auth0.com"
      clientId="3uXGGYPVUGFGo9GKrg4hn9hFWpmnFIT5"
      authorizationParams={{
        redirect_uri:"https://real-state-react-phi.vercel.app/",
      }}
      audience="http://localhost:3000"
      scope="openid profile email"
    >
    <App />
    </Auth0Provider>
   
  </React.StrictMode>
);
