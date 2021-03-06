import React, { Fragment } from "react";
import LoggedOut from "./LoggedOut";
import { PlugProvider, Authenticated, Unauthenticated } from "@raydeck/useplug";
import config from "./config.json";
import { Helmet } from "react-helmet";
// import NavigationMain from "./NavigationMain";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const whitelist = Object.values(
  config[config.mode as "production" | "local"].canisters
);
function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>DeTi: Decentralized Supernova Presentation</title>
      </Helmet>
      <PlugProvider whitelist={whitelist}>
        <Fragment>
          {/* <Authenticated>
            <NavigationMain />
          </Authenticated> */}
          <Unauthenticated>
            <LoggedOut />
          </Unauthenticated>
        </Fragment>
      </PlugProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        toastClassName={(context) => {
          return "bg-blue-900 text-white  p-2 rounded-lg";
        }}
      />
    </BrowserRouter>
  );
}

export default App;
