import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import sicksickbtn from "../assets/sicksickbtn.jpg"



const Mainpage = ()=> {
    const navigate = useNavigate();
    const location = useLocation();

    const hideSidebar = location.pathname === "/main/three"
    

    const img1 = sicksickbtn

    const [pagestate , setpagestate] = useState("one")
    return <>
        <Navbar>
            <div style={{left:"1%",backgroundColor:"yellow", width:"5%",height:"80%",position:"absolute"}} onClick={()=>{console.log(1)}}>
                <img src={img1} style={{width:"100%",height:"100%"}}></img>
            </div>
            <Btns style={{left:"75%"}} onClick={()=>navigate(`/main/one`,{replace : true})}>식식</Btns>
            <Btns style={{left:"82%"}} onClick={()=>navigate(`/main/two`,{replace : true})}>고백들</Btns>
            <Btns style={{left:"89%",width:"7%"}} onClick={()=>navigate(`/main/three`,{replace : true})}>연대하기</Btns>
        </Navbar>
        { !hideSidebar &&<Sidebar></Sidebar>}
        <Outlet></Outlet>
    
    </>
}

export default Mainpage

const Navbar = styled.div`
position: relative;
display: flex;
align-items: center;
flex-direction: row;
width:100%;
height:10%;
border-bottom: 1px solid black;
z-index: 9999;
`;

const Sidebar = styled.div`
float:left;
width:17%;
height:89%;
background-color:white;
z-index: 9999;
`;

const Btns = styled.div`
width:5%;
height:50%;
position:absolute;
display:flex;
align-items: center;
justify-content:center;
font-size: 24px;
font-style: normal;
font-weight: 500;
&:hover {
    text-decoration: underline;
    cursor:pointer;
    font-weight: 800;

  }
`