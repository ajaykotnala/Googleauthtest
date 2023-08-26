import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import React from "react";

function App() {
  return (
    <>
      <div className="App">
        <h1 className="text-3xl font-bold">Google Auth Flow</h1>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
        >
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const { data } = await axios.post(
                  `${process.env.REACT_APP_BACKEND_SERVICE_URI}/login`,
                  {
                    token: credentialResponse.credential,
                  }
                );
              } catch (error) {
                console.log("error :", error);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </>
  );
}

export default App;
