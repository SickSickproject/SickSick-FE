import {themes} from "../styles/themes.jsx"
import "../styles/fonts.css"
import styled from "styled-components"
import sicksicklogo from "../assets/SelectpageImg/sicksicklogo.png"
import {Outlet, useLocation, useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import SplashScreen from "./SplashScreen.jsx";


const Selectpage = ()=>{

    const [showSplash,setShowSplash] = useState(!sessionStorage.getItem('visited'))

    const img1 = sicksicklogo
    const navigate = useNavigate();

    useEffect(() => {
        const isVisited = sessionStorage.getItem('visited');
        console.log(isVisited)
        if (!isVisited) {
          sessionStorage.setItem('visited', 'true');
          setTimeout(() => {
            setShowSplash(false);
          }, 3000);  // 3초 동안 스플래시 표시
        }
      }, []);

    return <>
        {showSplash ? (<SplashScreen/>) : (
        <div style={{width:"1920px",height:"1200px",backgroundColor:"yellow",position:"relative"}}>
        <div style={{position:"absolute",width:"882.927px",height:"199px",left:"518.5365px",backgroundColor:"red",top:"47px"}}>
            <img src={img1} style={{width:"100%",height:"100%"}} alt="sicksick1"></img>
        </div>
        <Textbox>식식은 섭식장애 인식 확산을 위한 당사자 고백 프로젝트입니다.</Textbox>
        <Circle style={{left:"258px"}} onClick={()=>navigate(`/main/one`,{replace : false})}>섭식장애란 무엇일까?</Circle>
        
        <Circle style={{left:"996px"}} onClick={()=>navigate(`/main/two`,{replace : false})}>고백 들으러 가기</Circle>
    </div>
    )}
    </>
}

export default Selectpage

const Circle = styled.div`
display:flex;
align-items:center;
justify-content:center;
position:absolute;
width:666px;
height:666px;
background-color:white;
border: 2px solid #000;
top:407px;
line-height: 136%;
border-radius:50%;
font-size: 65.766px;
font-style: normal;
font-weight: 800;
line-height: 142%;
 &:hover {
    background-color: black;
    border: 2px solid #FF0;
    color:yellow;
    transition:0.3s ease-in;
  }
`

const Textbox = styled.div`
display : flex;
align-items:center;
justify-content:center;
position:absolute;
width:1430px;
height:33px;
left:245px;
top:310px;
font-size: 42.505px;
font-style: normal;
font-weight: 800;
`
