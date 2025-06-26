import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// 이미지 가져오기 (경로는 실제 위치에 맞게 수정해주세요)
import plate1 from "../assets/Achiveimg/plate4.svg";
import plate2 from "../assets/Achiveimg/plate5.svg";
import plate3 from "../assets/Achiveimg/plate6.svg";
import downArrow from "../assets/Achiveimg/downArrow.png"; 

// 애니메이션 정의 - 세 개의 세트를 위한 애니메이션
const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-33.333% - 10px)); /* 3개 세트 중 1개 세트만큼 이동 */
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
  const [clickedPlates, setClickedPlates] = useState({}); 
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
  
  // 작성자명 입력 처리 - 8자 제한 추가
  const handleWriterNameChange = (e) => {
    const inputName = e.target.value;
    // 8자 제한 적용 (공백 제외)
    const nameWithoutSpaces = inputName.replace(/\s/g, "");
    if (nameWithoutSpaces.length <= 8) {
      setWriterName(inputName);
    }
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
      // 현재 날짜 포맷팅 (YYYY-MM-DD)
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      // 사용자 입력 텍스트가 있을 때만 메시지 등록
      const newMessage = {
        id: Date.now(), // 고유 ID
        text: textValue,
        writer: writerName !== "작성자명" ? writerName : "익명",
        plateType: Math.floor(Math.random() * 3) + 1, // 1, 2, 3 중 랜덤 접시 타입
        date: formattedDate // 등록 날짜 추가
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

  const handlePlateClick = (messageId) => {
    setClickedPlates(prev => ({
      ...prev,
      [messageId]: !prev[messageId] // 클릭된 상태를 토글
    }));
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

  // 작성자 입력 필드에 대한 포커스 처리
  const handleNameFocus = () => {
    if (writerName === "작성자명") {
      setWriterName("");
    }
  };

  // 작성자 입력 필드에 대한 블러 처리
  const handleNameBlur = () => {
    if (!writerName.trim()) {
      setWriterName("작성자명");
    }
  };

  // 작성자명 남은 글자 수 계산
  const getRemainingNameChars = () => {
    if (writerName === "작성자명") return 8;
    return 8 - writerName.replace(/\s/g, "").length;
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
            
            {/* 두 번째 세트 */}
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
            
            {/* 세 번째 세트 */}
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
            <Instruction>❶ 고백접시 돌리기 버튼을 누르면 응원의 메세지를 담긴다.</Instruction>
          </InstructionWrapper>
          <InstructionWrapper>
            <Instruction>❷ 고백접시를 돌려 글을 읽어본다.</Instruction>
          </InstructionWrapper>
          <InstructionWrapper>
            <Instruction>❸ 든든한 마음과 함께 식식의 식구가 된다.</Instruction>
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
                onFocus={handleNameFocus}
                onBlur={handleNameBlur}
                isfocused={writerName !== "작성자명" ? "true" : "false"}
              />
              {writerName !== "작성자명" && (
                <WriterNameCount>{getRemainingNameChars()}자 남음</WriterNameCount>
              )}
            </FormHeader>
            
            <FormTextarea
              placeholder={defaultText}
              value={isFocused || textValue ? textValue : defaultText}
              onChange={handleTextChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              isfocused={isFocused || textValue.length > 0 ? "true" : "false"}
            />
            
            {(isFocused || textValue) && (
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
              <PlateGridItem key={message.id} onClick={() => handlePlateClick(message.id)}>
                <PlateCircle 
                  src={message.plateType === 1 ? plate1 : message.plateType === 2 ? plate2 : plate3} 
                  alt={`Plate ${message.plateType}`} 
                />
                <PlateMessageOverlay isClicked={clickedPlates[message.id]}>
                  <PlateWriter>{message.writer}</PlateWriter>
                  <PlateMessage>{message.text}</PlateMessage>
                  <PlateDate>{message.date}</PlateDate>
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
  font-size: 2vw; 
  line-height: 1.2; 
  margin: 0; 
  text-align: center;
  color: #000;
  font-weight: 1000;
  
  @media (max-width: 768px) {
    font-size: 3.5vw;
    line-height: 1.2; /* 모바일에서도 줄 간격 축소 */
  }
`;

// PlatesStrip은 원래 크기로 유지
const PlatesStrip = styled.div`
  width: 100%;
  background-color: #232323;
  padding: 6vh 0; /* 원래 패딩 유지 */
  overflow: hidden;
  position: relative;
  min-height: 180px; /* 명시적인 최소 높이 설정 */
  
  @media (max-width: 768px) {
    padding: 5vh 0;
    min-height: 150px;
  }
`;

// PlatesContainer만 수정하여 내용물이 짤리지 않도록 함
const PlatesContainer = styled.div`
  width: 100%;
  overflow: visible; /* overflow를 visible로 변경 */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0; /* 상하 패딩 추가 */
  height: auto; /* 자동 높이 지정 */
`;

// PlatesRow도 수정
const PlatesRow = styled.div`
  display: flex;
  align-items: center;
  width: 450%; /* 3개 세트 유지 */
  animation: ${slideAnimation} 35s linear infinite;
  height: auto; /* 내용물에 맞게 높이 조절 */
`;

// 접시 아이템 간격 조정
const PlateItem = styled.div`
  width: calc((100vw - 200px) / 6);
  height: calc((100vw - 200px) / 6);
  margin: 0 35px; /* 좌우 간격 증가 */
  flex-shrink: 0;
  max-width: 170px;
  max-height: 170px;
  min-width: 90px;
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: calc((100vw - 120px) / 3);
    height: calc((100vw - 120px) / 3);
    margin: 0 25px; /* 모바일에서도 간격 증가 */
    max-width: 130px;
    max-height: 130px;
  }
`;

// 접시 이미지 크기를 1.2배로 키움
const PlateImage = styled.img`
  width: 120%; /* 1.2배로 크기 증가 */
  height: 120%; /* 1.2배로 크기 증가 */
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
  border: 2px #232323;
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
  margin-bottom: 3vh; /* 여백 증가 */
  
  @media (max-width: 768px) {
    width: 60%;
    margin-bottom: 2vh;
  }
`;

const InputLabel = styled.div`
  font-size: 1.4vw; /* 크기 증가 */
  font-weight: 1000;
  padding: 0.8vh 1vw; /* 패딩 증가 */
  background-color: white;
  border: 2px solid black;
  display: inline-block;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 3vw;
    padding: 0.5vh 2vw;
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
  display: flex;
  justify-content: center; /* 가운데 정렬 추가 */
  
  @media (max-width: 768px) {
    margin-bottom: 4vh;
  }
`;

const FormContainer = styled.div`
  width: 90%;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15); /* 그림자 강화 */
  overflow: hidden;
  position: relative;
  min-height: 45vh; /* 높이를 1.5배로 증가 (기존 30vh의 1.5배) */
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    min-height: 40vh; /* 모바일에서도 높이 증가 */
  }
`;

const FormHeader = styled.div`
  color: #000; 
  display: flex;
  align-items: center;
  padding: 2vh 2vw; 
  font-size: 1.4vw; 
  font-weight: 800; 
  position: relative;
  
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
  color: #000; 
  font-size: 1.4vw; 
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

const WriterNameCount = styled.div`
  position: absolute;
  right: 2vw;
  font-size: 1vw;
  color: #777;
  
  @media (max-width: 768px) {
    right: 3vw;
    font-size: 2.5vw;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 18vh; 
  padding: 2vh 2vw; 
  border: none;
  resize: vertical;
  font-family: "Gothic A1", sans-serif;
  font-size: 1.2vw; 
  line-height: 1.6;
  margin: 0;
  box-sizing: border-box;
  display: block;
  color: ${props => props.isfocused === "true" ? "#000" : "#777"};
  flex: 1; 
  
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
  width: calc(100% - 4vw);
  height: 1px;
  background-color: #000;
  margin: 0 2vw;
  margin-top: auto; 
  
  @media (max-width: 768px) {
    width: calc(100% - 6vw);
    margin: auto 3vw 0 3vw;
  }
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬로 변경 */
  padding: 2vh 2vw;
  margin: 0;
  
  @media (max-width: 768px) {
    padding: 1.8vh 3vw;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2vh 0;
  background-color: transparent; /* 배경 투명 */
  color: black;
  border: none; /* 테두리 제거 */
  font-size: 1.2vw;
  font-weight: 600;
  cursor: pointer;
  
  @media (max-width: 768px) {
    font-size: 3vw;
  }
  
  &:hover {
    opacity: 0.7; /* 호버 시 살짝 투명하게 */
  }
`;

const ButtonDot = styled.span`
  width: 0.8vw;
  height: 0.8vw;
  min-width: 6px;
  min-height: 6px;
  background-color: black;
  border-radius: 50%;
  margin-right: 1vw;
  display: inline-block;
  
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
  aspect-ratio: 1/1; 
  max-width: 330px; /* 크기 1.2배 증가 (220px × 1.5) */
  
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
  border: 3px  #ffff00; /* 테두리 두께 증가 */
`;

const PlateMessageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  opacity: ${props => props.isClicked ? 1 : 0};
  transition: opacity 0.3s ease;
  padding: 10% 8%;
  box-sizing: border-box;
  border: 1px solid grey;
  
  &::after {
    content: '';
    position: absolute;
    top: 7%;
    left: 7%;
    right: 7%;
    bottom: 7%;
    border: 1px solid #444;
    border-radius: 50%;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 15% 10%;
  }
`;

const PlateWriter = styled.div`
  color: black; /* 글자색을 검정색으로 변경 */
  font-size: 1.1vw;
  font-weight: 600;
  text-align: center;
  width: 100%;
  margin-bottom: auto;
  margin-top: 10%;
  
  @media (max-width: 768px) {
    font-size: 3.5vw;
    margin-top: 8%;
  }
`;

const PlateMessage = styled.div`
  color: black; /* 글자색을 검정색으로 변경 */
  font-size: 1vw;
  text-align: center;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  max-height: 50%;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 3vw;
    -webkit-line-clamp: 4;
  }
`;

const PlateDate = styled.div`
  color: black; /* 글자색을 검정색으로 변경 */
  font-size: 0.8vw;
  text-align: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: 10%;
  
  @media (max-width: 768px) {
    font-size: 2.5vw;
    margin-bottom: 8%;
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