import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import NavContext from "./Navcontext";
import { useContext } from "react";

const Firstpage = () => {
  const { setbtnclick } = useContext(NavContext);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 769px) and (max-width: 1024px)" });
  const [activeSection, setActiveSection] = useState("식식에대하여");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // 윈도우 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const youtubeOpts = {
    height: windowWidth <= 768 ? '200' : '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  
  const scrollToSection = (sectionId) => {
    let targetRef;
    
    switch(sectionId) {
      case "식식에대하여":
        targetRef = section1Ref;
        break;
      case "고백으로연결되다":
        targetRef = section2Ref;
        break;
      case "섭식장애란":
        targetRef = section3Ref;
        break;
      default:
        targetRef = section1Ref;
    }
    
    if (targetRef && targetRef.current) {
      const headerOffset = 95;
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (!section1Ref.current || !section2Ref.current || !section3Ref.current) return;
      
      const scrollPosition = window.scrollY;
      const headerOffset = 95;
      
      const section1Top = section1Ref.current.offsetTop - headerOffset;
      const section2Top = section2Ref.current.offsetTop - headerOffset;
      const section3Top = section3Ref.current.offsetTop - headerOffset;
      
      if (scrollPosition >= section3Top) {
        setActiveSection("섭식장애란");
      } else if (scrollPosition >= section2Top) {
        setActiveSection("고백으로연결되다");
      } else {
        setActiveSection("식식에대하여");
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // 초기 실행
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, {replace: true});
  };

  return (
    <Container>
      <Sidebar isVisible={!isMobile}>
        <SidebarBtn 
          active={activeSection === "식식에대하여"}
          onClick={() => scrollToSection("식식에대하여")}
          style={{ borderTop: "none" }}
        >
          식식에 대하여
        </SidebarBtn>
        
        <SidebarBtn 
          active={activeSection === "고백으로연결되다"}
          onClick={() => scrollToSection("고백으로연결되다")}
        >
          고백으로 연결되다
        </SidebarBtn>
        
        <SidebarBtn 
          active={activeSection === "섭식장애란"}
          onClick={() => scrollToSection("섭식장애란")}
        >
          섭식장애란
        </SidebarBtn>
      </Sidebar>

      <MainContent isMobile={isMobile}>
        <ContentWrapper>
          {/* 모바일 탭 메뉴 */}
          {isMobile && (
            <MobileTabMenu>
              <MobileTab 
                active={activeSection === "식식에대하여"}
                onClick={() => scrollToSection("식식에대하여")}
              >
                식식에 대하여
              </MobileTab>
              <MobileTab 
                active={activeSection === "고백으로연결되다"}
                onClick={() => scrollToSection("고백으로연결되다")}
              >
                고백으로 연결되다
              </MobileTab>
              <MobileTab 
                active={activeSection === "섭식장애란"}
                onClick={() => scrollToSection("섭식장애란")}
              >
                섭식장애란
              </MobileTab>
            </MobileTabMenu>
          )}

          {/* 첫 번째 섹션 */}
          <Section id="section1" ref={section1Ref} isMobile={isMobile}>
            <LeftSide isMobile={isMobile}>
              <LeftTitle>식식(食食)에<br/>대하여</LeftTitle>
            </LeftSide>
            <RightSide isMobile={isMobile}>
              <ContentTitle>식식은 먹는 아픔을 겪는 모든 식구들을 지지합니다.</ContentTitle>
              <Paragraph>
                우리는 모두 매일 끼니를 챙깁니다. 식구라는 말은 음식이 우리에게 무엇이나 소중하고
                일상적임을 느낄 수 있는 친숙한 단어입니다. 그러나, 만약 우리가 더이상 즐겁게 식사를 할 수 없다면
                우리 삶은 어떡해 변화할까요?
              </Paragraph>
              
              <Paragraph>
                섭식 장애는 음식 섭취에 어려움을 겪는 정신적, 사회적 질환을 말합니다. 대한민국에는 약 10만명의 사람들이
                섭식장애로 어려움을 겪고 있다고 합니다. 하지만 공식적으로 집계되는 자료나 시스템이 없어, 잠재적으로는
                얼마나 더 많은 사람들이 고통받고 있을지 모릅니다.
              </Paragraph>
              
              <Paragraph>
                프로아나, 뼈말라 등의 단어가 더욱 익숙한 사람도 있을 겁니다. '섭식장애=다이어트 부작용'이라고 여기는
                사람들도 있겠지요. 하지만, 겨우 자극적인 몇 개의 단어로 정의내리기에 그 속에는 너무나 다양한 이야기가
                존재합니다.
              </Paragraph>
              
              <Paragraph>
                <u>"살려면 그 방법밖에 없었던 거잖아요"</u>
              </Paragraph>
              
              <Paragraph>
                때로는 살기 위해 삶에 반하는 행동을 할 때가 있습니다. 그 이유가 무엇인지는 감히 몇 가지 고정된 틀로는
                짐작할 수 없겠습니다. 고통을 동반하는 행위를 하기까지는 각양각색의 사연이, 감히 재단할 수 없는 다양한
                서사가 있을 것입니다.
              </Paragraph>
            </RightSide>
          </Section>

          {/* 두 번째 섹션 */}
          <Section id="section2" ref={section2Ref} isMobile={isMobile}>
            <LeftSide isMobile={isMobile}>
              <LeftTitle>고백으로<br/>연결되다</LeftTitle>
            </LeftSide>
            <RightSide isMobile={isMobile}>
              <ContentTitle>식식은 씩씩한 고백을 하는 식구들의 목소리에 귀를 기울입니다.</ContentTitle>
              <Paragraph>
                숨기고픈 이야기를 꺼내어 발화함으로서 이어지는 개인적 서사의 연결,<br/>식식은 식구들의 목소리가 실처럼 엮여 단단한 울타리가 되기를 꿈꿉니다.
              </Paragraph>
              
              <Paragraph>
                누군가의 목소리가 발화가 되어 나의 이야기를 뱉어내고, 경험이 연결되어 쉬이 끊어지지 않는 연대가 되기를, <br/> 섭식장애 당사자의 이야기가 납작한 몇 가지의 단어로 정의내려지지 않는 사회를 만들고자<br/>합니다.
                환자가 아닌 경험자로서, 미디어 속 납작한 이야기가 아닌 '우리의 이야기'를 꺼내어 봅시다.
              </Paragraph>
              
              <YoutubeWrapper>
                <YouTube 
                  videoId="wz4R0QzVFwk"
                  opts={youtubeOpts} 
                />
              </YoutubeWrapper>
            </RightSide>
          </Section>
          
          {/* 세 번째 섹션 */}
          <Section id="section3" ref={section3Ref} isMobile={isMobile}>
            <LeftSide isMobile={isMobile}>
              <LeftTitle>섭식장애란</LeftTitle>
            </LeftSide>
            <RightSide isMobile={isMobile}>
              <ContentTitle>섭식장애는 먹는 행동과 관련해 어려움을 겪으며 개인의 신체적 건강과
              심리.사회적 기능을 손상시키는 정신장애를 의미합니다.</ContentTitle>
              <Paragraph>
                섭식 장애는 신경성 식욕부진증(거식증), 신경석 폭식증, 폭식장애 및 회피제한적 섭취장애 등을 포함하고
                있습니다. 국민건강보험공단에 따르면 최근 5년간(2018~2022) 식이장애(섭식장애)로 진료받은 환자는
                5만 1253명에 이릅니다. 이중 여성이 차지하는 비율은 10명 중 8명이라고 하는데, 이는 2018년과 비교해
                2022년 거의 50% 증가한 셈입니다. 하지만 섭식장애의 규모나 피해 정도를 정확하게 파악하고 있는 정부 단위
                조사나 통계는 아직 없습니다.
              </Paragraph>
              
              <Paragraph>
                환자 스스로 치료를 원치 않거나 필요하지 않다고 느끼는 것이 이 병의 특징 중 하나입니다. 사회적으로 여전히
                섭식장애가 다이어트에 따른 부작용이나 '젊은 여성들'의 의지 부족에서 비롯된 질병으로 이해되는 상황에서
                자신의 문제를 드러내기는 쉽지 않습니다. 그래서 섭식 장애를 앓고 있는 환자의 수는 더 많을 수 있다고 합니다.
              </Paragraph>
            </RightSide>
          </Section>
          
          {/* 네 번째 섹션 (추가됨) */}
          <Section id="section4" ref={section4Ref} isMobile={isMobile}>
            <LeftSide isMobile={isMobile}>
              {/* 네 번째 섹션 왼쪽은 비워둡니다 */}
            </LeftSide>
            <RightSide isMobile={isMobile}>
              <Paragraph>
              ❶ <u>누구나 겪을 수 있습니다</u><br/>
              먹는 것과 자신의 몸이 불화해 온 경험을 공유하기 위해 모인 이들은 하나의 원인에서 섭식장애가 시작되는
              것은 아니라고 말합니다. 다이어트와 섭식장애는 분명 다를 테지만, 다이어트로 가려진 섭식장애도 많다는
              사실을 상기하면 섭식과 체중의 문제는 단순할 수 없습니다. 섭식장애를 둘러싼 이야기는 개인의 문제를 넘어
              언제나 사회 구조를 함께 들여다봐야 하는 이유가 여기에 있습니다.
              </Paragraph>

              <Paragraph>
              ❷ <u>사회의 낙착한 이해</u><br/>
              <strong>"다른 사람들처럼 우리(섭식장애 당사자)는 엄마도 됐다가 딸도 됐다가 또 환자도 됩니다.<br/>
              직업이 있을 수도 있고, 없을 수도 있죠. 다양한 역할과 정체성 속에서 자기의 삶을 살고 있어요."</strong><br/>
              이진슬씨는 미디어의 틀에 박힌 이미지가 다양한 삶을 살아가는 이들을 포용하기에 너무나도 납작하다고
              이야기합니다. 미디어는 우리의 이야기를 포용할 준비가 되어있을까요? 몇가지 틀에 맞춘, 예컨대 마른 몸과
              같은 것들이 정작 당사자들이 스스로의 상태를 인지하는데에 어려움을 주고 있지 않는냐는 겁니다.
              </Paragraph>

              <Paragraph>
              ❸ <u>당사자의 목소리</u><br/>
              섭식장애에 관한 개인의 서사는 모두 다릅니다. 각자의 회복 여정 또한 다른 것은 마찬가지 입니다. 그래서 우리는
              개인의 경험을 이야기하기 위해 발걸음을 뗐습니다. 각자의 삶이 더이상 고리타분하고 단순한 서사로 남지 않도록,
              다양한 이야기가 펴져 나가도록 말이지요.
              </Paragraph>

              <Paragraph>
              ❹ <u>회복의 여정</u><br/>
              섭식장애는 적절한 치료를 받으면 크게 개선되거나 '회복'될 수 있다고 합니다. 이를 위해서는 섭식장애를 조기에
              발견하고 치료하는 것이 매우 중요합니다. 특히 사람마다 섭식장애의 원인이 다르기 때문에 관련 전문가와의
              긴밀한 소통이 필요합니다. 우리나라에서도 섭식장애 관련 정보 제공, 지지집단 조직, 전문가 상담 등의 인프라가
              조금씩 구축되고 있으나 아직 충분하지 않습니다. 섭식장애에 대한 사회의 관심과 적극적인 대응이 필요한 시점입니다.
              </Paragraph>
            </RightSide>
          </Section>
        </ContentWrapper>
        
        <BottomLinks>
          <BottomLink onClick={() => {setbtnclick([0,1,0]); window.scrollTo({ top: 0}); handleNavigation("/main/two")}}>
            <LinkText>식식한 고백들</LinkText>
            <LinkArrow>→</LinkArrow>
          </BottomLink>
          <BottomLink onClick={() => {setbtnclick([0,0,1]); window.scrollTo({ top: 0}); handleNavigation('/main/three');}}>
            <LinkText>식식한 연결하기</LinkText>
            <LinkArrow>→</LinkArrow>
          </BottomLink>
          <BottomLink onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" })}}>
            <LinkText>식식에 대하여</LinkText>
            <LinkArrow>→</LinkArrow>
          </BottomLink>
        </BottomLinks>
        
        <Footer>
          <FooterText>섭식장애 고백 프로젝트 식식</FooterText>
          <FooterText>Eating Disorder Confession</FooterText>
          <FooterText>Project Siksik</FooterText>
          <FooterText>T.010 8892 9473</FooterText>
          <FooterText>Mail:jhss8892@naver.com</FooterText>
          <FooterText>©Siksik, Inc. All Rights Reserved.</FooterText>
        </Footer>
      </MainContent>
    </Container>
  );
};

