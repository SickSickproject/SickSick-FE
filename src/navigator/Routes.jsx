import Firstpage from "../pages/Firstpage.jsx";
import Secondpage from "../pages/Secondpage.jsx";
import Thirdpage from "../pages/Thirdpage.jsx";
import Selectpage from "../pages/Selectpage.jsx";
import Mainpage from "../pages/Mainpage.jsx";
import VideoOverlaypage from "../pages/VideoOverlaypage.jsx";
import { createHashRouter } from "react-router-dom";
import AdminPage from "../pages/AdminPage.jsx"; 



const routes = createHashRouter([
  {
    path: "/admin",
    element: <AdminPage />,
  },
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
      {
        path: "overlay",
        element: <VideoOverlaypage/>,
      },
    ]
  }
 
  
]);

export default routes;