import styled from "styled-components";
import sicksickimg from "../assets/sicksickimg.png"
import sicksickloading from "../assets/sicksickloading.png"
import sicksickloading2 from "../assets/sicksickloading2.png"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const SplashScreen = () => {

    const [timeset,settimeset] = useState(true)


    const img1 = sicksickimg
    const img2 = sicksickloading
    const img3 = sicksickloading2

    setTimeout(()=>{settimeset(false)},2500)

    return <>
        <AnimatePresence>
            {timeset && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease:"linear" }}
                className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
                <Container>
                    <div style={{ width: "1837.8px", height: "414.216px", left: "41px", top: "182px", position: "absolute" }}>
                        <img src={img1} alt="" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div style={{ width: "314px", height: "86px", left: "677px", top: "712.43px", position: "absolute" }}>밥짓는중...</div>

                    <motion.img
                        style={{ width: "50px", height: "50px", left: "991px", top: "725px", position: "absolute" }}
                        src={img2}
                        alt="Rotating Stick"
                        className="w-20 h-2"
                        animate={{ rotate: [0, -90, 0, -90, 0] }} // 오른쪽 -> 왼쪽 반복
                        transition={{
                            duration: 4, // 한 사이클(0 → 90 → 0 → -90 → 0) 총 4초
                            repeat: Infinity, // 무한 반복
                            ease: [0.7, 0, 0.2, 1]
                        }}
                    />
                    <motion.img
                        style={{ width: "46px", height: "46px", left: "1041px", top: "728px", position: "absolute" }}
                        src={img3}
                        alt="Rotating Stick"
                        className="w-20 h-2"
                        animate={{ rotate: [0, 90, 0, 90, 0] }} // 오른쪽 -> 왼쪽 반복
                        transition={{
                            duration: 4, // 한 사이클(0 → 90 → 0 → -90 → 0) 총 4초
                            repeat: Infinity, // 무한 반복
                            ease: [0.7, 0, 0.2, 1]
                        }}
                    />
                    <motion.img
                        style={{ width: "50px", height: "50px", left: "1091px", top: "725px", position: "absolute" }}
                        src={img2}
                        alt="Rotating Stick"
                        className="w-20 h-2"
                        animate={{ rotate: [0, -90, 0, -90, 0] }} // 오른쪽 -> 왼쪽 반복
                        transition={{
                            duration: 4, // 한 사이클(0 → 90 → 0 → -90 → 0) 총 4초
                            repeat: Infinity, // 무한 반복
                            ease: [0.7, 0, 0.2, 1]
                        }}
                    />
                    <motion.img
                        style={{ width: "46px", height: "46px", left: "1141px", top: "728px", position: "absolute" }}
                        src={img3}
                        alt="Rotating Stick"
                        className="w-20 h-2"
                        animate={{ rotate: [0, 90, 0, 90, 0] }} // 오른쪽 -> 왼쪽 반복
                        transition={{
                            duration: 4, // 한 사이클(0 → 90 → 0 → -90 → 0) 총 4초
                            repeat: Infinity, // 무한 반복
                            ease: [0.7, 0, 0.2, 1]
                        }}
                    />
                    <motion.img
                        style={{ width: "50px", height: "50px", left: "1191px", top: "725px", position: "absolute" }}
                        src={img2}
                        alt="Rotating Stick"
                        className="w-20 h-2"
                        animate={{ rotate: [0, -90, 0, -90, 0] }} // 오른쪽 -> 왼쪽 반복
                        transition={{
                            duration: 4, // 한 사이클(0 → 90 → 0 → -90 → 0) 총 4초
                            repeat: Infinity, // 무한 반복
                            ease: [0.7, 0, 0.2, 1]
                        }}
                    />

                </Container>

            </motion.div>}
        </AnimatePresence>

    </>
}

export default SplashScreen

const Container = styled.div`
width:1920px;
height:1200px;
background-color:yellow;
position:relative;
font-size: 57.886px;
font-style: normal;
font-weight: 800;
`