export default Firstpage;

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
  display: flex;
  font-family: "Gothic A1", sans-serif;
  margin-top: 95px;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 95px;
  left: 0px;
  width: 316px;
  height: calc(100vh - 95px);
  display: ${props => props.isVisible ? 'flex' : 'none'};
  flex-direction: column;
  z-index: 998;
  background-color: white;
  border-right: 1px solid black;
`;

const SidebarBtn = styled.div`
  width: 296px;
  background-color: ${props => props.active ? "#FFFF00" : "white"};
  position: relative;
  height: 52px;
  display: flex;
  align-items: center;
  font-size: 28px;
  font-style: normal;
  border-top: 1px solid black;
  padding-left: 19px;
  font-weight: ${props => props.active ? "600" : "400"};
  font-family: "Gothic A1", sans-serif;
  
  &:hover {
    background-color: #FFFF00;
    cursor: pointer;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 80%;
    background-color: black;
  }
`;

const MobileTabMenu = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #000;
  margin-bottom: 20px;
`;

const MobileTab = styled.div`
  flex: 1;
  padding: 15px 10px;
  text-align: center;
  font-size: 16px;
  font-weight: ${props => props.active ? "600" : "400"};
  background-color: ${props => props.active ? "#FFFF00" : "white"};
  
  &:not(:last-child) {
    border-right: 1px solid #000;
  }
  
  &:hover {
    background-color: #FFFF00;
    cursor: pointer;
  }
`;

