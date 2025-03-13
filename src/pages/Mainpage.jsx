import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import sicksickbtn from "../assets/sicksickbtn.jpg"



const Mainpage = ()=> {

    const img1 = sicksickbtn

    const location = useLocation(); // 현재 경로 정보 가져오기
    const path = location.pathname; // 예: "/main/one"
  
    // 경로에서 마지막 부분만 추출 ("/main/one" -> "one")
    const lastSegment = path.split("/").pop();


    const [btnclick,setbtnclick] = useState(lastSegment === "one" ? [1,0,0] : [0,1,0])
    console.log(btnclick)
    const [Left,setLeft] = useState(window.innerWidth*0.8)
    const navigate = useNavigate();

    useEffect(()=>{
        updateWidth();
    },[])

    const updateWidth = ()=>{
        const screenWidth = window.innerWidth; // 전체 화면 너비
        setLeft(screenWidth * 0.75);
    }

    window.addEventListener("resize",()=>{
        updateWidth();
    })

    const btnchange = (i)=>{
        const newarr = [0,0,0]
        newarr[i] = 1;
        setbtnclick(newarr)
        if(i === 0)navigate(`/main/one`,{replace : true})
        else if(i === 1)navigate(`/main/two`,{replace : true})
        else navigate(`/main/three`,{replace : true})
        
    }
    return <>
        <Navbar>
            <Imgcontainer onClick={()=>navigate(`/`,{replace : true})} src={img1}></Imgcontainer>
            <Navbarin left = {Left}>
                <Btns clicked={btnclick[0]} onClick={()=>{btnchange(0)}} style={{width:"70px"}}>식식</Btns>
                <Btns clicked={btnclick[1]} onClick={()=>{btnchange(1)}}>고백들</Btns>
                <Btns clicked={btnclick[2]} onClick={()=>{btnchange(2)}}>연대하기</Btns>
            </Navbarin>
        </Navbar>
        <Outlet></Outlet>
    </>
}

export default Mainpage

const Navbar = styled.div`
position:fixed;
display: flex;
align-items: center;
flex-direction: row;
top:0;
left:0;
width:100%;
height:95px;
background-color:white;
border-bottom: 2px solid black;
z-index: 9999;
box-sizing: border-box;
`;

const Btns = styled.div`
width:100px;
height:21px;
display:flex;
align-items: center;
margin-right:30px;
justify-content:center;
font-size: 24px;
font-family: Gothic A1;
font-style: normal;
font-weight: ${(props)=>(props.clicked ? "800":"500")};
text-decoration: ${(props)=>(props.clicked ? "underline":"none")};
&:hover {
    text-decoration: underline;
    cursor:pointer;
    font-weight: 800;
  }
`

const Navbarin = styled.div`
position:fixed;
right: 1%;
width:340px;
height:95px;
display:flex;
flex-direction:row;
align-items:center;
`

const Imgcontainer = styled.img`
width:73px;
height:60px;
margin-left:19px;
&:hover {
    cursor:pointer;
  }
`