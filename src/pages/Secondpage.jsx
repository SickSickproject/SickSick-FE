import { useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence, isMotionValue } from "framer-motion";
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
import YouTube from "react-youtube";
import Leesunmin from "../datas/LeesuminVideoimg";
import Babara from "../datas/BabaraVideoimg";
import Leejinsol from "../datas/LeejinsolVideoimg";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import closebtn from "../assets/Videoimg/closebtn.png"


const Secondpage = () => {


    const opts = {
        height: "470px",
        width: "776px",
        playerVars: {
            autoplay: 0,  // 자동 재생
        },
    }

    const opts2 = {
        height: "693.42px",
        width: "1200px",
        playerVars: {
            autoplay: 0,  // 자동 재생
        },
    }

    const [overlayinfo, setoverlayinfo] = useState({
        title: "",
        name: "",
        youtubeid: "",
        title_s: "",
        time: "",
        id: ""
    })

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 1025px) and (max-width: 1440px)" });
    const isDesktop = useMediaQuery({ query: "(min-width: 1441px)" });

    const img1 = listbtn
    const img2 = gridbtn
    const img3 = changebtn
    const img4 = closebtn


    const [btnclick, setbtnclick] = useState([1, 0, 0, 0])

    const [isdropdownopen, setisdropdownopen] = useState(0)
    const [pagestate, setpagestate] = useState("main")


    const [viewchange, setviewchange] = useState("grid")

    const [isoverlay, setisoverlay] = useState(false)

    const btnchange = (i) => {
        const newarr = [0, 0, 0, 0]
        newarr[i] = 1;
        console.log(newarr)
        setbtnclick(newarr)
    }

    const prevbtnclick = () => {
        if (btnclick[0]) {
            if (overlayinfo.name === "바바라") {
                if (overlayinfo.id === 0) {
                    setoverlayinfo(Leejinsol[10])
                }
                else {
                    setoverlayinfo(Babara[overlayinfo.id - 1])
                }
            }
            else if (overlayinfo.name === "이진솔") {
                if (overlayinfo.id === 0) {
                    setoverlayinfo(Leesunmin[10])
                }
                else {
                    setoverlayinfo(Leejinsol[overlayinfo.id - 1])
                }
            }
            else {
                if (overlayinfo.id != 0) {
                    setoverlayinfo(Leesunmin[overlayinfo.id - 1])
                }
            }
        }
        else if (btnclick[1]) {
            if (overlayinfo.id != 0) {
                setoverlayinfo(Leesunmin[overlayinfo.id - 1])
            }
        }
        else if (btnclick[2]) {
            if (overlayinfo.id != 0) {
                setoverlayinfo(Leejinsol[overlayinfo.id - 1])
            }
        }
        else {
            if (overlayinfo.id != 0) {
                setoverlayinfo(Babara[overlayinfo.id - 1])
            }
        }
    }

    const nextbtnclick = () => {
        if (btnclick[0]) {
            if (overlayinfo.name === "이선민") {
                if (overlayinfo.id === 10) {
                    setoverlayinfo(Leejinsol[0])
                }
                else {
                    setoverlayinfo(Leesunmin[overlayinfo.id + 1])
                }
            }
            else if (overlayinfo.name === "이진솔") {
                if (overlayinfo.id === 10) {
                    setoverlayinfo(Babara[0])
                }
                else {
                    setoverlayinfo(Leejinsol[overlayinfo.id + 1])
                }
            }
            else {
                if (overlayinfo.id != 7) {
                    setoverlayinfo(Babara[overlayinfo.id + 1])
                }
            }
        }
        else if (btnclick[1]) {
            if (overlayinfo.id != 10) {
                setoverlayinfo(Leesunmin[overlayinfo.id + 1])
            }
        }
        else if (btnclick[2]) {
            if (overlayinfo.id != 10) {
                setoverlayinfo(Leejinsol[overlayinfo.id + 1])
            }
        }
        else {
            if (overlayinfo.id != 7) {
                setoverlayinfo(Babara[overlayinfo.id + 1])
            }
        }
    }

    return <>
        <Sidebar>
            <SidebarBtn onClick={() => {
                setpagestate("main");
                navigate(`/main/two`, { replace: true })
            }} style={{ borderTop: "none" }}>고백한 것들</SidebarBtn>

            <SidebarBtn onClick={() => { setisdropdownopen(!isdropdownopen) }}>인터뷰이</SidebarBtn>
            <AnimatePresence>
                {isdropdownopen && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                    <SideBarBtn2 onClick={() => { setpagestate(isoverlay ? "main" : "leesunmin") }}>이선민</SideBarBtn2>
                    <SideBarBtn2 onClick={() => { setpagestate(isoverlay ? "main" : "leejinsol") }}>이진솔</SideBarBtn2>
                    <SideBarBtn2 onClick={() => { setpagestate(isoverlay ? "main" : "babara") }}>바바라</SideBarBtn2>
                </motion.div>}
            </AnimatePresence>
        </Sidebar>
        {!isoverlay &&
            <Container>
                {pagestate === "main" && <SelectBar>
                    <SelectBtn style={{ left: "20px" }} color={btnclick[0]} onClick={() => { btnchange(0) }}>모두들</SelectBtn>
                    <SelectBtn style={{ left: "160px" }} color={btnclick[1]} onClick={() => { btnchange(1) }}>이선민</SelectBtn>
                    <SelectBtn style={{ left: "300px" }} color={btnclick[2]} onClick={() => { btnchange(2) }}>이진솔</SelectBtn>
                    <SelectBtn style={{ left: "440px" }} color={btnclick[3]} onClick={() => { btnchange(3) }}>바바라</SelectBtn>
                    <Changebtn isMobile={isMobile} onClick={() => { setviewchange(viewchange === "grid" ? "list" : "grid") }}>
                        <img src={img3}></img>
                        {viewchange === "grid" ? <img src={img1} style={{ width: "31px", height: "24px" }}></img> : <img src={img2} style={{ width: "31px", height: "29px" }}></img>}
                    </Changebtn>
                </SelectBar>}
                {btnclick[0] === 1 && viewchange === "grid" && pagestate === "main" && <Allvideo_grid setisoverlay={setisoverlay} setoverlayinfo={setoverlayinfo}></Allvideo_grid>}
                {btnclick[0] === 1 && viewchange === "list" && pagestate === "main" && <Allvideo_list setisoverlay={setisoverlay} setoverlayinfo={setoverlayinfo}></Allvideo_list>}
                {btnclick[1] === 1 && viewchange === "grid" && pagestate === "main" && <Leesunminvideo_grid setisoverlay={setisoverlay} setoverlayinfo={setoverlayinfo}></Leesunminvideo_grid>}
                {btnclick[1] === 1 && viewchange === "list" && pagestate === "main" && <Leesunminvideo_list setisoverlay={setisoverlay} setoverlayinfo={setoverlayinfo}></Leesunminvideo_list>}
                {btnclick[2] === 1 && viewchange === "grid" && pagestate === "main" && <Leejinsolvideo_grid setisoverlay={setisoverlay} setoverlayinfo={setoverlayinfo}></Leejinsolvideo_grid>}
                {btnclick[2] === 1 && viewchange === "list" && pagestate === "main" && <Leejinsolvideo_list setisoverlay={setisoverlay} setoverlayinfo={setoverlayinfo}></Leejinsolvideo_list>}
                {btnclick[3] === 1 && viewchange === "grid" && pagestate === "main" && <Babaravideo_grid setisoverlay={setisoverlay} setoverlayinfo={setoverlayinfo}></Babaravideo_grid>}
                {btnclick[3] === 1 && viewchange === "list" && pagestate === "main" && <Babaravideo_list setisoverlay={setisoverlay} setoverlayinfo={setoverlayinfo}></Babaravideo_list>}
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
        {isoverlay && isMobile &&
            <Mobilepage>
                <img src={img4} style={{ position: "absolute", left: "860px", top: "119px", zIndex: "999" }} onClick={() => { setisoverlay(false) }}></img>
                <Mobilepage_title>
                    <div style={{ width: "740px", height: "65px", textAlign: "left", fontSize: "40px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {overlayinfo.title}
                    </div>
                    <div style={{ width: "776px", height: "35px", display: "flex", alignItems: "center", fontSize: "20px" }}>
                        인터뷰이 | {overlayinfo.name}&nbsp;&nbsp;&nbsp;&nbsp;{overlayinfo.time}
                    </div>
                </Mobilepage_title>
                <Mobilepage_youtube>
                    <YouTube opts={opts} videoId={overlayinfo.youtubeid}></YouTube>
                </Mobilepage_youtube>
                <Pagebtn onClick={() => { prevbtnclick() }} style={{ left: "816px", top: "708px", position: "absolute" }}>
                    <TfiArrowCircleLeft style={{ width: "40px", height: "40px" }} />
                </Pagebtn>
                <Pagebtn onClick={() => { nextbtnclick() }} style={{ left: "860px", top: "708px", position: "absolute" }}>
                    <TfiArrowCircleRight style={{ width: "40px", height: "40px" }} />
                </Pagebtn>
            </Mobilepage>
        }
        {isoverlay && isTablet &&
            <Tabletpage>
                <img src={img4} style={{ position: "absolute", left: "1284px", top: "119px", zIndex: "999" }} onClick={() => { setisoverlay(false) }}></img>
                <Tabletpage_title>
                    <div style={{ width: "1160px", height: "65px", textAlign: "left", fontSize: "40px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {overlayinfo.title}
                    </div>
                    <div style={{ width: "1200px", height: "35px", display: "flex", alignItems: "center", fontSize: "20px" }}>
                        인터뷰이 | {overlayinfo.name}&nbsp;&nbsp;&nbsp;&nbsp;{overlayinfo.time}
                    </div>
                </Tabletpage_title>
                <Tabletpage_youtube>
                    <YouTube opts={opts2} videoId={overlayinfo.youtubeid}></YouTube>
                </Tabletpage_youtube>
                <Pagebtn onClick={() => { prevbtnclick() }} style={{ left: "1242px", top: "920px", position: "absolute" }}>
                    <TfiArrowCircleLeft style={{ width: "40px", height: "40px" }} />
                </Pagebtn>
                <Pagebtn onClick={() => { nextbtnclick() }} style={{ left: "1286px", top: "920px", position: "absolute" }}>
                    <TfiArrowCircleRight style={{ width: "40px", height: "40px" }} />
                </Pagebtn>
            </Tabletpage>
        }
        {isoverlay && isDesktop &&
            <Desktoppage>
                <img src={img4} style={{ position: "absolute", left: "1522px", top: "119px", zIndex: "999" }} onClick={() => { setisoverlay(false) }}></img>
                <Desktoppage_title>
                    <div style={{ width: "1150px", height: "65px", textAlign: "left", fontSize: "40px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {overlayinfo.title}
                    </div>
                    <div style={{ width: "1200px", height: "35px", display: "flex", alignItems: "center", fontSize: "20px" }}>
                        인터뷰이 | {overlayinfo.name}&nbsp;&nbsp;&nbsp;&nbsp;{overlayinfo.time}
                    </div>
                </Desktoppage_title>
                <Desktoppage_youtube style={{ left: "360.34" }}>
                    <YouTube opts={opts2} videoId={overlayinfo.youtubeid}></YouTube>
                </Desktoppage_youtube>
                <Pagebtn onClick={() => { prevbtnclick() }} style={{ left: "1482px", top: "920px", position: "absolute" }}>
                    <TfiArrowCircleLeft style={{ width: "40px", height: "40px" }} />
                </Pagebtn>
                <Pagebtn onClick={() => { nextbtnclick() }} style={{ left: "1526px", top: "920px", position: "absolute" }}>
                    <TfiArrowCircleRight style={{ width: "40px", height: "40px" }} />
                </Pagebtn>
            </Desktoppage>
        }
    </>

}

export default Secondpage

const Desktoppage = styled.div`
font-family: Gothic A1;
width:1920px;
height:975px;
position:relative;
padding-top:95px;
background-color:white;
z-index:9998;
`

const Desktoppage_title = styled.div`
position:absolute;
top:119px;
left:360.34px;
width:1200px;
height:100px;
`

const Desktoppage_youtube = styled.div`
position:absolute;
top:219px;
left:360.34px;
width:1200px;
height:693.42px;
`

const Tabletpage = styled.div`
font-family: Gothic A1;
width:1440px;
height:880px;
position:relative;
padding-top:95px;
background-color:white;
z-index:9998;
`

const Tabletpage_title = styled.div`
position:absolute;
top:119px;
left:120.5px;
width:1200px;
height:100px;
`
const Tabletpage_youtube = styled.div`
position:absolute;
top:219px;
left:124px;
width:1200px;
height:693.42px;
`

const Mobilepage = styled.div`
font-family: Gothic A1;
width:1024px;
height:673px;
position:relative;
padding-top:95px;
background-color:white;
z-index:9998;
`
const Mobilepage_youtube = styled.div`
position:absolute;
top:220px;
left:124px;
width:776px;
height:470px;
`

const Mobilepage_title = styled.div`
position:absolute;
top:120px;
left:124px;
width:776px;
height:100px;
`

const Pagebtn = styled.div`
position:absolute;
width:40px;
height:40px;
top:1150px;
`

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
height:auto;
display:flex;
flex-direction:column;
z-index:9997;
background-color:white;
`;

const SelectBar = styled.div`
width:100%px;
height:81px;
display:flex;
align-items:center;
position:relative;
`

const Changebtn = styled.div`
position:fixed;
width:78px;
height:24px;
right:${(props) => { return (props.isMobile ? "none" : "2%") }};
left:${(props) => { return (props.isMobile ? "910px" : "none") }};
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

const SelectBtn = styled.div`
width:116px;
height:36px;
position:absolute;
display:flex;
color:${(props) => (props.color ? "black" : "grey")};
justify-content:center;
align-items:center;
font-size: 35px;
font-style: normal;
font-weight: 400;
&:hover {
    cursor:pointer;
  }
`