const MainContent = styled.div`
  margin-left: ${props => props.isMobile ? '0' : '316px'};
  width: ${props => props.isMobile ? '100%' : 'calc(100% - 316px)'};
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const Section = styled.section`
  display: flex;
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
  border-bottom: 1px solid #eee;
  scroll-margin-top: 95px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const LeftSide = styled.div`
  width: ${props => props.isMobile ? '100%' : '280px'};
  border-right: ${props => props.isMobile ? 'none' : '1px solid #000'};
  border-bottom: ${props => props.isMobile ? '1px solid #000' : 'none'};
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.isMobile ? '20px 0' : '0'};
`;

const LeftTitle = styled.div`
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 1000;
  padding: 20px 10px;
  line-height: 1.4;
  text-align: left;
`;

const RightSide = styled.div`
  flex: 1;
  padding: 30px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const ContentTitle = styled.h2`
  font-size: clamp(18px, 3vw, 27px);
  font-weight: 1000;
  margin: 0 0 20px 0;
  line-height: 1.8;
  
  @media (max-width: 768px) {
    line-height: 1.5;
    margin-bottom: 15px;
  }
`;

const Paragraph = styled.p`
  font-size: clamp(14px, 2vw, 18px);
  line-height: 1.6;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    br {
      display: none;
    }
  }
`;

const YoutubeWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  max-width: 800px;
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  
  @media (max-width: 768px) {
    margin: 15px 0;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid #000;
`;

const BottomLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #000;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  @media (max-width: 768px) {
    padding: 12px 15px;
  }
`;

const LinkText = styled.div`
  font-size: clamp(14px, 2vw, 18px);
  font-weight: 600;
`;

const LinkArrow = styled.div`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: bold;
  transition: transform 0.3s ease;
  
  ${BottomLink}:hover & {
    transform: scaleX(1.5);
    transform-origin: left;
  }
`;

const Footer = styled.div`
  background-color: #000;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const FooterText = styled.p`
  margin: 0;
  margin-bottom: 4px;
  font-size: clamp(10px, 1.5vw, 11px);
  color: #fff;
  line-height: 1.2;
`;