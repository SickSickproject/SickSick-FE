import Firstpage from "../pages/Firstpage.jsx";
import Secondpage from "../pages/Secondpage.jsx";
import Selectpage from "../pages/Selectpage.jsx";

const routes = [
  // 지도(메인)
  {
    path: "/",
    element: <Selectpage />,
  },
  {
    path: "/one",
    element: <Firstpage />,
  },
  {
    path: "/two",
    element: <Secondpage />,
  },
  
];

export default routes;