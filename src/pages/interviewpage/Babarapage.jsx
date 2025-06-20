import { motion, AnimatePresence } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import babarahoverimg from "../../assets/Hoverimg/babarahoverimg.png";
import babaratitleimg from "../../assets/interview_title_img/title_babara.svg"
import { useRef, useEffect } from "react";
import recbtn from "../../assets/changebtnimg/ractanglebtn.png"


const Leejinsolpage = ({ setpagestate, setbtnclick }) => {

    const containerRef = useRef(null);
    const [leftPos, setLeftPos] = useState(0);

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

    useEffect(() => {
  const updatePosition = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setLeftPos(containerWidth);
    }
  };

  updatePosition();
  window.addEventListener("resize", updatePosition);
  return () => window.removeEventListener("resize", updatePosition);
}, []);

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

    const img2 = babarahoverimg;

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

            <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                        style={{ userSelect: "none" }}
                    >
                        <Container clicked={isClicked} ref={containerRef}>
                <Namebar>바바라</Namebar>
                <Titlebar move2={move2} src={babaratitleimg}></Titlebar>
            
                <Discriptbar>
                                바바라는 2011년도에 가수로 데뷔를 했고 현재는 보컬 트레이너로 활동을 하고 있습니다. 과거 연예계를 경험
                                하며 겪은 섭식장애 그리고 보컬트레이너로서 보는 섭식장애를 겪는 학생들. 이에 대해 그는 미디어가 시대에
                                미치는 영향에 대해 힘있는 목소리로 이야기합니다. 바바라 라는 이름이 가수 혹은 보컬트레이너 라는 키워드에 멈추지 않고 누군가에게 용기가 될 수 있는 활동가로 불릴 수 있을 때까지, 그의 목소리는 계속해서 울려 퍼지고 있습니다.
                </Discriptbar>

            </Container>
            <Personimg
                            src={img2}
                            left={leftPos}
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
                                        style={{left: `calc(316px + ${leftPos*0.52}px)`, top: "76%" ,width:`${leftPos*0.017}px`,height:`${leftPos*0.017}px`}}
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
                                                    style={{width: "1.2vw", height: "1.2vw"}}

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
                                                        {divIndex === 0 && <div style={{ width: "1vw", height: "1vw", backgroundColor: "black", borderRadius: "50%" }} />}
                                                        {divIndex === 1 && <img src={recbtn} alt="button" style={{width: "1.2vw", height: "1.2vw"}}/>}

                                                    </motion.div>

                                                )
                                            )}
                                        </AnimatePresence>
                                    </Commentbox>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {mouseenter1 && <div style={{position:"absolute",left:`calc(316px + ${leftPos*0.541}px)`,borderBottom:"3px solid black",width:`${leftPos*0.02}px`,height:"50px",top:"71%"}}></div>}
                        {mouseenter1 && <Infobox1 style={{width:`${leftPos*0.08}px`,height:`${leftPos*0.027}px`,left:`calc(316px + ${leftPos*0.56}px)`}}>
                            <Infobox1_sub>2011년 가수로
                                데뷔했다.</Infobox1_sub>
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
                                        style={{left: `calc(316px + ${leftPos*0.7}px)`, top: "40%" ,width:`${leftPos*0.017}px`,height:`${leftPos*0.017}px`}}
                                        isClicked={isClicked}
                                        onMouseEnter={() => { setIsHovered(true); setmouseenter2(true) }}
                                        onMouseLeave={() => { setIsHovered(false); setmouseenter2(false) }}
                                    >
                                        <AnimatePresence>
                                            {mouseenter2 && divIndex === 2 ? (
                                                <motion.img
                                                    key="diamond"
                                                    src={recbtn}
                                                    alt="button"
                                                    style={{width: "1.2vw", height: "1.2vw"}}

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
                                                        {divIndex === 0 && <div style={{ width: "1vw", height: "1vw", backgroundColor: "black", borderRadius: "50%" }} />}
                                                        {divIndex === 1 && <img src={recbtn} alt="button" style={{width: "1.2vw", height: "1.2vw"}}/>}

                                                    </motion.div>

                                                )
                                            )}
                                        </AnimatePresence>
                                    </Commentbox>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {mouseenter2 && <div style={{position:"absolute",left:`calc(316px + ${leftPos*0.721}px)`,borderBottom:"3px solid black",width:`${leftPos*0.02}px`,height:"50px",top:"35%"}}></div>}
                        {mouseenter2 && <Infobox2 style={{width:`${leftPos*0.13}px`,height:`${leftPos*0.03}px`,left:`calc(316px + ${leftPos*0.74}px)`}}>
                            <Infobox2_sub>현재 보컬 트레이너로서
                                학생들을 가르치고 있다.</Infobox2_sub>
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
                                        style={{left: `calc(316px + ${leftPos*0.43}px)`, top: "54%" ,width:`${leftPos*0.017}px`,height:`${leftPos*0.017}px`}}
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
                                                    style={{width: "1.2vw", height: "1.2vw"}}

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
                                                        {divIndex === 0 && <div style={{ width: "1vw", height: "1vw", backgroundColor: "black", borderRadius: "50%" }} />}
                                                        {divIndex === 1 && <img src={recbtn} alt="button" style={{width: "1.2vw", height: "1.2vw"}}/>}

                                                    </motion.div>

                                                )
                                            )}
                                        </AnimatePresence>
                                    </Commentbox>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {mouseenter3 && <div style={{position:"absolute",left:`calc(316px + ${leftPos*0.45}px)`,borderBottom:"3px solid black",width:`${leftPos*0.02}px`,height:"50px",top:"49%"}}></div>}
                        {mouseenter3 && <Infobox3 style={{width:`${leftPos*0.1}px`,height:`${leftPos*0.03}px`,left:`calc(316px + ${leftPos*0.47}px)`}}>
                            <Infobox3_sub>다이어트 약을
                                처방받은 적이 있다.</Infobox3_sub>
                        </Infobox3>}


                        
                        


            <Navigatebar onClick={() => {
                            setpagestate("main"); setbtnclick([0, 0, 1, 0]); window.scrollTo({ top: 0, behavior: "smooth" });
                        }}><text style={{position:"absolute",right:"2%"}}>고백, 들으러가기&nbsp;{`>`}</text></Navigatebar>
                        
                    </motion.div>
                </AnimatePresence>
            
            {/* <ScrollContainer
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
                                        onMouseEnter={() => { setIsHovered(true); setmouseenter2(true) }}
                                        onMouseLeave={() => { setIsHovered(false); setmouseenter2(false) }}
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
                        {mouseenter2 && <div style={{position:"absolute",left:"1212px",borderBottom:"3px solid black",width:"35px",height:"50px",top:"330px"}}></div>}
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
                        {mouseenter3 && <div style={{position:"absolute",left:"702px",borderBottom:"3px solid black",width:"35px",height:"50px",top:"440px"}}></div>}
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
                        {mouseenter1 && <div style={{position:"absolute",left:"962px",borderBottom:"3px solid black",width:"35px",height:"50px",top:"10px"}}></div>}
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
                                        onMouseEnter={() => {setIsHovered(true);setmouseenter4(true)}}
                                        onMouseLeave={() => {setIsHovered(false); setmouseenter4(false)}}
                                    >
                                        <AnimatePresence>
                                            {mouseenter4 && divIndex === 2 ? (
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
                                                mouseenter4 && (
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
                         {mouseenter4 && <div style={{position:"absolute",left:"1072px",borderBottom:"3px solid black",width:"35px",height:"50px",top:"650px"}}></div>}
                        {mouseenter4 && <Infobox4>
                            <Infobox4_sub>‘여기서는 진솔하게'라는
                                섭식장애 개인 유투브를
                                운영 중이다.</Infobox4_sub>
                        </Infobox4>}
                        <Navigatebar onClick={() => {
                            setpagestate("main"); setbtnclick([0, 0, 1, 0]); window.scrollTo({ top: 0, behavior: "smooth" });
                        }}><text style={{position:"absolute",right:"2%"}}>고백, 들으러가기&nbsp;{`>`}</text></Navigatebar>
                    </motion.div>
                </AnimatePresence>
                
            </ScrollContainer> */}
        </>
    );


}

