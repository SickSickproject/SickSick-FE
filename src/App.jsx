import { Route, Routes, useLocation } from "react-router-dom";
import routes from "./navigator/Routes.jsx";
import { useState } from "react";
import SplashScreen from "./pages/SplashScreen.jsx";
import Navbar from "./component/Navbar.jsx";
import Selectpage from "./pages/Selectpage.jsx";
import Globalstyle from "./styles/Globalstyle.jsx";


function App() {

  return (
    <>
      <Globalstyle/>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </>
  )
}

export default App
