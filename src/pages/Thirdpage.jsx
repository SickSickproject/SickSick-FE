import { useState, useRef } from "react";
import styled from "styled-components";

// 이미지 가져오기 (경로는 실제 위치에 맞게 수정해주세요)
import plate1 from "../assets/Achiveimg/plate1.png";
import plate2 from "../assets/Achiveimg/plate2.png";
import plate3 from "../assets/Achiveimg/plate3.png";
import downArrow from "../assets/Achiveimg/downArrow.png"; 

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
        <PlatesRow>
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
            <PlatesGrid>
              {registeredMessages.map((message) => (
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
            <PageNumber className="active">1</PageNumber>
            <PageNumber>2</PageNumber>
            <PageNumber>3</PageNumber>
            <PageNumber>4</PageNumber>
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
  padding: 120px 0 60px;
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: 800;
  margin-bottom: 40px;
  text-align: center;
  color: #000;
`;

const SubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const Subtitle = styled.p`
  font-size: 28px;
  line-height: 1.5;
  margin: 0;
  text-align: center;
  color: #000;
  font-weight: 500;
`;

const PlatesStrip = styled.div`
  width: 100%;
  background-color: #232323;
  padding: 30px 0;
  overflow: hidden;
`;

const PlatesRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const PlateItem = styled.div`
  width: 180px;
  height: 180px;
  margin: 0 10px;
`;

const PlateImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
  border: 2px solid white;
`;

// 화살표 섹션 - 이 섹션이 스크롤 시 화면 상단에 위치하게 됨
const DownArrowSection = styled.div`
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  background-color: #ffff00;
`;

const DownArrowWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    transform: translateY(5px);
    transition: transform 0.3s ease;
  }
`;

const DownArrow = styled.img`
  width: 40px;
  height: 40px;
`;

// 메인 콘텐츠 (입력 폼 포함)
const MainContent = styled.div`
  width: 80%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 30px;
`;

// 고백접시 돌리기 레이블
const InputLabelBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const InputLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding: 10px 20px;
  background-color: white;
  border: 2px solid black;
  display: inline-block;
  text-align: center;
`;

// 지시사항
const FormInstructions = styled.div`
  margin-bottom: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InstructionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Instruction = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 500;
`;

// 폼 섹션
const FormSection = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

// 폼 컨테이너를 수정하여 작성자명까지 포함
const FormContainer = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`;

// 작성자 헤더 - 이제 컨테이너 안쪽으로 이동
const FormHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
`;

const WriterLabel = styled.div`
  margin-right: 10px;
`;

const Divider = styled.span`
  margin: 0 10px;
  color: #777;
`;

const WriterNameInput = styled.input`
  color: #777;
  font-size: 20px;
  font-weight: 600;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;
  
  &:focus {
    color: #000;
  }
`;

// 텍스트 영역 - 포커스 상태에 따른 색상 변경 추가
const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 180px;
  padding: 15px;
  border: none;
  resize: vertical;
  font-family: "Gothic A1", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  box-sizing: border-box;
  display: block;
  color: ${props => props.isfocused === "true" ? "#000" : "#777"};
  
  &:focus {
    outline: none;
    color: #000;
  }
`;

// 남은 글자 수 표시
const CharacterCount = styled.div`
  position: absolute;
  bottom: 55px;
  right: 15px;
  font-size: 14px;
  color: #777;
`;

// 구분선
const FormDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 0;
`;

// 버튼 영역
const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  margin: 0;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonDot = styled.span`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  margin-right: 8px;
`;

// 플레이트 그리드
const PlatesGridSection = styled.div`
  width: 100%;
  margin: 60px 0 30px;
`;

const PlatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  justify-items: center;
`;

const PlateGridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    
    > div {
      opacity: 1;
    }
  }
`;

const PlateCircle = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
  border: 2px solid #fff;
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
  padding: 15px;
  box-sizing: border-box;
`;

const PlateMessage = styled.div`
  color: white;
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const PlateWriter = styled.div`
  color: white;
  font-size: 14px;
  font-style: italic;
  text-align: right;
  width: 100%;
`;

// 페이지네이션
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const PageNumber = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0 5px;
  background-color: white;
  border: 1px solid #000;
  font-size: 16px;
  cursor: pointer;
  
  &.active {
    background-color: #000;
    color: #fff;
  }
`;