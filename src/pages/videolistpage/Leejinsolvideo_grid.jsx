import styled from "styled-components"
import { useMediaQuery } from "react-responsive";
import Leejinsol from "../../datas/LeejinsolVideoimg";

const Leejinsolvideo_grid = ({setisoverlay,setoverlayinfo}) => {

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    return <>

        {!isMobile &&
            <Container>
                <Namebar>&nbsp;&nbsp;{">>"} 이진솔</Namebar>
                <Videocontainer>
                {Leejinsol.map((v, i) => {
                        return <Videoelement onClick={() => {
                            setoverlayinfo({title:v.title,name:v.name,time:v.time,youtubeid:v.youtubeid,id:v.id}); setisoverlay(true); window.scrollTo({ top: 0 }); 
                        }}>
                             <img src={v.image} style={{ top: "5%",width:"100%", position: "absolute" }}></img>
                             <Videoelement_title>{v.title}</Videoelement_title>
                             <div style={{ width: "90%", height: "1.5%", position: "absolute", top: "95%",fontSize:"0.9vw"}}>인터뷰이 | 이진솔</div>
                        </Videoelement>
                    })}
                </Videocontainer>
                <div style={{ width: "100%", aspectRatio:"1604/157", backgroundColor: "black",position:"relative" }}>
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

export default Leejinsolvideo_grid

const Container = styled.div`
width:100%;
aspect-ratio: 1604 / 2326;
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
font-size: 2vw;
font-style: normal;
font-weight: 400;
line-height: 152%; /* 42.56px */
letter-spacing: -2.24px;
`

const Videocontainer = styled.div`
width:98.753117207%;
margin-left:1.246882793%;
margin-top:1.246882793%;
display:grid;
aspect-ratio:1584/2084;
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
width: 21.818px;
text-align: center;
leading-trim: both;
text-edge: cap;
font-family: Gothic A1;
font-size: 26.853px;
font-style: normal;
font-weight: 700;
line-height: 108%; /* 29.001px */
letter-spacing: -3.491px;
position:absolute;
left:455.28px;
top:30px;
`