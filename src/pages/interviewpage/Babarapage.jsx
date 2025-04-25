import { motion, AnimatePresence } from "framer-motion";
import styled,{keyframes} from "styled-components";
import { useState } from "react";
import babarahoverimg from "../../assets/Hoverimg/babarahoverimg.png";
import babaratitleimg from "../../assets/interview_title_img/title_babara.svg"
import { useRef, useEffect } from "react";
import recbtn from "../../assets/changebtnimg/ractanglebtn.png"

const Babarapage = ({ setpagestate, setbtnclick }) => {

    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef(null)
    const [divIndex, setdivIndex] = useState(0);


    useEffect(() => {
        // 마우스가 올라가면 1초마다 콜백 호출
        if (isHovered) {
            intervalRef.current = window.setInterval(() => {
                console.log(divIndex)
                setdivIndex(prev => (prev + 1) % 4);
            }, 700);
        } else {
            // 마우스가 떠나면 인터벌 해제
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setdivIndex(0)
        }

        // 컴포넌트 언마운트 시에도 인터벌 정리
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovered]);

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

    const titleimg = babaratitleimg

    const img3 = babarahoverimg;

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
                    >
                        <Container clicked={isClicked}>
                            <Namebar>바바라</Namebar>
                            <Titleimg move2={move2} src={titleimg}></Titleimg>
                            <Discriptbar>
                                바바라는 2011년도에 가수로 데뷔를 했고 현재는 보컬 트레이너로 활동을 하고 있습니다. 과거 연예계를 경험
                                하며 겪은 섭식장애 그리고 보컬트레이너로서 보는 섭식장애를 겪는 학생들. 이에 대해 그는 미디어가 시대에
                                미치는 영향에 대해 힘있는 목소리로 이야기합니다. 바바라 라는 이름이 가수 혹은 보컬트레이너 라는 키워드에 멈추지 않고 누군가에게 용기가 될 수 있는 활동가로 불릴 수 있을 때까지, 그의 목소리는 계속해서 울려 퍼지고 있습니다.
                            </Discriptbar>




                            {isClicked && <Overlay onClick={() => { setIsClicked(!isClicked); moving(!isClicked) }} />}
                        </Container>
                        <Personimg
                            src={img3}
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
                                        style={{ left: "680px", top: "470px" }}
                                        onMouseEnter={() => { setIsHovered(true); setmouseenter2(true); }}
                                        onMouseLeave={() => { setIsHovered(false); setmouseenter2(false); }}
                                    >
                                        <AnimatePresence>
                                            {mouseenter2 && divIndex === 2 ? (
                                                <motion.img
                                                key="diamond"
                                                src={recbtn}
                                                alt="button"
                                          
                                                // 등장 시: 회전 0°에서 바로 보이기
                                                initial={{ opacity: 1, rotate: 0 }}
                                          
                                                // 한 번만 45° 회전
                                                animate={{ rotate: 45, opacity: 1 }}
                                          
                                                // 사라질 때: 그 상태(45°) 그대로 페이드아웃
                                                exit={{ opacity: 0 }}
                                          
                                                transition={{
                                                  // 회전에만 0.5초
                                                  rotate: { duration: 0.5, ease: "easeInOut" },
                                                  // 페이드아웃에만 0.3초
                                                  opacity: { duration: 0.3, ease: "easeInOut" }
                                                }}
                                              />
                                            ) : (
                                                mouseenter2 && (
                                                    <motion.div
                                                        key={divIndex}                           // divIndex가 바뀔 때마다 AnimatePresence가 새로 렌더
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.5 }}           // 페이드 인/아웃 속도 (0.5초)
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}         // Commentbox 안에서 위치 조절이 필요하면 추가
                                                    >
                                                        {divIndex === 0 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }} />}
                                                        {divIndex === 1 && <img src={recbtn} alt="button" />}

                                                    </motion.div>

                                                )
                                            )}
                                        </AnimatePresence>


                                    </Commentbox>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {mouseenter2 && <Infobox2>
                            <Infobox2_sub>다이어트 약을<br></br>
                                처방받은 적이 있다.</Infobox2_sub>
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
                                        style={{ left: "830px", top: "660px" }}
                                        isClicked={isClicked}
                                        onMouseEnter={() => { setIsHovered(true); setmouseenter3(true) }}
                                        onMouseLeave={() => { setIsHovered(false); setmouseenter3(false) }}
                                    >
                                        <AnimatePresence>
                                            {mouseenter3 && divIndex === 2 ? (
                                                <motion.img
                                                key="diamond"
                                                src={recbtn}
                                                alt="button"
                                          
                                                // 등장 시: 회전 0°에서 바로 보이기
                                                initial={{ opacity: 1, rotate: 0 }}
                                          
                                                // 한 번만 45° 회전
                                                animate={{ rotate: 45, opacity: 1 }}
                                          
                                                // 사라질 때: 그 상태(45°) 그대로 페이드아웃
                                                exit={{ opacity: 0 }}
                                          
                                                transition={{
                                                  // 회전에만 0.5초
                                                  rotate: { duration: 0.5, ease: "easeInOut" },
                                                  // 페이드아웃에만 0.3초
                                                  opacity: { duration: 0.3, ease: "easeInOut" }
                                                }}
                                              />
                                            ) : (
                                                mouseenter3 && (
                                                    <motion.div
                                                        key={divIndex}                           // divIndex가 바뀔 때마다 AnimatePresence가 새로 렌더
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.5 }}           // 페이드 인/아웃 속도 (0.5초)
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}         // Commentbox 안에서 위치 조절이 필요하면 추가
                                                    >
                                                        {divIndex === 0 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }} />}
                                                        {divIndex === 1 && <img src={recbtn} alt="button" />}

                                                    </motion.div>

                                                )
                                            )}
                                        </AnimatePresence>
                                    </Commentbox>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {mouseenter3 && <Infobox3>
                            <Infobox3_sub>2011년 가수로<br></br>
                                데뷔했다.</Infobox3_sub>
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
                                        style={{ left: "1090px", top: "350px" }}
                                        isClicked={isClicked}
                                        onMouseEnter={() => { setIsHovered(true); setmouseenter1(true) }}
                                        onMouseLeave={() => { setIsHovered(false); setmouseenter1(false) }}
                                    >
                                        <AnimatePresence>
                                            {mouseenter1 && divIndex === 2 ? (
                                               <motion.img
                                               key="diamond"
                                               src={recbtn}
                                               alt="button"
                                         
                                               // 등장 시: 회전 0°에서 바로 보이기
                                               initial={{ opacity: 1, rotate: 0 }}
                                         
                                               // 한 번만 45° 회전
                                               animate={{ rotate: 45, opacity: 1 }}
                                         
                                               // 사라질 때: 그 상태(45°) 그대로 페이드아웃
                                               exit={{ opacity: 0 }}
                                         
                                               transition={{
                                                 // 회전에만 0.5초
                                                 rotate: { duration: 0.5, ease: "easeInOut" },
                                                 // 페이드아웃에만 0.3초
                                                 opacity: { duration: 0.3, ease: "easeInOut" }
                                               }}
                                             />
                                            ) : (
                                                mouseenter1 && (
                                                    <motion.div
                                                        key={divIndex}                           // divIndex가 바뀔 때마다 AnimatePresence가 새로 렌더
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.5 }}           // 페이드 인/아웃 속도 (0.5초)
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: "100%",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}         // Commentbox 안에서 위치 조절이 필요하면 추가
                                                    >
                                                        {divIndex === 0 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }} />}
                                                        {divIndex === 1 && <img src={recbtn} alt="button" />}

                                                    </motion.div>

                                                )
                                            )}
                                        </AnimatePresence>
                                    </Commentbox>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {mouseenter1 && <Infobox1>
                            <Infobox1_sub>현재 보컬 트레이너로서
                                학생들을 가르치고 있다.</Infobox1_sub>
                        </Infobox1>}
                        <Navigatebar onClick={() => {
                            setpagestate("main"); setbtnclick([0, 0, 0, 1]); window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>고백, 들으러가기{`>`}</Navigatebar>
                    </motion.div>
                </AnimatePresence>
            </ScrollContainer>
        </>
    );
}

