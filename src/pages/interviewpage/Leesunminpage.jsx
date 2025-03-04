import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";

import leesunminhoverimg from "../../assets/Hoverimg/leesunminhoverimg.png";
import leejinsolhoverimg from "../../assets/Hoverimg/leejinsolhoverimg.png";
import babarahoverimg from "../../assets/Hoverimg/babarahoverimg.png";

const Leesunminpage = () => {
    const [isClicked, setIsClicked] = useState(false);

    const img1 = leesunminhoverimg;
    const img2 = leejinsolhoverimg;
    const img3 = babarahoverimg;

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                    <Container clicked={isClicked}>
                        <Namebar>이선민</Namebar>
                        <Titlebar>
                            "그럴 수 밖에 없었음을 받아들이고, 앞으로 무엇을 할 것인가에 대해 생각하면 돼요."
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
                        {isClicked && <Overlay onClick={() => setIsClicked(false)} />}
                    </Container>
                    <motion.div
                        className="absolute w-full h-full bg-green-500 text-white flex items-center justify-center rounded-lg shadow-lg"
                        initial={{ scale: 1, opacity: 1, zIndex: 1 }}
                        animate={
                            isClicked
                                ? { scale: 1.3, opacity: 1, zIndex: 20 }
                                : { scale: 1, opacity: 0.7, zIndex: 1 }
                        }
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <Personimg
                            src={img1}
                            isClicked={isClicked}
                            onClick={() => setIsClicked(!isClicked)}
                        />
                    </motion.div>
                    <Navigatebar>고백들으러가기</Navigatebar>
                </motion.div>
            </AnimatePresence>
        </>
    );
};


export default Leesunminpage;

// 메인 컨테이너 (클릭 시 흐림 효과 적용)
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
    width: 1605px;
    height: 82px;
    background-color: yellow;
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
    font-family: OnulGoraesil;
    font-size: 80px;
    font-style: normal;
    font-weight: 800;
    line-height: 128%;
    position: absolute;
    top: 81px;
    left: 132px;
    width: 1320px;
    height: 306px;
    color: yellow;
    z-index: 10;
    div
`;

// 설명 부분
const Discriptbar = styled.div`
    width: 1547px;
    height: 226px;
    position: absolute;
    left: 22px;
    color: white;
    top: 776px;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%;
    z-index: 10;
`;

// 이미지 스타일 (클릭했을 때 강조)
const Personimg = styled.img`
    width:565px;
    height:764px;
    left: 780px;
    top: 260px;
    position: absolute;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    cursor: pointer;
    transform-origin: top left;
    &:hover {
        transform: ${({ isClicked }) => (isClicked ? "scale(1)" : "scale(1.2)")};
        opacity: 0.8;
    }
`;

const Personimg2 = styled.img`
position: absolute;
left: 800px;
top: 180px;
z-index:100;

`
