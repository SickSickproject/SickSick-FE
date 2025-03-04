import { useState } from "react"
import styled from "styled-components"
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import Leesunminpage from "./interviewpage/Leesunminpage";
import Leejinsolpage from "./interviewpage/Leejinsolpage";
import Babarapage from "./interviewpage/Babarapage";

const Secondpage = ()=>{

    const [btnclick,setbtnclick] = useState([1,0,0,0])

    const [isdropdownopen , setisdropdownopen] = useState(0)
    const [pagestate,setpagestate] = useState("main")

 
    const [orderform , setorderform] = useState(0)
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    const btnchange = (i)=>{
        const newarr = [0,0,0,0]
        newarr[i] = 1;
        console.log(newarr)
        setbtnclick(newarr)
    }

    return <Container>
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
        {pagestate === "main" && 
        <Mainbar>
        <SelectBar>
            <SelectBtn style={{left:"20px"}} color={btnclick[0]} onClick={()=>{btnchange(0)}}>모두들</SelectBtn>
            <SelectBtn style={{left:"160px"}} color={btnclick[1]} onClick={()=>{btnchange(1)}}>이선민</SelectBtn>
            <SelectBtn style={{left:"300px"}} color={btnclick[2]} onClick={()=>{btnchange(2)}}>이진솔</SelectBtn>
            <SelectBtn style={{left:"440px"}} color={btnclick[3]} onClick={()=>{btnchange(3)}}>바바라</SelectBtn>
        </SelectBar>
        </Mainbar>
        }
        {pagestate === "leesunmin" && 
            <Leesunminpage setpagestate={setpagestate} setbtnclick={setbtnclick}></Leesunminpage>
        }
        {pagestate === "leejinsol" && 
            <Leejinsolpage setpagestate={setpagestate} setbtnclick={setbtnclick}></Leejinsolpage>
        }
        {pagestate === "babara" && 
            <Babarapage setpagestate={setpagestate} setbtnclick={setbtnclick}></Babarapage>
        }
    </Container>
}

export default Secondpage

const Container = styled.div`
width:1920px;
height:850px;
display:flex;
flex-direction:row;
`
const Sidebar = styled.div`
width:316px;
height:1105px;
display:flex;
flex-direction:column;
position:relative;
`;

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
width:1605px;
height:850px;

overflow:auto;
`

const SelectBar = styled.div`
width:1604px;
height:81px;
display:flex;
align-items:center;
position:relative;
border-bottom: 1px solid black;
box-sizing: border-box;
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