export default Babarapage

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

const Titleimg = styled.img`
position: absolute;
left: 117px; 
top: 50px; 
z-index: 10;
flex-shrink:0;
transform: ${({ move2 }) => `translateY(${move2}px)`};
transition: transform 0.3s ease-in-out ;
 width: 1350px;
 height: 402px;
`


// 설명 부분
const Discriptbar = styled.div`
    display:flex;
    align-items:flex-end;
    width: 1547px;
    height: 226px;
    position: absolute;
    left: 22px;
    color: white;
    top: 786px;
    color: #FFF;
leading-trim: both;
text-edge: cap;
font-size: 32px;
font-style: normal;
font-weight: 600;
line-height: 125%; /* 40px */
    z-index: 10;
`;

// 이미지 스타일 (클릭했을 때 강조)
const Personimg = styled.img`
    width:639px;
    height:655px;
    left: 480px;
    transform-origin: top left;
    transform: ${({ move }) => `translateY(${move}px)`};
    opacity: ${({ isClicked }) => (isClicked ? 0.8 : 0.5)};
    top: 260px;
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
left: 1157px;
position:absolute;
top:260px;
background-color:yellow;
width:258px;
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
left: 747px;
position:absolute;
top:470px;
background-color:yellow;
width:219px;
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
left: 897px;
position:absolute;
top:660px;
width:174px;
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