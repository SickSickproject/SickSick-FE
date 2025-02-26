import Firstpage from "../pages/Firstpage.jsx";
import Secondpage from "../pages/Secondpage.jsx";
import Thirdpage from "../pages/Thirdpage.jsx";
import Selectpage from "../pages/Selectpage.jsx";
import Mainpage from "../pages/Mainpage.jsx";
import { createBrowserRouter } from "react-router-dom";



const routes = createBrowserRouter([
  // 지도(메인)
  {
    path: "/",
    element: <Selectpage />,
  },
  {
    path: "/main",
    element: <Mainpage />,
    children:[
      {
        path: "one",
        element: <Firstpage />,
      },
      {
        path: "two",
        element: <Secondpage />,
      },
      {
        path: "three",
        element: <Thirdpage />,
      },
    ]
  }
 
  
]);

export default routes;