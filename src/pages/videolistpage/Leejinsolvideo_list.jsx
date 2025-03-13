import styled from "styled-components"
import Leejinsol from "../../datas/LeejinsolVideoimg"

const Leejinsolvideo_list = ()=>{
    return <Container>
        <Namebar>&nbsp;&nbsp;{">>"} 이진솔</Namebar>
        <Listcontainer>{
            Leejinsol.map((v,i)=>{return <Listelement>
                <Listelement_title>{v.title}</Listelement_title>
            </Listelement>})
            }</Listcontainer>
        <Infobar>
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
        </Infobar>
    </Container>
}

export default Leejinsolvideo_list

const Container = styled.div`
width:1604px;
height:1023px;
position:relative;
background-color:white;
z-index:10;
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
box-sizing: border-box;
leading-trim: both;
text-edge: cap;
font-family: Gothic A1;
font-size: 28px;
font-style: normal;
font-weight: 400;
line-height: 152%; /* 42.56px */
letter-spacing: -2.24px;
`
const Listcontainer = styled.div`
width:1604px;
height:818px;
`

const Listelement = styled.div`
display:flex;
align-items:center;
width:1604px;
height:63px;
box-sizing: border-box;
border-bottom: 1.5px solid black;
background-color:white;
flex-shrink: 0;
position:relative;
&:hover {
background-color:yellow;
cursor:pointer;
}
`
const Listelement_title = styled.div`
color: #000;
leading-trim: both;
text-edge: cap;
font-family: Gothic A1;
font-size: 26px;
font-style: normal;
font-weight: 500;
line-height: 142%; /* 36.92px */
position:absolute;
left:20px;
`
const Infobar = styled.div`
width:1604px;
height:140px;
background-color:black;
position:relative;
`

const Teaminfo = styled.div`
width:324px;
height:100px;
padding:20px;
color:white;
font-family: Gothic A1;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 140%;
position:absolute;
left:20px;
`

const Teaminfo2 = styled.div`
top:20px;
width:263.3277px;
height:50px;
left:337.42px;
color: #FFF;
font-family: Gothic A1;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 25.2px */
position:absolute;
`