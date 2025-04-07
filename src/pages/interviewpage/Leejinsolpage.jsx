import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import leejinsoltitle from "../../assets/interview_title_img/title_Leejinsol.svg"
import leejinsolhoverimg from "../../assets/Hoverimg/leejinsolhoverimg.png";
import { useRef } from "react";



const Leejinsolpage = ({ setpagestate, setbtnclick }) => {

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

    console.log(setbtnclick)
    const [isClicked, setIsClicked] = useState(false);

    const [move, setmove] = useState(0)
    const [move2, setmove2] = useState(0)

    const [mouseenter1, setmouseenter1] = useState(false)
    const [mouseenter2, setmouseenter2] = useState(false)
    const [mouseenter3, setmouseenter3] = useState(false)
    const [mouseenter4, setmouseenter4] = useState(false)

    const titleimg = leejinsoltitle

    const img2 = leejinsolhoverimg;

    const moving = (i) => {
        if (i) {
            setmove(-70)
            setmove2(200)
        }
        else {
            setmove(0)
            setmove2(0)
        }
    }

    return (
        <>
        <ScrollContainer
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                    style={{ userSelect: "none" }}
                >
                    <Container clicked={isClicked}>
                        <Namebar>이진솔</Namebar>
                        <Titlebar move2={move2}>
                            <img src={leejinsoltitle}></img>
                        </Titlebar>
                        <Discriptbar>
                            섭식장애  상담사이자 경험자 입니다.  유튜브와 블로그에 관련 주제를 다루며,
                            대학원에서 연구를 병행하고 있습니다.
                            특히 섭식장애를 단순히  개인 문제가 아닌 주변인이 함께 겪는 질병으로 바라보며,
                            자조 모임을  운영하는 등  다각적인 지원 활동을 하고 있습니다.
                        </Discriptbar>

                        {/* 클릭하면 강조되는 이미지 */}

                        {/* 배경 클릭하면 원래 상태로 복귀 */}
                        {isClicked && <Overlay onClick={() => { setIsClicked(!isClicked); moving(!isClicked) }} />}
                    </Container>
                    <Personimg
                        src={img2}
                        isClicked={isClicked}
                        onClick={() => { setIsClicked(!isClicked); moving(!isClicked) }}
                        move={move}
                    />
                    <AnimatePresence>
                        {isClicked && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Commentbox
                                    style={{ left: "1180px", top: "380px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter2(true)}
                                    onMouseLeave={() => setmouseenter2(false)}
                                >{mouseenter2 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }}></div>}</Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {mouseenter2 && <Infobox2>
                        <Infobox2_sub>섭식장애에 대한
                            논문을 기재한 바 있다.</Infobox2_sub>
                    </Infobox2>}
                    <AnimatePresence>
                        {isClicked && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Commentbox
                                    style={{ left: "670px", top: "490px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter3(true)}
                                    onMouseLeave={() => setmouseenter3(false)}
                                >{mouseenter3 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }}></div>}</Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {mouseenter3 && <Infobox3>
                        <Infobox3_sub>논문 기재 이후 2024년 현재,
                            박사과정을 지내고 있다.</Infobox3_sub>
                    </Infobox3>}
                    <AnimatePresence>
                        {isClicked && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Commentbox
                                    style={{ left: "930px", top: "60px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter1(true)}
                                    onMouseLeave={() => setmouseenter1(false)}
                                >{mouseenter1 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }}></div>}</Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {mouseenter1 && <Infobox1>
                        <Infobox1_sub>섭식장애 상담자이자
                            경험자이다.</Infobox1_sub>
                    </Infobox1>}
                    <AnimatePresence>
                        {isClicked && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Commentbox
                                    style={{ left: "1040px", top: "700px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter4(true)}
                                    onMouseLeave={() => setmouseenter4(false)}
                                >{mouseenter4 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }}></div>}</Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {mouseenter4 && <Infobox4>
                        <Infobox4_sub>‘여기서는 진솔하게'라는
                            섭식장애 개인 유투브를
                            운영 중이다.</Infobox4_sub>
                    </Infobox4>}
                    <Navigatebar onClick={() => {
                        setpagestate("main"); setbtnclick([0, 0, 1, 0]); window.scrollTo({ top: 0, behavior: "smooth" });
                    }}>고백, 들으러가기{`>`}</Navigatebar>
                </motion.div>
            </AnimatePresence>
            </ScrollContainer>
        </>
    );


}

export default Leejinsolpage

const ScrollContainer = styled.div`
    width: calc(100vw - 316px);
    height: calc(100vh - 95px);
    overflow: scroll;
    user-select: none;
    cursor: grab;
    position: relative;

    /* 스크롤바 숨기기 (Chrome, Safari, Opera) */
    &::-webkit-scrollbar {
        display: none;
    }
    /* IE, Edge, Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const Container = styled.div`
    width: 1605px;
    height: 1023px;
    background-color: black;
    position: relative;
    overflow: hidden;
    transition: filter 0.3s ease-in-out;
    ${({ clicked }) => clicked && `filter: blur(5px) brightness(50%);`}
`;

// 배경 클릭 시 원래 상태로 돌아가기 위한 오버레이
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 15;
    cursor: pointer;
`;

// 내비게이션 바 (기본 유지)
const Navigatebar = styled.div`
display: flex;
width: 1605px;
height: 82px;
align-items: center;
justify-content:right;
flex-shrink: 0;
background-color: yellow;
font-size: 42px;
font-style: normal;
font-weight: 600;
cursor: pointer;
&:hover {
    background-color: #FFFFA3;
    transition: background-color 0.3s ease-in-out
    }
`;

// 이름 표시
const Namebar = styled.div`
    left: 21px;
    top: 26px;
    width: 136px;
    height: 36px;
    font-size: 48px;
    font-style: normal;
    font-weight: 600;
    color: white;
    position: absolute;
    leading-trim: both;
    text-edge: cap;
    line-height: 108%;
    letter-spacing: -2.88px;
    z-index: 10;
`;

// 제목
const Titlebar = styled.div`
    text-align: center;
    text-shadow: 0px 8px 22.1px rgba(0, 0, 0, 0.2);
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #000;
    font-size: 80px;
    font-style: normal;
    font-weight: 800;
    line-height: 128%;
    position: absolute;
    top: 81px;
    left: 132px;
    z-index: 10;
    transform: ${({ move2 }) => `translateY(${move2}px)`};
    transition: transform 0.3s ease-in-out ;
`;

// 설명 부분
const Discriptbar = styled.div`
    width: 1547px;
    height: 119px;
    position: absolute;
    left: 22px;
    color: white;
    top: 883px;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%;
    z-index: 10;
`;

// 이미지 스타일 (클릭했을 때 강조)
const Personimg = styled.img`
    width:735px;
    height:786px;
    left: 470px;
    transform-origin: top left;
    transform: ${({ move }) => `translateY(${move}px)`};
    opacity: ${({ isClicked }) => (isClicked ? 0.8 : 0.5)};
    top: 140px;
    position: absolute;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: ${({ move }) => `translateY(${move}px) scale(1.1)`};
        opacity: 0.8;
    }
`;

const Commentbox = styled.div`
width:27px;
height:27px;
border:3px solid black;
position:absolute;
z-index;100;
background-color:yellow;
transition: opacity 0.3s ease-in-out;
display:flex;
justify-content:center;
align-items:center;
`

const Infobox1 = styled.div`
left: 997px;
position:absolute;
top:60px;
background-color:yellow;
width:227px;
height:79px;
display: flex;
padding: 18px 22px;
justify-content: center;
align-items: center;
gap: 10px;
border: 3px solid #000;
`

const Infobox1_sub = styled.div`
color: #010101;
leading-trim: both;
text-edge: cap;
font-family: "Gothic A1";
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 140%;
`

const Infobox2 = styled.div`
left: 1247px;
position:absolute;
top:380px;
background-color:yellow;
width:244px;
height:79px;
display: flex;
padding: 18px 22px;
justify-content: center;
align-items: center;
gap: 10px;
border: 3px solid #000;
`
const Infobox2_sub = styled.div`
color: #010101;
leading-trim: both;
text-edge: cap;
font-family: "Gothic A1";
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 140%;
`

const Infobox3 = styled.div`
left: 737px;
position:absolute;
top:490px;
width:294px;
height:79px;
display: flex;
padding: 18px 22px;
justify-content: center;
align-items: center;
gap: 10px;
background-color:yellow;
border: 3px solid #000;
`
const Infobox3_sub = styled.div`
color: #010101;
leading-trim: both;
text-edge: cap;
font-family: "Gothic A1";
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 140%;
`

const Infobox4 = styled.div`
left: 1107px;
position:absolute;
top:700px;
background-color:yellow;
width:260px;
height:107px;
display: flex;
padding: 18px 22px;
justify-content: center;
align-items: center;
gap: 10px;
border: 3px solid #000;
`

const Infobox4_sub = styled.div`
color: #010101;
leading-trim: both;
text-edge: cap;
font-family: "Gothic A1";
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 140%;
`