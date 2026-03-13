import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import babarahoverimg from "../../assets/Hoverimg/babarahoverimg.png";
import babaratitleimg from "../../assets/interview_title_img/title_babara.svg";
import Babara_Comment_Points_contents from "../../datas/Babara_Comment_Points_contents";
import CommentPoint from "../../components/CommentPoint";

const COMMENT_POINTS = Babara_Comment_Points_contents // 코멘트 내용 불러오기



// ─── 메인 페이지 컴포넌트 ─────────────────────────────────────────────────────
const Babarapage = ({ setpagestate, setbtnclick }) => {
    const containerRef = useRef(null);
    const [leftPos, setLeftPos] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [move, setMove] = useState(0);
    const [move2, setMove2] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            if (containerRef.current) {
                setLeftPos(containerRef.current.offsetWidth);
            }
        };
        updatePosition();
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
    }, []);

    const handlePersonClick = () => {
        const next = !isClicked;
        setIsClicked(next);
        setMove(next ? -30 : 0);
        setMove2(next ? 200 : 0);
    };

    const handleOverlayClick = () => {
        if (isClicked) handlePersonClick();
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ userSelect: "none", display: "flex", alignItems: "center" }}
                >
                    <Container clicked={isClicked} ref={containerRef} onClick={handleOverlayClick}>
                        <Namebar>바바라</Namebar>
                        <Titlebar move2={move2} src={babaratitleimg} />
                        <Discriptbar>
                            바바라는 2011년도에 가수로 데뷔를 했고 현재는 보컬 트레이너로 활동을 하고 있습니다. 과거 연예계를 경험
                            하며 겪은 섭식장애 그리고 보컬트레이너로서 보는 섭식장애를 겪는 학생들. 이에 대해 그는 미디어가 시대에
                            미치는 영향에 대해 힘있는 목소리로 이야기합니다. 바바라 라는 이름이 가수 혹은 보컬트레이너 라는 키워드에 멈추지 않고 누군가에게 용기가 될 수 있는 활동가로 불릴 수 있을 때까지, 그의 목소리는 계속해서 울려 퍼지고 있습니다.
                        </Discriptbar>
                    </Container>

                    <Personimg
                        left={leftPos}
                        isClicked={isClicked}
                        move={move}
                        onClick={handlePersonClick}
                    >
                        <img src={babarahoverimg} style={{ width: "100%", height: "100%" }} alt="바바라" />

                        {/* ✅ 최적화: 3개 중복 → 배열 map으로 단일 처리 */}
                        {COMMENT_POINTS.map(point => (
                            <CommentPoint
                                key={point.id}
                                point={point}
                                isClicked={isClicked}
                                leftPos={leftPos}
                            />
                        ))}
                    </Personimg>
                </motion.div>
            </AnimatePresence>

            <Navigatebar
                onClick={() => {
                    setpagestate("main");
                    setbtnclick([0, 0, 0, 1]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                <text style={{ position: "absolute", right: "1%" }}>
                    고백, 들으러가기&nbsp;{">"}
                </text>
            </Navigatebar>
        </>
    );
};

export default Babarapage;


// ─── Styled Components ────────────────────────────────────────────────────────
const Container = styled.div`
    width: calc(100vw - 316px);
    height: calc(100vh - 95px - 82px);
    background-color: black;
    position: relative;
    overflow: hidden;
    transition: filter 0.3s ease-in-out;
    ${({ clicked }) => clicked && `filter: blur(5px) brightness(50%);`}
`;

const Navigatebar = styled.div`
    display: flex;
    width: calc(100vw - 316px);
    height: 82px;
    align-items: center;
    justify-content: right;
    flex-shrink: 0;
    background-color: yellow;
    font-size: 42px;
    font-weight: 600;
    cursor: pointer;
    position: absolute;
    &:hover {
        background-color: #FFFFA3;
        transition: background-color 0.3s ease-in-out;
    }
`;

const Namebar = styled.text`
    left: 21px;
    top: 26px;
    font-size: 2.5vw;
    font-weight: 600;
    color: white;
    position: absolute;
    line-height: 108%;
    letter-spacing: -2.88px;
    z-index: 10;
`;

const Titlebar = styled.img`
    width: 100%;
    height: 40%;
    position: absolute;
    top: 81px;
    z-index: 10;
    transform: ${({ move2 }) => `translateY(${move2}px)`};
    transition: transform 0.3s ease-in-out;
`;

const Discriptbar = styled.div`
    position: absolute;
    left: 22px;
    color: white;
    bottom: 1%;
    font-size: 1.7vw;
    font-weight: 600;
    line-height: 125%;
    z-index: 10;
`;

const Personimg = styled.div`
    left: ${({ left }) => `calc(316px + ${left * 0.325}px)`};
    width: 30%;
    aspect-ratio: 741/759;
    position: absolute;
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
