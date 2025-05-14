import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// 이미지 가져오기 (경로는 실제 위치에 맞게 수정해주세요)
import plate1 from "../assets/Achiveimg/plate1.png";
import plate2 from "../assets/Achiveimg/plate2.png";
import plate3 from "../assets/Achiveimg/plate3.png";
import downArrow from "../assets/Achiveimg/downArrow.png"; 

// 애니메이션 정의
const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 10px)); /* 경계를 자연스럽게 하기 위해 약간 더 이동 */
  }
`;

const Thirdpage = () => {
  // 화살표 ref와 폼 ref 생성
  const arrowRef = useRef(null);
  const formSectionRef = useRef(null);
  
  // 텍스트 영역 상태 관리
  const [textValue, setTextValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const defaultText = "식식은 섭식장애에 그저 '이런 법이 있습니다'라고 고하지 않습니다. '함께' 할 수 있도록 공간을 마련하는 것, 그것이 바로 식식의 중점입니다. 섭식장애 문제에 함께 목소리를 내는 것이 어려운 일이 되지 않도록 '고백접시 돌리기'는 그런 생각에서 부터 시작하게 되었습니다. 세 명의 식구들로부터 온 접시를 전달 받은 순간부터, 당신도 우리의 식구!";
  
  // 등록된 메시지 관리
  const [registeredMessages, setRegisteredMessages] = useState([]);
  const [writerName, setWriterName] = useState("작성자명");
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const itemsPerPage = windowWidth <= 768 ? 3 : windowWidth <= 1024 ? 6 : 9; // 화면 크기에 따라 페이지당 아이템 수 조정
  
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
  
  // 텍스트 입력 처리
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    // 180자 제한 적용 (공백 제외)
    const textWithoutSpaces = inputText.replace(/\s/g, "");
    if (textWithoutSpaces.length <= 180) {
      setTextValue(inputText);
    }
  };
  
  // 작성자명 입력 처리
  const handleWriterNameChange = (e) => {
    setWriterName(e.target.value);
  };
  
  // 텍스트 영역 포커스 처리
  const handleFocus = () => {
    setIsFocused(true);
    if (!textValue) {
      setTextValue("");
    }
  };
  
  // 텍스트 영역 포커스 아웃 처리
  const handleBlur = () => {
    setIsFocused(false);
    if (!textValue.trim()) {
      setTextValue("");
    }
  };
  
  // 메시지 등록 처리
  const handleRegisterMessage = () => {
    if (textValue.trim()) {
      // 사용자 입력 텍스트가 있을 때만 메시지 등록
      const newMessage = {
        id: Date.now(), // 고유 ID
        text: textValue,
        writer: writerName !== "작성자명" ? writerName : "익명",
        plateType: Math.floor(Math.random() * 3) + 1 // 1, 2, 3 중 랜덤 접시 타입
      };
      
      // 새 메시지를 기존 메시지 배열에 추가
      setRegisteredMessages([...registeredMessages, newMessage]);
      
      // 새 메시지 등록 시 첫 페이지로 이동 (최신 메시지가 첫 페이지에 표시됨)
      setCurrentPage(1);
      
      // 입력 폼 초기화
      setTextValue("");
      if (writerName !== "작성자명") {
        setWriterName("작성자명");
      }
      alert("고백접시가 등록되었습니다!");
    } else {
      alert("메시지를 입력해주세요!");
    }
  };
  
  // 화살표 클릭 시 화살표가 화면 상단에 오도록 스크롤하는 함수
  const scrollToArrow = () => {
    if (arrowRef.current) {
      // 화살표 요소의 위치 정보 가져오기
      const arrowRect = arrowRef.current.getBoundingClientRect();
      
      // 현재 스크롤 위치에 화살표의 상대적 위치를 더해서 화살표의 절대 위치 계산
      const arrowPosition = window.scrollY + arrowRect.top;
      
      // 헤더 높이를 고려한 오프셋 (navbar 높이)
      const offset = 95;
      
      // 화살표가 화면 최상단에 오도록 스크롤
      window.scrollTo({
        top: arrowPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // 현재 페이지에 표시할 메시지 계산
  const getCurrentPageItems = () => {
    // 최신 메시지가 먼저 오도록 배열을 역순으로 정렬
    const reversedMessages = [...registeredMessages].reverse();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reversedMessages.slice(startIndex, endIndex);
  };

  // 총 페이지 수 계산
  const getTotalPages = () => {
    return Math.ceil(registeredMessages.length / itemsPerPage);
  };

  // 페이지 변경 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <HeaderSection>
        <Title>고백접시 돌리기</Title>
        <SubtitleWrapper>
          <Subtitle>식구들에게 남긴 응원의 메세지가</Subtitle>
          <Subtitle>담긴 고백접시입니다.</Subtitle>
          <Subtitle>식구들과 함께 고백접시를 돌려볼까요?</Subtitle>
        </SubtitleWrapper>
      </HeaderSection>
      
      <PlatesStrip>
        <PlatesContainer>
          <PlatesRow>
            {/* 첫 번째 세트 */}
            <PlateItem>
              <PlateImage src={plate1} alt="Plate 1" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate2} alt="Plate 2" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate3} alt="Plate 3" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate1} alt="Plate 1" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate2} alt="Plate 2" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate3} alt="Plate 3" />
            </PlateItem>
            
            {/* 두 번째 세트 (첫 번째 세트를 복제) */}
            <PlateItem>
              <PlateImage src={plate1} alt="Plate 1" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate2} alt="Plate 2" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate3} alt="Plate 3" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate1} alt="Plate 1" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate2} alt="Plate 2" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate3} alt="Plate 3" />
            </PlateItem>
            
            {/* 자연스러운 반복을 위한 추가 요소 */}
            <PlateItem>
              <PlateImage src={plate1} alt="Plate 1" />
            </PlateItem>
            <PlateItem>
              <PlateImage src={plate2} alt="Plate 2" />
            </PlateItem>
          </PlatesRow>
        </PlatesContainer>
      </PlatesStrip>
      
      <DownArrowSection ref={arrowRef}>
        <DownArrowWrapper onClick={scrollToArrow}>
          <DownArrow src={downArrow} alt="Down Arrow" />
        </DownArrowWrapper>
      </DownArrowSection>
      
      <MainContent>
        <InputLabelBox>
          <InputLabel>고백접시 돌리기</InputLabel>
        </InputLabelBox>
        
        <FormInstructions>
          <InstructionWrapper>
            <Instruction>① 고백접시 돌리기 버튼을 누르면 응원의 메세지를 담긴다.</Instruction>
          </InstructionWrapper>
          <InstructionWrapper>
            <Instruction>② 고백접시를 돌려 글을 읽어본다.</Instruction>
          </InstructionWrapper>
          <InstructionWrapper>
            <Instruction>③ 든든한 마음과 함께 식식의 식구가 된다.</Instruction>
          </InstructionWrapper>
        </FormInstructions>
        
        <FormSection ref={formSectionRef}>
          <FormContainer>
            <FormHeader>
              <WriterLabel>작성자</WriterLabel>
              <Divider>|</Divider>
              <WriterNameInput 
                value={writerName} 
                onChange={handleWriterNameChange} 
                onFocus={() => writerName === "작성자명" && setWriterName("")}
                onBlur={() => !writerName.trim() && setWriterName("작성자명")}
              />
            </FormHeader>
            
            <FormTextarea
              placeholder={defaultText}
              value={isFocused || textValue ? textValue : defaultText}
              onChange={handleTextChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              isfocused={isFocused || textValue.length > 0 ? "true" : "false"}
            />
            
            {!isFocused && textValue && (
              <CharacterCount>{180 - textValue.replace(/\s/g, "").length}자 남음</CharacterCount>
            )}
            
            <FormDivider />
            
            <SubmitButtonWrapper>
              <SubmitButton onClick={handleRegisterMessage}>
                <ButtonDot />
                고백접시 돌리기
              </SubmitButton>
            </SubmitButtonWrapper>
          </FormContainer>
        </FormSection>
        
        {registeredMessages.length > 0 && (
          <PlatesGridSection>
            <PlatesGrid windowWidth={windowWidth}>
              {getCurrentPageItems().map((message) => (
                <PlateGridItem key={message.id}>
                  <PlateCircle 
                    src={message.plateType === 1 ? plate1 : message.plateType === 2 ? plate2 : plate3} 
                    alt={`Plate ${message.plateType}`} 
                  />
                  <PlateMessageOverlay>
                    <PlateMessage>{message.text.length > 30 ? message.text.substring(0, 30) + "..." : message.text}</PlateMessage>
                    <PlateWriter>- {message.writer}</PlateWriter>
                  </PlateMessageOverlay>
                </PlateGridItem>
              ))}
            </PlatesGrid>
          </PlatesGridSection>
        )}
        
        {registeredMessages.length > 0 && (
          <Pagination>
            {Array.from({ length: getTotalPages() }, (_, index) => (
              <PageNumber 
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageNumber>
            ))}
          </Pagination>
        )}
      </MainContent>
    </Container>
  );
};

export default Thirdpage;

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffff00;
  font-family: "Gothic A1", sans-serif;
`;

const HeaderSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8vh 0 5vh; /* 여백 증가 */
  
  @media (max-width: 768px) {
    padding: 5vh 0 3vh;
  }
`;

const Title = styled.h1`
  font-size: 5.5vw; /* 크기 증가 */
  max-font-size: 80px;
  font-weight: 1000;
  margin-bottom: 4vh; /* 여백 증가 */
  text-align: center;
  color: #000;
  
  @media (max-width: 768px) {
    font-size: 8vw;
    margin-bottom: 2.5vh;
  }
`;

const SubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5vh; /* 여백 유지 */
  
  @media (max-width: 768px) {
    margin-bottom: 3vh;
  }
`;

const Subtitle = styled.p`
  font-size: 2vw; /* 크기 유지 */
  line-height: 1.2; /* 줄 간격 축소 */
  margin: 0; /* 줄 간격 제거 */
  text-align: center;
  color: #000;
  font-weight: 1000;
  
  @media (max-width: 768px) {
    font-size: 3.5vw;
    line-height: 1.2; /* 모바일에서도 줄 간격 축소 */
  }
`;

const PlatesStrip = styled.div`
  width: 100%;
  background-color: #232323;
  padding: 6vh 0; /* 패딩 증가 */
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 5vh 0;
  }
`;

const PlatesContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const PlatesRow = styled.div`
  display: flex;
  align-items: center;
  width: 300%;
  animation: ${slideAnimation} 25s linear infinite;
`;