export default Leejinsolpage


const Container = styled.div`
    width: calc(100vw - 316px);
    height: calc(100vh - 95px);
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
position:absolute;
&:hover {
    background-color: #FFFFA3;
    transition: background-color 0.3s ease-in-out
    }
`;

// 이름 표시
const Namebar = styled.text`
    left: 21px;
    top: 26px;
    font-size:2.5vw;
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
const Titlebar = styled.img`
    width:100%;
    height:40%;
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

    z-index: 10;
    transform: ${({ move2 }) => `translateY(${move2}px)`};
    transition: transform 0.3s ease-in-out ;
`;

// 설명 부분
const Discriptbar = styled.div`
    position: absolute;
    left: 22px;
    color: white;
    top: 73%;
    font-size: 1.8vw;
    font-style: normal;
    font-weight: 600;
    line-height: 125%;
    z-index: 10;
`;

// 이미지 스타일 (클릭했을 때 강조)
const Personimg = styled.img`
     left: ${({ left }) => `calc(316px + ${left*0.3}px)`};
    width:35%;
    height:75%;
    position:absolute;
    transform-origin: top left;
    transform: ${({ move }) => `translateY(${move}px)`};
    opacity: ${({ isClicked }) => (isClicked ? 0.8 : 0.5)};
    top: 25%;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: ${({ move }) => `translateY(${move}px) scale(1.1)`};
        opacity: 0.8;
    }
    
`;

const Commentbox = styled.div`

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
top:76%;
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
font-size: 1vw;
font-style: normal;
font-weight: 600;
line-height: 140%;
`

const Infobox2 = styled.div`
left: 1247px;
position:absolute;
top:40%;
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
font-size: 1vw;
font-style: normal;
font-weight: 600;
line-height: 140%;
`

const Infobox3 = styled.div`
left: 737px;
position:absolute;
top:54%;
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
font-size: 1vw;
font-style: normal;
font-weight: 600;
line-height: 140%;
`

const Infobox4 = styled.div`
position:absolute;
top:78%;
background-color:yellow;

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
font-size: 1vw;
font-style: normal;
font-weight: 600;
line-height: 140%;
`