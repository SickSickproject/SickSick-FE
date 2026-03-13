import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import recbtn from "../assets/changebtnimg/ractanglebtn.png";


const CommentPoint = ({ point, isClicked, leftPos }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [divIndex, setDivIndex] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isHovered) {
            intervalRef.current = window.setInterval(() => {
                setDivIndex(prev => (prev + 1) % 4);
            }, 700);
        } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setDivIndex(0);
        }
        return () => clearInterval(intervalRef.current);
    }, [isHovered]);

    const boxSize = `${leftPos * 0.017}px`;
    const lineWidth = `${leftPos * 0.02}px`;

    return (
        <>
            {/* Commentbox (점·사각형·다이아몬드 애니메이션 버튼) */}
            <AnimatePresence>
                {isClicked && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Commentbox
                            style={{
                                left: point.box.left,
                                top: point.box.top,
                                width: boxSize,
                                height: boxSize,
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <AnimatePresence>
                                {/* 3단계: 다이아몬드 (45° 회전) */}
                                {isHovered && divIndex === 2 ? (
                                    <motion.img
                                        key="diamond"
                                        src={recbtn}
                                        alt="button"
                                        style={{ width: "1.2vw", height: "1.2vw" }}
                                        initial={{ opacity: 1, rotate: 0 }}
                                        animate={{ rotate: 45, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            rotate: { duration: 0.5, ease: "easeInOut" },
                                            opacity: { duration: 0.3, ease: "easeInOut" },
                                        }}
                                    />
                                ) : isHovered ? (
                                    /* 1단계: 원 / 2단계: 사각형 */
                                    <motion.div
                                        key={divIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {divIndex === 0 && (
                                            <div style={{ width: "1vw", height: "1vw", backgroundColor: "black", borderRadius: "50%" }} />
                                        )}
                                        {divIndex === 1 && (
                                            <img src={recbtn} alt="button" style={{ width: "1.2vw", height: "1.2vw" }} />
                                        )}
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </Commentbox>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 호버 시 연결선 + 말풍선 */}
            {isHovered && (
                <>
                    <div
                        style={{
                            position: "absolute",
                            left: point.line.left,
                            top: point.line.top,
                            borderTop: "3px solid black",
                            width: lineWidth,
                            height: "50px",
                        }}
                    />
                    <img
                        src={point.imgSrc}
                        style={{
                            position: "absolute",
                            left: point.imgLeft,
                            top: point.imgTop,
                            width: point.imgWidth,
                        }}
                        alt="comment"
                    />
                </>
            )}
        </>
    );
};

export default CommentPoint

const Commentbox = styled.div`
    border: 3px solid black;
    position: absolute;
    z-index: 100;
    background-color: yellow;
    transition: opacity 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
`;