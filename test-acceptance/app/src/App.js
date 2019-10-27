import React from "react";
import "./App.css";
import AcceptCookies from "./modules/accept-cookies";
import RejectCookies from "./modules/reject-cookies";
import CookiesValue from "./modules/cookies-value";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Click cookies button and reload the page to see how value is maintained</p>
        <AcceptCookies />
        <RejectCookies />
        <CookiesValue />
      </header>
    </div>
  );
}

export default App;
