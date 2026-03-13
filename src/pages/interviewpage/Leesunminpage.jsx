import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import leesunminhoverimg from "../../assets/Hoverimg/leesunminhoverimg.png";
import leesunmintitle from "../../assets/interview_title_img/title_Leesunmin.svg";
import Leesunmin_Comment_Points_contents from "../../datas/Leesunmin_Comment_Points_contents";
import CommentPoint from "../../components/CommentPoint";


const COMMENT_POINTS = Leesunmin_Comment_Points_contents // 코멘트 내용 불러오기


// ─── 메인 페이지 컴포넌트 ─────────────────────────────────────────────────────
const Leesunminpage = ({ setpagestate, setbtnclick }) => {
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
                        <Namebar>이선민</Namebar>
                        <Titlebar move2={move2} src={leesunmintitle} />
                        <Discriptbar>
                            예술가이자 아트디렉터로 활동하고 있는 이선민님은
                            '섭식장애건강권연대'를 만들어 다양한 활동과 프로그램을
                            기획하는데 앞장서고 있습니다. 무용수를 준비하던 학창시절부터 긴 시간동안 함께해온 섭식장애와의 이야기를 가진 선민님은
                            '안전한 식탁'과 같은 여러 프로그램을 기획하며 섭식장애는 남녀노소를 불문하고 누구에게나 일어날 수 있음을 이야기합니다.
                            섭식장애를 겪는 모든 사람들이 건강한 식습관과 관련된 경험을 꼭 해보고, 그를 통해 식사와 자기 스스로에게 긍정적인 태도를 가질 수 있도록 기획자로서의 정진을 멈추지 않고 계속해서 나아가고 있습니다.
                        </Discriptbar>
                    </Container>

                    <Personimg
                        left={leftPos}
                        isClicked={isClicked}
                        move={move}
                        onClick={handlePersonClick}
                    >
                        <img src={leesunminhoverimg} style={{ width: "100%", height: "100%" }} alt="이선민" />

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
                    setbtnclick([0, 1, 0, 0]);
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

export default Leesunminpage;


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
    width: 26%;
    aspect-ratio: 594.66/754.14;
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


