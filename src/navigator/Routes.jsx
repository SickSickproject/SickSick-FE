import Firstpage from "../pages/Firstpage.jsx";
import Secondpage from "../pages/Secondpage.jsx";
import Thirdpage from "../pages/Thirdpage.jsx";
import Selectpage from "../pages/Selectpage.jsx";
import Mainpage from "../pages/Mainpage.jsx";
import VideoOverlaypage from "../pages/VideoOverlaypage.jsx";
import { createHashRouter } from "react-router-dom"; // 👈 여기만 바꿈
import AdminPage from "../pages/AdminPage.jsx"; 

const routes = createHashRouter([
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/",
    element: <Selectpage />,
  },
  {
    path: "/main",
    element: <Mainpage />,
    children: [
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
        element: <VideoOverlaypage />,
      },
    ]
  }
]);

export default routes;
