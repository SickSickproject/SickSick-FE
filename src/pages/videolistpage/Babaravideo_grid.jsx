import styled from "styled-components"
import { useMediaQuery } from "react-responsive";
import Babara from "../../datas/BabaraVideoimg";

const Babaravideo_grid = ({ setisoverlay, setoverlayinfo }) => {

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return <>
        {isMobile &&
            <Smallcontainer>
                <Smallnamebar><text>&nbsp;&nbsp;{">>>"} 바바라</text></Smallnamebar>
                <Smallvideocontainer>
                    {Babara.map((v, i) => {
                        return <Videoelement onClick={() => {
                            setoverlayinfo({ title: v.title, name: v.name, time: v.time, youtubeid: v.youtubeid, id: v.id }); setisoverlay(true); window.scrollTo({ top: 0 });
                        }}>
                            <img src={v.image} style={{ top: "5%", width: "100%", position: "absolute" }}></img>
                            <Videoelement_stitle2 style={{ color: "white" }}>
                                {v.stitle.split('').map((char, i) => (
                                    <div key={i} style={char === ' ' ? { fontSize: "10px", height: "5px", display: 'inline-block' } : {}}>{char === ' ' ? '\u00A0' : char}</div>
                                ))}
                                <VerticalLine /></Videoelement_stitle2>
                            <Videoelement_title style={{ fontSize: "20px" }}>{v.title}</Videoelement_title>
                            <div style={{ width: "90%", height: "1.5%", position: "absolute", top: "95%", fontSize: "15px",left:"0" }}>인터뷰이 | 바바라</div>
                        </Videoelement>
                    })}
                </Smallvideocontainer>
                <div style={{ width: "708px", height: "100px", backgroundColor: "black", position: "relative" }}>
                    <Teaminfo style={{ fontSize: "10px" }} >
                        섭식장애 고백 프로젝트 식식<br></br>
                        Eating Disorder Confession<br></br>
                        Project Siksik<br></br>
                        ©Siksik, Inc. All Rights Reserved.
                    </Teaminfo>
                    <Teaminfo2 style={{ fontSize: "10px" }}>
                        T. 010 8892 9473<br></br>
                        Mail. jhss8892@naver.com
                    </Teaminfo2>
                </div>
            </Smallcontainer>
        }

        {!isMobile &&
            <Container>
                <Namebar><text style={{position:"absolute", left:"1%"}}>&nbsp;&nbsp;{">>>"} 바바라</text></Namebar>
                <Videocontainer>
                    {Babara.map((v, i) => {
                        return <Videoelement onClick={() => {
                            setoverlayinfo({ title: v.title, name: v.name, time: v.time, youtubeid: v.youtubeid, id: v.id }); setisoverlay(true); window.scrollTo({ top: 0 });
                        }}>
                            <img src={v.image} style={{ top: "5%", width: "100%", position: "absolute" }}></img>
                            <Videoelement_stitle style={{ color: "white" }}>
                                {v.stitle.split('').map((char, i) => (
                                    <div key={i} style={char === ' ' ? { fontSize: "0.1vw", height: "0.5vh", display: 'inline-block' } : {}}>{char === ' ' ? '\u00A0' : char}</div>
                                ))}<VerticalLine /></Videoelement_stitle>
                            <Videoelement_title>{v.title}</Videoelement_title>
                            <div style={{ width: "90%", height: "1.5%", position: "absolute", top: "95%", fontSize: "1.1vw" ,left:"0"}}>인터뷰이 | 바바라</div>
                        </Videoelement>
                    })}
                </Videocontainer>
                <div style={{ width: "100%", aspectRatio: "1604/157", backgroundColor: "black", position: "relative" }}>
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

export default Babaravideo_grid

const Smallcontainer = styled.div`
width:708px;
height:auto;
position:relative;
background-color:white;
z-index:10;

`

const Smallnamebar = styled.div`
display: flex;
width: 708px;
height:50px;
border-top: 1px solid black;
border-bottom: 1px solid black;
align-items: center;
gap: 10px;
flex-shrink: 0;
background-color: #EFEFEF;
color: #000;
box-sizing: border-box;
leading-trim: both;
text-edge: cap;
font-family: Gothic A1;
font-size: 28px;
font-style: normal;
font-weight: 400;
line-height: 152%; /* 42.56px */
`

const Smallvideocontainer = styled.div`
margin-bottom:20px;
width:708px;
height:auto;
display:grid;
grid-template-columns: repeat(2, 1fr);
background-color:white;
`

const Container = styled.div`
width:100%;
aspect-ratio: 1604 / 1807;
position:relative;
background-color:white;
z-index:10;
`

const Namebar = styled.div`
display: flex;
width: 100%;
aspect-ratio: 1604 / 65;
border-top: 1px solid black;
border-bottom: 1px solid black;
align-items: center;
gap: 10px;
flex-shrink: 0;
background-color: #EFEFEF;
color: #000;
box-sizing: border-box;
leading-trim: both;
text-edge: cap;
font-family: Gothic A1;
font-size: 1.5vw;
font-style: normal;
font-weight: 400;
line-height: 152%; /* 42.56px */
`

const Videocontainer = styled.div`
width:98.753117207%;
margin-left:1.246882793%;
margin-top:1.246882793%;
display:grid;
aspect-ratio:1584/1565;
grid-template-columns: repeat(3, 1fr);
background-color:white;

`

const Teaminfo = styled.div`
width:20.1995%;
aspect-ratio:324/100;
padding:20px;
color:white;
font-family: Gothic A1;
font-size: 1vw;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 25.2px */
`
const Teaminfo2 = styled.div`
top:20px;
width:263.3277px;
height:50px;
left:23%;
color: #FFF;
font-family: Gothic A1;
font-size: 1vw;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 25.2px */
position:absolute;
`

const Videoelement = styled.div`
display: flex;
width: 94%;
aspect-ratio:508/499;
justify-content: center;
background-color:white;
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
 display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
width:90%;
height:auto;
position:absolute;
left:0;
top:75%;
color: #000;
leading-trim: both;
text-edge: cap;
font-family: Gothic A1;
font-size: 1.4vw;
font-style: normal;
font-weight: 400;
line-height: 135%; /* 29.7px */
letter-spacing: -1.1px;
`

const Videoelement_stitle = styled.div`
color: #574215;
width: 1.5vw;
text-align: center;
leading-trim: both;
text-edge: cap;
font-family: Gothic A1;
font-size: 1.4vw;
font-style: normal;
font-weight: 700;
line-height: 108%; /* 29.001px */
position:absolute;
padding-top:1%;
right:5%;
top:8%;
aspect-ratio:21.82/188;
overflow:hidden;
display: flex;
  flex-direction: column;
  align-items: center;     // 가로 가운데 정렬
`

const VerticalLine = styled.div`
width: 2px;
height: 100%;
background-color: white;
opacity:0.8;
margin-top:50%;
`;

const Videoelement_stitle2 = styled.div`
color: #574215;
width: 30px;
height:180px;
text-align: center;
leading-trim: both;
text-edge: cap;
font-family: Gothic A1;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 108%; /* 29.001px */
position:absolute;
padding-top:1%;
right:5%;
top:8%;
overflow:hidden;
display: flex;
  flex-direction: column;
  align-items: center;     // 가로 가운데 정렬
`