import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import babarahoverimg from "../../assets/Hoverimg/babarahoverimg.png";

const Babarapage = ({ setpagestate, setbtnclick }) => {
    console.log(setbtnclick)
    const [isClicked, setIsClicked] = useState(false);

    const [move, setmove] = useState(0)
    const [move2, setmove2] = useState(0)

    const [mouseenter1, setmouseenter1] = useState(false)
    const [mouseenter2, setmouseenter2] = useState(false)
    const [mouseenter3, setmouseenter3] = useState(false)

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
                        <div style={{ display: "flex", width: "1350px", height: "202px", padding: "0px, 131px", justifyContent: "center", alignItems: "center", flexShrink: "0", position: "absolute", left: "117px", top: "105px" }}>
                            <Titlebar move2={move2}>
                                “그 사회가 나를 키워서<br></br>
                                아프게 만들었다는 걸<br></br>
                                우리가 인정하기는 어려워요.”
                            </Titlebar>
                        </div>
                        <Discriptbar>
                            바바라는 2011년도에 가수로 데뷔를 했고 현재는 보컬 트레이너로 활동을 하고 있습니다. 과거 연예계를 경험
                            하며 겪은 섭식장애 그리고 보컬트레이너로서 보는 섭식장애를 겪는 학생들. 이에 대해 그는 미디어가 시대에
                            미치는 영향에 대해 힘있는 목소리로 이야기합니다. 바바라 라는 이름이 가수 혹은 보컬트레이너 라는 키워드에 멈추지 않고 누군가에게 용기가 될 수 있는 활동가로 불릴 수 있을 때까지, 그의 목소리는 계속해서 울려 퍼지고 있습니다.
                        </Discriptbar>

                        {/* 클릭하면 강조되는 이미지 */}

                        {/* 배경 클릭하면 원래 상태로 복귀 */}
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
                                    style={{ left: "980px", top: "540px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter2(true)}
                                    onMouseLeave={() => setmouseenter2(false)}
                                >{mouseenter2 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }}></div>}</Commentbox>
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
                                    style={{ left: "1120px", top: "730px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter3(true)}
                                    onMouseLeave={() => setmouseenter3(false)}
                                >{mouseenter3 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }}></div>}</Commentbox>
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
                                    style={{ left: "1390px", top: "430px" }}
                                    isClicked={isClicked}
                                    onMouseEnter={() => setmouseenter1(true)}
                                    onMouseLeave={() => setmouseenter1(false)}
                                >{mouseenter1 && <div style={{ width: "20px", height: "20px", backgroundColor: "black", borderRadius: "50%" }}></div>}</Commentbox>
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
        </>
    );
}

export default Babarapage

// 메인 컨테이너 (클릭 시 흐림 효과 적용)
const Container = styled.div`
    width: 1605px;
    height: 1023px;
    background-color: black;
    position: relative;
   margin-left:316px;
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
margin-left:316px;
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
leading-trim: both;

text-edge: cap;
text-shadow: 0px 8px 22.1px rgba(0, 0, 0, 0.20);
-webkit-text-stroke-width: 1px;
-webkit-text-stroke-color: #000;
font-family: OnulGoraesil;
font-size: 80px;
font-style: normal;
font-weight: 800;
line-height: 127%; /* 101.6px */
    width: 1088px;
    height: 260px;
    color: yellow;
    z-index: 10;
    transform: ${({ move2 }) => `translateY(${move2}px)`};
    transition: transform 0.3s ease-in-out ;
`;


// 설명 부분
const Discriptbar = styled.div`
    width: 1547px;
    height: 226px;
    position: absolute;
    left: 22px;
    color: white;
    top: 846px;
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
    left: 780px;
    transform-origin: top left;
    transform: ${({ move }) => `translateY(${move}px)`};
    opacity: ${({ isClicked }) => (isClicked ? 0.8 : 0.5)};
    top: 330px;
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
left: 1457px;
position:absolute;
top:430px;
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
left: 1047px;
position:absolute;
top:540px;
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
left: 1187px;
position:absolute;
top:730px;
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