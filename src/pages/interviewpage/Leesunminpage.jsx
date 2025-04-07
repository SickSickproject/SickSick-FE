import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import leesunminhoverimg from "../../assets/Hoverimg/leesunminhoverimg.png";
import leesunmintitle from "../../assets/interview_title_img/title_Leesunmin.svg"
import { useRef } from "react";
const Leesunminpage = ({ setpagestate, setbtnclick }) => {
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

    const titleimg = leesunmintitle

    const img1 = leesunminhoverimg;

    const moving = (i) => {
        if (i) {
            setmove(-100)
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
                    style={{userSelect:"none"}}
                >
                    <Container clicked={isClicked}>
                        <Namebar>이선민</Namebar>
                        <Titlebar move2={move2}>
                            <img src={titleimg} alt="" />
                        </Titlebar>
                        <Discriptbar>
                            예술가이자 아트디렉터로 활동하고 있는 이선민님은
                            ‘섭식장애건강권연대’를 만들어 다양한 활동과 프로그램을
                            기획하는데 앞장서고 있습니다. 무용수를 준비하던 학창시절부터 긴 시간동안 함께해온 섭식장애와의 이야기를 가진 선민님은
                            '안전한 식탁'과 같은 여러 프로그램을 기획하며 섭식장애는 남녀노소를 불문하고 누구에게나 일어날 수 있음을 이야기합니다.
                            섭식장애를 겪는 모든 사람들이 건강한 식습관과 관련된 경험을 꼭 해보고, 그를 통해 식사와 자기 스스로에게 긍정적인 태도를 가질 수 있도록 기획자로서의 정진을 멈추지 않고 계속해서 나아가고 있습니다.
                        </Discriptbar>

                        {/* 클릭하면 강조되는 이미지 */}

                        {/* 배경 클릭하면 원래 상태로 복귀 */}
                        {isClicked && <Overlay onClick={() => { setIsClicked(!isClicked); moving(!isClicked) }} />}
                    </Container>
                    <Personimg
                        src={img1}
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
                                    style={{ left: "1090px", top: "360px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter2(true)}
                                    onMouseLeave={() => setmouseenter2(false)}
                                >{mouseenter2 && <div style={{width:"20px",height:"20px",backgroundColor:"black",borderRadius:"50%"}}></div>}</Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {mouseenter2 && <Infobox2>
                        <Infobox2_sub>최근에 아이를 출산해 한 아이의<br></br>
                            엄마가 되었다.</Infobox2_sub>
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
                                    style={{ left: "660px", top: "620px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter3(true)}
                                    onMouseLeave={() => setmouseenter3(false)}
                                >{mouseenter3 && <div style={{width:"20px",height:"20px",backgroundColor:"black",borderRadius:"50%"}}></div>}</Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {mouseenter3 && <Infobox3>
                        <Infobox3_sub>예술로서 섭식장애를<br></br>
                            이야기 하는 방법을<br></br>
                            찾아가고 있다.</Infobox3_sub>
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
                                    style={{ left: "1030px", top: "90px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter1(true)}
                                    onMouseLeave={() => setmouseenter1(false)}
                                >{mouseenter1 && <div style={{width:"20px",height:"20px",backgroundColor:"black",borderRadius:"50%"}}></div>}</Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {mouseenter1 && <Infobox1>
                        <Infobox1_sub>예술기획자로<br></br> 일하고 있다.</Infobox1_sub>
                    </Infobox1>}
                    <Navigatebar onClick={() => {
                        setpagestate("main"); setbtnclick([0, 1, 0, 0]); window.scrollTo({ top: 0, behavior: "smooth" });
                    }}>고백, 들으러가기{`>`}</Navigatebar>
                </motion.div>
            </AnimatePresence>
            </ScrollContainer>
        </>
    );
};


export default Leesunminpage;

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

// 메인 컨테이너 (클릭 시 흐림 효과 적용)
const Container = styled.div`
    width: 1605px;
    height: 1023px;
    background-color: black;
    position: relative;
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
    height: 226px;
    position: absolute;
    left: 21px;
    color: white;
    top: 786px;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%;
    z-index: 10;
    display:flex;
    align-items:flex-end;
`;

// 이미지 스타일 (클릭했을 때 강조)
const Personimg = styled.img`
    width:565px;
    height:764px;
    left: 540px;
    transform-origin: top left;
    transform: ${({ move }) => `translateY(${move}px)`};
    opacity: ${({ isClicked }) => (isClicked ? 0.8 : 0.5)};
    top: 160px;
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
z-index:100;
background-color:yellow;
transition: opacity 0.3s ease-in-out;
display:flex;
justify-content:center;
align-items:center;
`

const Infobox1 = styled.div`
left: 1097px;
position:absolute;
top:90px;
background-color:yellow;
width:163px;
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
left: 1157px;
position:absolute;
top:360px;
background-color:yellow;
width:320px;
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
left: 727px;
position:absolute;
top:620px;
width:227px;
height:107px;
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