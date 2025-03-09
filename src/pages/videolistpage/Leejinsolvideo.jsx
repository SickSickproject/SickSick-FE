import styled from "styled-components"
import { useMediaQuery } from "react-responsive";
import Leejinsol from "../../datas/LeejinsolVideoimg";

const Leejinsolvideo = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return <>

        {!isMobile &&
            <Container>
                <Namebar>&nbsp;&nbsp;{">>"} 이진솔</Namebar>
                <Videocontainer>

                    {Leejinsol.map((v, i) => {
                        return <Videoelement onClick={() => { console.log(11) }}>
                            <img src={v.image} style={{ top: "21px", position: "absolute" }}></img>
                            <Videoelement_stitle>{v.stitle}</Videoelement_stitle>
                            <Videoelement_title>{v.title}</Videoelement_title>
                            <div style={{ width: "472px", height: "30px", position: "absolute", top: "450px", borderBottom: "2px solid black" }}>인터뷰이 | 이진솔</div>
                        </Videoelement>
                    })}
                </Videocontainer>
                <div style={{ width: "1604px", height: "157px", backgroundColor: "black",position:"absolute" }}>
                    <Teaminfo>
                        섭식장애 고백 프로젝트 식식<br></br>
                        Eating Disorder Confession<br></br>
                        Project Siksik<br></br>
                        ©Siksik, Inc. All Rights Reserved.
                    </Teaminfo>
                    <Teaminfo2>
                    T. 010 8892 9473<br></br>
                    Mail. jhss8892@naver.com
                    </Teaminfo2>
                </div>
            </Container>
        }

    </>;
}

export default Leejinsolvideo

const Container = styled.div`
width:1604px;
height:2326px;
font-family: Gothic A1;
`

const Namebar = styled.div`
display: flex;
width: 1604px;
height: 65px;
border-top: 1px solid black;
border-bottom: 1px solid black;
align-items: center;
gap: 10px;
flex-shrink: 0;
background-color: #EFEFEF;
color: #000;
leading-trim: both;
text-edge: cap;
font-family: OnulDamso;
font-size: 28px;
font-style: normal;
font-weight: 400;
line-height: 152%; /* 42.56px */
letter-spacing: -2.24px;
`

const Videocontainer = styled.div`
width:1584px;
margin-left:20px;
margin-top:20px;
display:grid;
height:2084px;
grid-template-columns: repeat(3, 1fr);

`

const Teaminfo = styled.div`
width:324px;
height:100px;
padding:20px;
color:white;
font-family: "Gothic A1";
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 25.2px */
`
const Teaminfo2 = styled.div`
top:20px;
width:263.3277px;
height:50px;
left:337.42px;
color: #FFF;
font-family: "Gothic A1";
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 25.2px */
position:absolute;
`

const Videoelement = styled.div`
display: flex;
width: 508px;
height: 499px;
justify-content: center;
align-items: center;
flex-shrink: 0;
position:relative;
&:hover {
opacity:0.6;
cursor:pointer;
transition: opacity 0.5s ease;
}
`
const Videoelement_title = styled.div`
width:472px;
height:auto;
position:absolute;
top:373px;
color: #000;
leading-trim: both;
text-edge: cap;
font-family: OnulDamso;
font-size: 22px;
font-style: normal;
font-weight: 400;
line-height: 135%; /* 29.7px */
letter-spacing: -1.1px;
`

const Videoelement_stitle = styled.div`
color: #574215;
width: 21.818px;
text-align: center;
leading-trim: both;
text-edge: cap;
font-family: OnulDamso;
font-size: 26.853px;
font-style: normal;
font-weight: 700;
line-height: 108%; /* 29.001px */
letter-spacing: -3.491px;
position:absolute;
left:455.28px;
top:30px;
`