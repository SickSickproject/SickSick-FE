import { Route, RouterProvider, Routes, useLocation } from "react-router-dom";
import routes from "./navigator/Routes.jsx";
import Globalstyle from "./styles/Globalstyle.jsx";



function App() {

  return (
    <>
      <Globalstyle/>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
