import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import leesunminhoverimg from "../../assets/Hoverimg/leesunminhoverimg.png";
import leesunmintitle from "../../assets/interview_title_img/title_Leesunmin.svg"
import { useRef, useEffect } from "react";
import recbtn from "../../assets/changebtnimg/ractanglebtn.png"
import comment1 from "../../assets/commentimg/선민_코멘트1.svg"
import comment2 from "../../assets/commentimg/선민_코멘트2.svg"
import comment3 from "../../assets/commentimg/선민_코멘트3.svg"



const Leesunminpage = ({ setpagestate, setbtnclick }) => {

    const containerRef = useRef(null);
    const [leftPos, setLeftPos] = useState(0);

    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef(null)
    const [divIndex, setdivIndex] = useState(0);


    useEffect(() => {

        // 마우스가 올라가면 1초마다 콜백 호출
        if (isHovered) {
            intervalRef.current = window.setInterval(() => {
                // console.log(divIndex)
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

    const titleimg = leesunmintitle;
    const img2 = leesunminhoverimg;

    const moving = (i) => {
        if (i) {
            setmove(-30)
            setmove2(200)
        }
        else {
            setmove(0)
            setmove2(0)
        }
    }

    const alloverlay = ()=>{
        if(isClicked){
            setIsClicked(!isClicked)
            moving(!isClicked)
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
                    style={{ userSelect: "none", display: "flex", alignItems: "center" }}
                >
                    <Container clicked={isClicked} ref={containerRef} onClick={()=>{alloverlay()}}>
                        <Namebar>이선민</Namebar>
                        <Titlebar move2={move2} src={leesunmintitle}></Titlebar>

                        <Discriptbar>
                            예술가이자 아트디렉터로 활동하고 있는 이선민님은
                            ‘섭식장애건강권연대’를 만들어 다양한 활동과 프로그램을
                            기획하는데 앞장서고 있습니다. 무용수를 준비하던 학창시절부터 긴 시간동안 함께해온 섭식장애와의 이야기를 가진 선민님은
                            '안전한 식탁'과 같은 여러 프로그램을 기획하며 섭식장애는 남녀노소를 불문하고 누구에게나 일어날 수 있음을 이야기합니다.
                            섭식장애를 겪는 모든 사람들이 건강한 식습관과 관련된 경험을 꼭 해보고, 그를 통해 식사와 자기 스스로에게 긍정적인 태도를 가질 수 있도록 기획자로서의 정진을 멈추지 않고 계속해서 나아가고 있습니다.
                        </Discriptbar>

                    </Container>
                    <Personimg

                        left={leftPos}
                        isClicked={isClicked}
                        onClick={() => { setIsClicked(!isClicked); moving(!isClicked) }}
                        move={move}
                    >
                        <img src={img2} style={{width:"100%",height:"100%"}}></img>
                        <AnimatePresence>
                        {isClicked && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Commentbox
                                    style={{ left: "22%", top: "72%", width: `${leftPos * 0.017}px`, height: `${leftPos * 0.017}px` }}
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
                                                style={{ width: "1.2vw", height: "1.2vw" }}

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
                                                    {divIndex === 1 && <img src={recbtn} alt="button" style={{ width: "1.2vw", height: "1.2vw" }} />}

                                                </motion.div>

                                            )
                                        )}
                                    </AnimatePresence>
                                </Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {mouseenter1 && <div style={{ position: "absolute", left:"27.5%", borderTop: "3px solid black", width: `${leftPos * 0.02}px`, height: "50px", top: "72%" }}></div>}
                    
                     {mouseenter1 && <img src={comment3} style={{left:"32%",top:"72%",position:"absolute" ,width:"40%"}}></img>}
                    


                    <AnimatePresence>
                        {isClicked && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Commentbox
                                    style={{ left: "98%", top: "38%", width: `${leftPos * 0.017}px`, height: `${leftPos * 0.017}px` }}
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
                                                style={{ width: "1.2vw", height: "1.2vw" }}

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
                                                    {divIndex === 1 && <img src={recbtn} alt="button" style={{ width: "1.2vw", height: "1.2vw" }} />}

                                                </motion.div>

                                            )
                                        )}
                                    </AnimatePresence>
                                </Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {mouseenter2 && <div style={{ position: "absolute", left: "103.5%", borderTop: "3px solid black", width: `${leftPos * 0.02}px`, height: "50px", top: "38%" }}></div>}
                    {mouseenter2 && <img src={comment2} style={{left:"108%",top:"38%",position:"absolute",width:"60%"}}></img>}

                    <AnimatePresence>
                        {isClicked && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <Commentbox
                                    style={{ left: "86%", top: "5%", width: `${leftPos * 0.017}px`, height: `${leftPos * 0.017}px` }}
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
                                                style={{ width: "1.2vw", height: "1.2vw" }}

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
                                                    {divIndex === 1 && <img src={recbtn} alt="button" style={{ width: "1.2vw", height: "1.2vw" }} />}

                                                </motion.div>

                                            )
                                        )}
                                    </AnimatePresence>
                                </Commentbox>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {mouseenter3 && <div style={{ position: "absolute", left: "91.5%", borderTop: "3px solid black", width: `${leftPos * 0.02}px`, height: "50px", top: "5%" }}></div>}
                    {mouseenter3 && <img src={comment1} style={{left:"96%",top:"5%",position:"absolute", width:"30%"}}></img>}
                        
                    </Personimg>









                </motion.div>
                <Navigatebar onClick={() => {
                    setpagestate("main"); setbtnclick([0, 0, 1, 0]); window.scrollTo({ top: 0, behavior: "smooth" });
                }}><text style={{ position: "absolute", right: "1%" }}>고백, 들으러가기&nbsp;{`>`}</text></Navigatebar>
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

export default Leesunminpage


const Container = styled.div`
    width: calc(100vw - 316px);
    height: calc(100vh - 95px - 82px);
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
width: calc(100vw - 316px);
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
    bottom: 1%;
    font-size: 1.7vw;
    font-style: normal;
    font-weight: 600;
    line-height: 125%;
    z-index: 10;
`;

// 이미지 스타일 (클릭했을 때 강조)
const Personimg = styled.div`
     left: ${({ left }) => `calc(316px + ${left * 0.325}px)`};
    width:26%;
    aspect-ratio:594.66/754.14;
    position:absolute;
    transform-origin: top left;
    transform: ${({ move }) => `translateY(${move}px)`};
    opacity: ${({ isClicked }) => (isClicked ? 0.8 : 0.5)};
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
    transform: ${({ move, isClicked }) => 
      isClicked ? `translateY(${move}px) scale(1)` : `translateY(${move}px) scale(1.1)`};
    opacity: ${({ isClicked }) => (isClicked ? 0.9 : 0.9)};
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
top:72%;
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
top:38%;
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
top:5%;
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