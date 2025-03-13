import { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence, isMotionValue} from "framer-motion";
import Leesunminpage from "./interviewpage/Leesunminpage";
import Leejinsolpage from "./interviewpage/Leejinsolpage";
import Babarapage from "./interviewpage/Babarapage";
import Allvideo_grid from "./videolistpage/Allvideo_grid";
import Leesunminvideo_grid from "./videolistpage/Leesunminvideo_grid";
import Leejinsolvideo_grid from "./videolistpage/Leejinsolvideo_grid";
import Babaravideo_grid from "./videolistpage/Babaravideo_grid";
import Leesunminvideo_list from "./videolistpage/Leesunminvideo_list";
import Leejinsolvideo_list from "./videolistpage/Leejinsolvideo_list";
import Babaravideo_list from "./videolistpage/Babaravideo_list";
import Allvideo_list from "./videolistpage/Allvideo_list";
import gridbtn from "../assets/viewchangebtnimg/gridbtn.png"
import listbtn from "../assets/viewchangebtnimg/listbtn.svg"
import changebtn from "../assets/viewchangebtnimg/changebtn.svg"
import { useMediaQuery } from "react-responsive";


const Secondpage = ()=>{

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const img1 = listbtn
    const img2 = gridbtn
    const img3 = changebtn

    const [btnclick,setbtnclick] = useState([1,0,0,0])

    const [isdropdownopen , setisdropdownopen] = useState(0)
    const [pagestate,setpagestate] = useState("main")

 
    const [viewchange , setviewchange] = useState("grid")

    const btnchange = (i)=>{
        const newarr = [0,0,0,0]
        newarr[i] = 1;
        console.log(newarr)
        setbtnclick(newarr)
    }

    return <>
    <Sidebar>
            <SidebarBtn onClick={()=>{
                setpagestate("main");
                navigate(`/main/two`,{replace : true})}}  style={{borderTop:"none"}}>고백한 것들</SidebarBtn>
            
            <SidebarBtn onClick={()=>{setisdropdownopen(!isdropdownopen)}}>인터뷰이</SidebarBtn>
            <AnimatePresence>
                {isdropdownopen && <motion.div
                 initial={{ opacity: 0}}
                 animate={{ opacity: 1}}
                 exit={{ opacity: 0}}
                 transition={{ duration: 0.3, ease: "easeInOut" }}
                 className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                    <SideBarBtn2 onClick={()=>{setpagestate("leesunmin")}}>이선민</SideBarBtn2>
                    <SideBarBtn2 onClick={()=>{setpagestate("leejinsol")}}>이진솔</SideBarBtn2>
                    <SideBarBtn2 onClick={()=>{setpagestate("babara")}}>바바라</SideBarBtn2>
                </motion.div>}
            </AnimatePresence>
        </Sidebar>    
    <Container>
    {pagestate === "main" && <SelectBar>
            <SelectBtn style={{left:"20px"}} color={btnclick[0]} onClick={()=>{btnchange(0)}}>모두들</SelectBtn>
            <SelectBtn style={{left:"160px"}} color={btnclick[1]} onClick={()=>{btnchange(1)}}>이선민</SelectBtn>
            <SelectBtn style={{left:"300px"}} color={btnclick[2]} onClick={()=>{btnchange(2)}}>이진솔</SelectBtn>
            <SelectBtn style={{left:"440px"}} color={btnclick[3]} onClick={()=>{btnchange(3)}}>바바라</SelectBtn>
            <Changebtn isMobile={isMobile} onClick={()=>{setviewchange(viewchange === "grid" ? "list" : "grid")}}>
                <img src={img3}></img>
                {viewchange === "grid" ? <img src={img1} style={{width:"31px",height:"24px"}}></img>: <img src={img2} style={{width:"31px",height:"29px"}}></img>}
            </Changebtn>
    </SelectBar>}
        {btnclick[0] === 1 && viewchange === "grid" && pagestate === "main" && <Allvideo_grid></Allvideo_grid>}
        {btnclick[0] === 1 && viewchange === "list" && pagestate === "main" && <Allvideo_list></Allvideo_list>}
        {btnclick[1] === 1 && viewchange === "grid" && pagestate === "main" && <Leesunminvideo_grid></Leesunminvideo_grid>}
        {btnclick[1] === 1 && viewchange === "list" && pagestate === "main" && <Leesunminvideo_list></Leesunminvideo_list>}
        {btnclick[2] === 1 && viewchange === "grid" && pagestate === "main" && <Leejinsolvideo_grid></Leejinsolvideo_grid>}
        {btnclick[2] === 1 && viewchange === "list" && pagestate === "main" && <Leejinsolvideo_list></Leejinsolvideo_list>}
        {btnclick[3] === 1 && viewchange === "grid" && pagestate === "main" && <Babaravideo_grid></Babaravideo_grid>}
        {btnclick[3] === 1 && viewchange === "list" && pagestate === "main" && <Babaravideo_list></Babaravideo_list>}
        {pagestate === "leesunmin" &&
            <Leesunminpage setpagestate={setpagestate} setbtnclick={setbtnclick}></Leesunminpage>
        }
        {pagestate === "leejinsol" && 
            <Leejinsolpage setpagestate={setpagestate} setbtnclick={setbtnclick}></Leejinsolpage>
        }
        {pagestate === "babara" && 
            <Babarapage setpagestate={setpagestate} setbtnclick={setbtnclick}></Babarapage>
        }
    </Container></>
}

export default Secondpage


const Container = styled.div`
margin-left: 316px;
padding-top:95px;
height:1105px;
background-color:white;
font-family: Gothic A1;
width: calc(100vw - 316px);
`
const Sidebar = styled.div`
position:fixed;
top:95px;
left:0px;
width:316px;
height:1105px;
display:flex;
flex-direction:column;
z-index:9998;
background-color:white;
`;

const Changebtn = styled.div`
position:${(props)=>{return (props.isMobile ? "absolute":"fixed")}};
width:78px;
height:24px;
right:${(props)=>{return (props.isMobile ? "58%":"2%")}};
display: flex;
align-items: center;
gap: 10px;
z-index:1;
&:hover {
cursor:pointer;
}
`

const SidebarBtn = styled.div`
width:296px;
background-color:white;
position:relative;
height:52px;
display:flex;
align-items:center;
font-size: 28px;
font-style: normal;
border-top: 1px solid black;

padding-left:19px;
font-weight: 400;
&:hover {
background-color:yellow;
cursor:pointer;
}
&::after {
content: "";
position: absolute;
top: 0;
right: 0;
width: 1px; /* border 두께 */
height: 80%; /* 위에서부터 80%만 적용 */
background-color: black; /* border 색상 */
}
`

const SideBarBtn2 = styled.div`
width:241px;
height:52px;
display:flex;
align-items:center;
font-size: 28px;
font-style: normal;
font-weight: 400;
padding-left:74px;
&:hover {
background-color:yellow;
cursor:pointer;
}
`


const Mainbar = styled.div`
left:316px;
height:1105px;
diplay:flex;
justify-content:flex-end;
background-color:yellow;
position:absolute;
`

const SelectBar = styled.div`
width:100%px;
height:81px;
display:flex;
align-items:center;
position:relative;

`

const SelectBtn = styled.div`
width:116px;
height:36px;
position:absolute;
display:flex;
color:${(props)=>(props.color ? "black":"grey")};
justify-content:center;
align-items:center;
font-size: 35px;
font-style: normal;
font-weight: 400;
&:hover {
    cursor:pointer;
  }
`