const PlateItem = styled.div`
  width: calc((100vw - 200px) / 6); /* 간격 증가 */
  height: calc((100vw - 200px) / 6);
  margin: 0 20px; /* 간격 증가 */
  flex-shrink: 0;
  max-width: 170px; /* 최대 크기 증가 */
  max-height: 170px;
  min-width: 90px;
  min-height: 90px;
  
  @media (max-width: 768px) {
    width: calc((100vw - 120px) / 3); /* 모바일에서 간격 증가 */
    height: calc((100vw - 120px) / 3);
    margin: 0 15px; /* 모바일에서 여백 증가 */
    max-width: 130px;
    max-height: 130px;
  }
`;

const PlateImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
  border: 2px solid white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const DownArrowSection = styled.div`
  width: 100%;
  padding: 5vh 0; /* 패딩 증가 */
  display: flex;
  justify-content: center;
  background-color: #ffff00;
  
  @media (max-width: 768px) {
    padding: 3vh 0;
  }
`;

const DownArrowWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1.2); /* 크기 증가 */
  
  &:hover {
    transform: translateY(5px) scale(1.2);
    transition: transform 0.3s ease;
  }
`;

const DownArrow = styled.img`
  width: 2vw; /* 크기 증가 */
  height: auto;
  max-width: 60px;
  min-width: 35px;
`;

const MainContent = styled.div`
  width: 80%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 0 5vh; /* 패딩 증가 */
  
  @media (max-width: 768px) {
    width: 90%;
    padding: 1vh 0 4vh;
  }
`;

const InputLabelBox = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  margin-bottom: 5vh; /* 여백 증가 */
  
  @media (max-width: 768px) {
    width: 60%;
    margin-bottom: 3vh;
  }
`;

const InputLabel = styled.div`
  font-size: 1.2vw; /* 크기 증가 */
  font-weight: 600;
  padding: 0.8vh 1.5vw; /* 패딩 증가 */
  background-color: white;
  border: 2px solid black;
  display: inline-block;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 0.5vh 3vw;
  }
`;

const FormInstructions = styled.div`
  margin-bottom: 6vh; /* 여백 증가 */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-bottom: 4vh;
  }
`;

const InstructionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5vh; /* 여백 증가 */
`;

const Instruction = styled.div`
  font-size: 1.4vw; /* 크기 증가 */
  text-align: center;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 3vw;
  }
`;

const FormSection = styled.div`
  width: 100%;
  margin-bottom: 6vh; /* 여백 증가 */
  
  @media (max-width: 768px) {
    margin-bottom: 4vh;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* 그림자 강화 */
  overflow: hidden;
  position: relative;
  border-radius: 4px; /* 모서리 약간 둥글게 */
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 2vh 2vw; /* 패딩 증가 */
  font-size: 1.4vw; /* 크기 증가 */
  font-weight: 600;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 768px) {
    padding: 1.5vh 3vw;
    font-size: 3.5vw;
  }
