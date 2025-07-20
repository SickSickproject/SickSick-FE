const pagesPerGroup = 5;
  const itemsPerPage = 12;import { useState, useRef, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { supabase } from "../SupabaseClient";
import { useLocation } from "react-router-dom";

import plate1 from "../assets/Achiveimg/plate4.svg";
import plate2 from "../assets/Achiveimg/plate5.svg";
import plate3 from "../assets/Achiveimg/plate6.svg";
import downArrow from "../assets/Achiveimg/downArrow.png"; 
import num1 from "../assets/Achiveimg/siksik_three_1.svg";
import num2 from "../assets/Achiveimg/siksik_three_2.svg";
import num3 from "../assets/Achiveimg/siksik_three_3.svg";
import leftArrow from "../assets/Achiveimg/siksik_three_arrowL.svg";
import rightArrow from "../assets/Achiveimg/siksik_three_arrowR.svg";

const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-33.333% - 1.04vw));
  }
`;

const Thirdpage = () => {
  const location = useLocation();
  
  const arrowRef = useRef(null);
  const formSectionRef = useRef(null);
  
  const [textValue, setTextValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const defaultText = "식식은 섭식장애에 그저 '이런 병이 있습니다'에서 그치지 않습니다. '함께' 할 수 있도록 공간을 마련하는 것, 그것이 바로 식식의 종착점입니다. 섭식장애 문제에 함께 목소리를 내는 것이 어려운 일이 되지 않도록 '고백접시 돌리기'는 그런 생각에서 부터 시작하게 되었습니다. 세 명의 식구들로부터 온 접시를 전달 받은 순간부터, 당신도 우리의 식구!";
  
  const [registeredMessages, setRegisteredMessages] = useState([]);
  const [writerName, setWriterName] = useState("작성자명");
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [clickedPlates, setClickedPlates] = useState({}); 
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);

  // 메시지 불러오기 함수
  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('메시지 불러오기 시작...');
      
      const { data, error } = await supabase
        .from('cheering')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('데이터 불러오기 오류:', error);
        alert(`데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`);
        return;
      }

      console.log('불러온 데이터:', data);
      
      const transformedData = data.map((item, index) => ({
        id: item.id,
        text: item.text,
        writer: item.name || "익명",
        plateType: (index % 3) + 1,
        date: new Date(item.created_at).toISOString().split('T')[0]
      }));
      
      console.log('변환된 데이터:', transformedData);
      setRegisteredMessages(transformedData);
    } catch (error) {
      console.error('데이터 불러오기 중 예외 발생:', error);
      alert(`데이터를 불러오는 중 오류가 발생했습니다: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // 경로 변경 시 클릭된 접시 상태 초기화
  useEffect(() => {
    setClickedPlates({});
  }, [location.pathname]);

  // 창 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 텍스트 변경 핸들러
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    const textWithoutSpaces = inputText.replace(/\s/g, "");
    if (textWithoutSpaces.length <= 180) {
      setTextValue(inputText);
    }
  };
  
  // 작성자명 변경 핸들러
  const handleWriterNameChange = (e) => {
    const inputName = e.target.value;
    const nameWithoutSpaces = inputName.replace(/\s/g, "");
    if (nameWithoutSpaces.length <= 8) {
      setWriterName(inputName);
    }
  };
  
  // 텍스트 영역 포커스 핸들러
  const handleFocus = () => {
    setIsFocused(true);
    if (!textValue) {
      setTextValue("");
    }
  };
  
  // 텍스트 영역 블러 핸들러
  const handleBlur = () => {
    setIsFocused(false);
    if (!textValue.trim()) {
      setTextValue("");
    }
  };
  
  // 메시지 등록 핸들러
  const handleRegisterMessage = async () => {
    if (!textValue.trim()) {
      alert("메시지를 입력해주세요!");
      return;
    }

    try {
      setIsLoading(true);
      
      const messageData = {
        name: writerName !== "작성자명" ? writerName.trim() : "익명",
        text: textValue.trim()
      };
      
      console.log('저장할 데이터:', messageData);
      
      const { data, error } = await supabase
        .from('cheering')
        .insert([messageData])
        .select();

      if (error) {
        console.error('데이터 저장 오류:', error);
        alert(`메시지 저장 중 오류가 발생했습니다: ${error.message}`);
        return;
      }

      console.log('저장된 데이터:', data);

      if (data && data.length > 0) {
        const newMessage = {
          id: data[0].id,
          text: data[0].text,
          writer: data[0].name || "익명",
          plateType: Math.floor(Math.random() * 3) + 1,
          date: new Date(data[0].created_at).toISOString().split('T')[0]
        };
        
        console.log('로컬 상태에 추가할 메시지:', newMessage);
        
        setRegisteredMessages(prev => [newMessage, ...prev]);
        setCurrentPage(1);
        setCurrentPageGroup(1);
        
        setTextValue("");
        setWriterName("작성자명");
        
        alert("고백접시가 등록되었습니다!");
      }
    } catch (error) {
      console.error('메시지 저장 중 예외 발생:', error);
      alert(`메시지 저장 중 오류가 발생했습니다: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 아래 화살표 클릭 시 스크롤
  const scrollToArrow = () => {
    if (arrowRef.current) {
      const arrowRect = arrowRef.current.getBoundingClientRect();
      const arrowPosition = window.scrollY + arrowRect.top;
      const offset = 95;
      
      window.scrollTo({
        top: arrowPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // 접시 클릭 핸들러
  const handlePlateClick = (messageId) => {
    console.log('접시 클릭됨:', messageId);
    
    setClickedPlates(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  // 현재 페이지 아이템 가져오기
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return registeredMessages.slice(startIndex, endIndex).map((message, index) => ({
      ...message,
      plateType: ((startIndex + index) % 3) + 1
    }));
  };

  // 총 페이지 수 계산
  const getTotalPages = () => {
    return Math.ceil(registeredMessages.length / itemsPerPage);
  };

  // 페이지 그룹 범위 계산
  const getPageGroupRange = () => {
    const totalPages = getTotalPages();
    const startPage = (currentPageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    return { startPage, endPage };
  };

  // 총 페이지 그룹 수 계산
  const getTotalPageGroups = () => {
    return Math.ceil(getTotalPages() / pagesPerGroup);
  };

  // 이전 그룹으로 이동
  const handlePreviousGroup = () => {
    if (currentPageGroup > 1) {
      const newGroup = currentPageGroup - 1;
      setCurrentPageGroup(newGroup);
      const newPage = (newGroup - 1) * pagesPerGroup + 1;
      setCurrentPage(newPage);
    }
  };

  // 다음 그룹으로 이동
  const handleNextGroup = () => {
    const totalGroups = getTotalPageGroups();
    if (currentPageGroup < totalGroups) {
      const newGroup = currentPageGroup + 1;
      setCurrentPageGroup(newGroup);
      const newPage = (newGroup - 1) * pagesPerGroup + 1;
      setCurrentPage(newPage);
    }
  };

  // 페이지 변경 핸들러 (스크롤 포함)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    // 약간의 딜레이 후 스크롤 실행 (상태 업데이트 후)
    setTimeout(() => {
      if (formSectionRef.current) {
        const formRect = formSectionRef.current.getBoundingClientRect();
        const formPosition = window.scrollY + formRect.top + formRect.height;
        const offset = -50; // 폼 위쪽으로 더 올리기 (음수값)
        
        window.scrollTo({
          top: formPosition + offset,
          behavior: 'smooth'
        });
      }
    }, 100); // 100ms 딜레이
  };

  // 작성자명 포커스 핸들러
  const handleNameFocus = () => {
    if (writerName === "작성자명") {
      setWriterName("");
    }
  };

  // 작성자명 블러 핸들러
  const handleNameBlur = () => {
    if (!writerName.trim()) {
      setWriterName("작성자명");
    }
  };

  // 남은 작성자명 글자 수
  const getRemainingNameChars = () => {
    if (writerName === "작성자명") return 8;
    return 8 - writerName.replace(/\s/g, "").length;
  };

  console.log('Thirdpage 렌더링 - clickedPlates:', clickedPlates);
  console.log('현재 location:', location.pathname);

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
            {Array.from({ length: 18 }, (_, index) => (
              <PlateItem key={index}>
                <MovingPlateImage 
                  src={index % 3 === 0 ? plate1 : index % 3 === 1 ? plate2 : plate3} 
                  alt={`Plate ${(index % 3) + 1}`} 
                />
              </PlateItem>
            ))}
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
            <Instruction>
              <NumberImage src={num1} alt="1" />
              고백접시 돌리기 버튼을 눌러 응원의 메세지를 남긴다.
            </Instruction>
          </InstructionWrapper>
          <InstructionWrapper>
            <Instruction>
              <NumberImage src={num2} alt="2" />
              고백접시를 눌러 글을 읽어본다.
            </Instruction>
          </InstructionWrapper>
          <InstructionWrapper>
            <Instruction>
              <NumberImage src={num3} alt="3" />
              든든한 마음과 함께 식식의 식구가 된다.
            </Instruction>
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
                $isFocused={writerName !== "작성자명"}
              />
              {writerName !== "작성자명" && (
                <WriterNameCount>*{getRemainingNameChars()}자 남음</WriterNameCount>
              )}
            </FormHeader>
            
            <FormTextarea
              placeholder={defaultText}
              value={isFocused || textValue ? textValue : defaultText}
              onChange={handleTextChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              $isFocused={isFocused || textValue.length > 0}
            />
            
            {(isFocused || textValue) && (
              <CharacterCount>*{180 - textValue.replace(/\s/g, "").length}자 남음</CharacterCount>
            )}
            
            <FormDivider />
            
            <SubmitButtonWrapper>
              <SubmitButton onClick={handleRegisterMessage} disabled={isLoading}>
                <ButtonDot />
                {isLoading ? "등록 중..." : "고백접시 돌리기"}
              </SubmitButton>
            </SubmitButtonWrapper>
          </FormContainer>
        </FormSection>
        
        {isLoading && registeredMessages.length === 0 ? (
          <LoadingMessage>메시지를 불러오는 중...</LoadingMessage>
        ) : registeredMessages.length > 0 ? (
          <PlatesGridSection>
            <PlatesGrid>
              {getCurrentPageItems().map((message) => (
                <PlateGridItem key={message.id} onClick={() => handlePlateClick(message.id)}>
                  <PlateCircle 
                    src={message.plateType === 1 ? plate1 : message.plateType === 2 ? plate2 : plate3} 
                    alt={`Plate ${message.plateType}`} 
                  />
                  <PlateMessageOverlay $isClicked={clickedPlates[message.id]}>
                    <PlateWriter>{message.writer}</PlateWriter>
                    <PlateMessage>{message.text}</PlateMessage>
                    <PlateDate>{message.date}</PlateDate>
                  </PlateMessageOverlay>
                </PlateGridItem>
              ))}
            </PlatesGrid>
          </PlatesGridSection>
        ) : null}
        
        {registeredMessages.length > 0 && (
          <Pagination>
            <ArrowButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
              <ArrowImage src={leftArrow} alt="Previous" />
            </ArrowButton>
            
            {Array.from({ length: getTotalPages() }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <PageNumber 
                  key={pageNumber}
                  className={currentPage === pageNumber ? "active" : ""}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </PageNumber>
              );
            })}
            
            <ArrowButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= getTotalPages()}>
              <ArrowImage src={rightArrow} alt="Next" />
            </ArrowButton>
          </Pagination>
        )}
      </MainContent>
    </Container>
  );
};

export default Thirdpage;

// 뷰포트 단위 기반 스타일 컴포넌트들
const Container = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffff00;
  font-family: "Gothic A1", sans-serif;
  overflow-x: hidden;
`;

const HeaderSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 9.26vh 0 7.41vh;
`;

const Title = styled.h1`
  font-size: 5.21vw;
  font-weight: 800;
  margin-bottom: 5.56vh;
  text-align: center;
  color: #000;
`;

const SubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.85vh;
`;

const Subtitle = styled.p`
  font-size: 1.88vw;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  margin-bottom: 0.74vh;
  text-align: center;
  color: #000;
`;

const PlatesStrip = styled.div`
  width: 100vw;
  background-color: #232323;
  padding: 0;
  overflow: hidden;
  position: relative;
  height: 28.06vh;
`;

const PlatesContainer = styled.div`
  width: 100%;
  overflow: visible;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28.06vh;
  padding: 0;
`;

const PlatesRow = styled.div`
  display: flex;
  align-items: center;
  width: 450%;
  animation: ${slideAnimation} 35s linear infinite;
  height: auto;
`;

const PlateItem = styled.div`
  width: 11.46vw;
  height: 20.37vh;
  margin: 0 1.82vw;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MovingPlateImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
  background-color: white;
  border: 2px solid #232323;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  aspect-ratio: 1;
`;

const DownArrowSection = styled.div`
  width: 100%;
  padding: 4.63vh 0;
  display: flex;
  justify-content: center;
  background-color: #ffff00;
`;

const DownArrowWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(1.2);
  
  &:hover {
    transform: translateY(5px) scale(1.2);
    transition: transform 0.3s ease;
  }
`;

const DownArrow = styled.img`
  width: 2.5vw;
  height: auto;
`;

const MainContent = styled.div`
  width: 83.33vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 7.41vh;
`;

const InputLabelBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5.56vh;
  margin-top: 0;
`;

const InputLabel = styled.div`
  font-size: 1.15vw;
  font-weight: 800;
  padding: 1.11vh 1.04vw;
  background-color: white;
  border: 3px solid black;
  text-align: center;
  white-space: nowrap;
`;

const FormInstructions = styled.div`
  margin-bottom: 7.41vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InstructionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 0.93vh;
`;

const Instruction = styled.div`
  font-size: 1.15vw;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NumberImage = styled.img`
  width: 1.15vw;
  height: 2.04vh;
  margin-right: 0.63vw;
  vertical-align: middle;
`;

const FormSection = styled.div`
  width: 100%;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 73.96vw;
  height: 46.30vh;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const FormHeader = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  padding: 2.22vh 1.67vw;
  font-size: 1.25vw;
  position: relative;
`;

const WriterLabel = styled.div`
  margin-right: 0.83vw;
  font-weight: 800;
`;

const Divider = styled.span`
  margin: 0 0.63vw;
  color: solid #000000;
  font-size: 1.25vw;
  display: inline-flex;
  align-items: center;
  transform: scaleY(0.9) scaleX(0.9);
`;

const WriterNameInput = styled.input`
  color: #000;
  font-size: 1.25vw;
  font-weight: 400;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;
  margin-left: 0.63vw;
  
  &:focus {
    color: #000;
  }
`;

const WriterNameCount = styled.div`
  position: absolute;
  right: 1.67vw;
  font-size: 0.83vw;
  color: #777;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 25.93vh;
  padding: 1.67vw;
  border: none;
  resize: vertical;
  font-family: "Gothic A1", sans-serif;
  font-size: 1.25vw;
  line-height: 1.6;
  margin: 0;
  box-sizing: border-box;
  display: block;
  color: ${props => props.$isFocused ? "#000" : "#777"};
  flex: 1;
  
  &:focus {
    outline: none;
    color: #000;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: 7.41vh;
  right: 1.67vw;
  font-size: 0.83vw;
  color: #777;
`;

const FormDivider = styled.div`
  width: calc(100% - 3.33vw);
  height: 1px;
  background-color: #000;
  margin: 0 1.67vw;
  margin-top: auto;
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.67vw;
  margin: 0;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.48vh 0;
  background-color: transparent;
  color: black;
  border: none;
  font-size: 1.25vw;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonDot = styled.span`
  width: 1.25vw;
  height: 2.22vh;
  background-color: black;
  border-radius: 50%;
  margin-right: 0.83vw;
  display: inline-block;
`;

const LoadingMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.25vw;
  font-weight: 600;
  color: #000;
  margin: 5.56vh 0;
`;

const PlatesGridSection = styled.div`
  width: 100%;
  margin: 9.26vh 0 5.56vh;
`;

const PlatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 28.44vw);
  gap: 2.08vw;
  width: 100%;
  justify-content: center;
`;

const PlateGridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  width: 28.44vw;
  height: 50.56vh;
  
  &:hover {
    > div {
      opacity: 1;
    }
  }
`;

const PlateCircle = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
  object-position: center;
  background-color: white;
  border: 3px solid #ffff00;
  aspect-ratio: 1;
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
  opacity: ${props => props.$isClicked ? 1 : 0};
  transition: opacity 0.3s ease;
  padding: 8% 10%;
  box-sizing: border-box;
  border: 1px solid grey;
  
  &::after {
    content: '';
    position: absolute;
    top: 6.5%;
    left: 6.5%;
    right: 6.5%;
    bottom: 6.5%;
    border: 2px solid #444;
    border-radius: 50%;
    pointer-events: none;
  }
`;

const PlateWriter = styled.div`
  color: black;
  font-size: clamp(16px, 1.04vw, 20px);
  font-weight: 600;
  text-align: center;
  width: 100%;
  margin-bottom: auto;
  margin-top: 6%;
`;

const PlateMessage = styled.div`
  color: black;
  font-size: clamp(14px, 0.94vw, 18px);
  text-align: center;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  max-height: 65%;
  width: 100%;
  line-height: 1.4;
  margin: 0 auto;
`;

const PlateDate = styled.div`
  color: black;
  font-size: clamp(12px, 0.83vw, 16px);
  text-align: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: 6%;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5.56vh;
  flex-wrap: wrap;
`;

const PageNumber = styled.div`
  width: 2.5vw;
  height: 4.44vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 1.11vh 0.83vw;
  background-color: #ffff00;
  border: 2px solid #000;
  font-size: 0.94vw;
  cursor: pointer;
  
  &.active {
    background-color: #000;
    color: #ffff00;
  }
`;

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.11vh 0.83vw;
  background: transparent;
  border: none;
  cursor: pointer;
  
  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ArrowImage = styled.img`
  width: 1.25vw;
  height: 2.22vh;
`;