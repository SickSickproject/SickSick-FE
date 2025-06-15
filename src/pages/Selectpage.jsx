import { themes } from "../styles/themes.jsx";
import "../styles/fonts.css";
import styled from "styled-components";
import sicksicklogo from "../assets/SelectpageImg/sicksicklogo.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SplashScreen from "./SplashScreen.jsx";

const Selectpage = () => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeftPos = useRef(0);
  const scrollTopPos = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX;
    startY.current = e.pageY;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
    scrollTopPos.current = scrollRef.current.scrollTop;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX;
    const y = e.pageY;
    const walkX = x - startX.current;
    const walkY = y - startY.current;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walkX;
    scrollRef.current.scrollTop = scrollTopPos.current - walkY;
  };

  // SplashScreen 관련
  const [showSplash, setShowSplash] = useState(!sessionStorage.getItem("visited")); // 
  const navigate = useNavigate();
  const img1 = sicksicklogo;

  useEffect(() => {
    const isVisited = sessionStorage.getItem("visited");
    if (!isVisited) {
      sessionStorage.setItem("visited", "true");
      setTimeout(() => {
        setShowSplash(false);
      }, 3000); // 3초 동안 스플래시 표시
    }
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <ScrollContainer
        >
          <div
              style={{
                position: "absolute",
                width: "45.9%",
                right: "26%",
                top: "5%",
                aspectRatio:"882.927/199",
              }}
            >
              <img src={img1} style={{ width: "100%", height: "100%" }} alt="sicksick1" />
            </div>
            <Textbox>
              식식은 섭식장애 인식 확산을 위한 당사자 고백 프로젝트입니다.
            </Textbox>
            <Circle style={{ left: "20%",textAlign:"center" }} onClick={() => navigate(`/main/one`, { replace: false })}>
              ①<br/>섭식장애란<br />
              무엇일까?
            </Circle>
            <Circle style={{ left: "52%",textAlign:"center" }} onClick={() => navigate(`/main/two`, { replace: false })}>
              ②<br/>고백 들으러<br/> 가기
            </Circle>
          {/* <ContentWrapper>
            <div
              style={{
                position: "absolute",
                width: "882.927px",
                height: "199px",
                left: "518.5365px",
                top: "47px",
              }}
            >
              <img src={img1} style={{ width: "100%", height: "100%" }} alt="sicksick1" />
            </div>
            <Textbox>
              식식은 섭식장애 인식 확산을 위한 당사자 고백 프로젝트입니다.
            </Textbox>

            <Circle style={{ left: "258px",textAlign:"center" }} onClick={() => navigate(`/main/one`, { replace: false })}>
              ①<br/>섭식장애란<br />
              무엇일까?
            </Circle>

            <Circle style={{ left: "996px",textAlign:"center" }} onClick={() => navigate(`/main/two`, { replace: false })}>
              ②<br/>고백 들으러<br/> 가기
            </Circle>
          </ContentWrapper> */}
        </ScrollContainer>
      )}
    </>
  );
};

export default Selectpage;

// 외부 스크롤 컨테이너: 브라우저 창 크기(100vw, 100vh)를 기준으로, 
// 내부에 고정 크기 콘텐츠(1920×1200)가 위치하여 브라우저가 작으면 스크롤 가능
const ScrollContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
 background-color: yellow;
`;

// 고정 크기 콘텐츠 영역
const ContentWrapper = styled.div`
  width: 1920px;
  height: 1200px;
  background-color: yellow;
  position: relative;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 28%;
  aspect-ratio:1/1;
  background-color: white;
  border: 2px solid #000;
  top: 40%;
  border-radius: 50%;
  font-size: 3vw;
  font-style: normal;
  line-height:136%;
  font-weight: 800;
  font-family: "Gothic A1";
  &:hover {
    background-color: black;
    border: 2px solid #ff0;
    color: yellow;
    transition: 0.3s ease-in;
    cursor: pointer;
  }
`;

const Textbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  aspect-ratio:1430/33;
  width: 74.47%;
  left: 12.765%;
  top: 32%;
  font-size: 2vw;
  font-family: "Gothic A1";
  font-style: normal;
  font-weight: 800;
`;