`;

const WriterLabel = styled.div`
  margin-right: 1vw;
  
  @media (max-width: 768px) {
    margin-right: 2vw;
  }
`;

const Divider = styled.span`
  margin: 0 1.2vw; /* 간격 증가 */
  color: #777;
  
  @media (max-width: 768px) {
    margin: 0 2vw;
  }
`;

const WriterNameInput = styled.input`
  color: #777;
  font-size: 1.4vw; /* 크기 증가 */
  font-weight: 600;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
  
  &:focus {
    color: #000;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 18vh; /* 높이 증가 */
  padding: 2vh 2vw; /* 패딩 증가 */
  border: none;
  resize: vertical;
  font-family: "Gothic A1", sans-serif;
  font-size: 1.2vw; /* 크기 증가 */
  line-height: 1.6;
  margin: 0;
  box-sizing: border-box;
  display: block;
  color: ${props => props.isfocused === "true" ? "#000" : "#777"};
  
  @media (max-width: 768px) {
    min-height: 22vh;
    padding: 1.5vh 3vw;
    font-size: 3vw;
  }
  
  &:focus {
    outline: none;
    color: #000;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: 6.5vh; /* 위치 조정 */
  right: 2vw; /* 위치 조정 */
  font-size: 1vw;
  color: #777;
  
  @media (max-width: 768px) {
    bottom: 7vh;
    right: 3vw;
    font-size: 2.5vw;
  }
`;

const FormDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 0;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2vh 2vw; /* 패딩 증가 */
  margin: 0;
  
  @media (max-width: 768px) {
    padding: 1.8vh 3vw;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2vh 2vw; /* 패딩 증가 */
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 1.2vw; /* 크기 증가 */
  font-weight: 600;
  cursor: pointer;
  
  @media (max-width: 768px) {
    padding: 1.2vh 5vw;
    font-size: 3vw;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonDot = styled.span`
  width: 0.6vw; /* 크기 증가 */
  height: 0.6vw;
  min-width: 5px;
  min-height: 5px;
  background-color: white;
  border-radius: 50%;
  margin-right: 0.8vw; /* 여백 증가 */
  
  @media (max-width: 768px) {
    width: 1.5vw;
    height: 1.5vw;
    margin-right: 1.5vw;
  }
`;

const PlatesGridSection = styled.div`
  width: 100%;
  margin: 7vh 0 3vh; /* 여백 증가 */
  
  @media (max-width: 768px) {
    margin: 5vh 0 3vh;
  }
`;

const PlatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3vw; /* 간격 증가 */
  width: 100%;
  justify-items: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 4vw; /* 간격 증가 */
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 5vw; /* 간격 증가 */
  }
`;

const PlateGridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
  aspect-ratio: 1/1; /* 정사각형 비율 유지 */
  max-width: 220px; /* 크기 증가 */
  
  &:hover {
    transform: translateY(-8px); /* 효과 강화 */
    
    > div {
      opacity: 1;
    }
  }
`;

const PlateCircle = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
  border: 3px solid #fff; /* 테두리 두께 증가 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* 그림자 강화 */
`;

const PlateMessageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 2vw; /* 패딩 증가 */
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 6vw;
  }
`;

const PlateMessage = styled.div`
  color: white;
  font-size: 1.2vw; /* 크기 증가 */
  text-align: center;
  margin-bottom: 1.5vh; /* 여백 증가 */
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  
  @media (max-width: 768px) {
    font-size: 4vw;
    margin-bottom: 2vh;
  }
`;

const PlateWriter = styled.div`
  color: white;
  font-size: 1vw; /* 크기 증가 */
  font-style: italic;
  text-align: right;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 3.2vw;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4vh; /* 여백 증가 */
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    margin-top: 3vh;
  }
`;

const PageNumber = styled.div`
  width: 3vw; /* 크기 증가 */
  height: 3vw;
  min-width: 30px;
  min-height: 30px;
  max-width: 45px;
  max-height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0.8vh 0.8vw; /* 여백 증가 */
  background-color: white;
  border: 1px solid #000;
  font-size: 1.2vw; /* 크기 증가 */
  cursor: pointer;
  
  @media (max-width: 768px) {
    width: 9vw;
    height: 9vw;
    font-size: 3.5vw;
    margin: 1.2vw;
  }
  
  &.active {
    background-color: #000;
    color: #fff;
  }
`;