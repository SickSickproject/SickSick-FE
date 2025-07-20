import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { supabase } from "../SupabaseClient";
import { useLocation } from "react-router-dom";

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
  const location = useLocation(); // 현재 위치 추적
  
  // 화살표 ref와 폼 ref 생성
  const arrowRef = useRef(null);
  const formSectionRef = useRef(null);
  
  // 텍스트 영역 상태 관리
  const [textValue, setTextValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const defaultText = "식식은 섭식장애에 그저 '이런 병이 있습니다'에서 그치지 않습니다. '함께' 할 수 있도록 공간을 마련하는 것, 그것이 바로 식식의 종착점입니다. 섭식장애 문제에 함께 목소리를 내는 것이 어려운 일이 되지 않도록 '고백접시 돌리기'는 그런 생각에서 부터 시작하게 되었습니다. 세 명의 식구들로부터 온 접시를 전달 받은 순간부터, 당신도 우리의 식구!";
  
  // 등록된 메시지 관리
  const [registeredMessages, setRegisteredMessages] = useState([]);
  const [writerName, setWriterName] = useState("작성자명");
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [clickedPlates, setClickedPlates] = useState({}); 
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = windowWidth <= 768 ? 3 : windowWidth <= 1024 ? 6 : 9; // 화면 크기에 따라 페이지당 아이템 수 조정
  
  // Supabase에서 데이터 불러오기
  useEffect(() => {
    fetchMessages();
  }, []);

  // 페이지 경로가 변경될 때마다 접시 상태 초기화 (더 강력한 초기화)
  useEffect(() => {
    // 강제로 상태를 완전히 리셋
    setClickedPlates({});
    
    // 약간의 지연을 두고 한 번 더 초기화 (혹시 모를 상태 동기화 문제 방지)
    const timer = setTimeout(() => {
      setClickedPlates({});
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // 컴포넌트가 마운트될 때마다 클릭된 접시 상태 초기화
  useEffect(() => {
    setClickedPlates({});
  }, []);

  // 컴포넌트가 마운트될 때마다 클릭된 접시 상태 초기화
  useEffect(() => {
    setClickedPlates({});
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      console.log('메시지 불러오기 시작...');
      
      const { data, error } = await supabase
        .from('cheering')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('데이터 불러오기 오류 상세:', error);
        console.error('에러 메시지:', error.message);
        console.error('에러 코드:', error.code);
        alert(`데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`);
      } else {
        console.log('불러온 데이터:', data);
        
        // Supabase 데이터를 기존 형태로 변환
        const transformedData = data.map((item, index) => ({
          id: item.id,
          text: item.text,
          writer: item.name || "익명",
          plateType: (index % 3) + 1, // 순서대로 1, 2, 3 할당
          date: new Date(item.created_at).toISOString().split('T')[0] // YYYY-MM-DD 형태로 변환
        }));
        
        console.log('변환된 데이터:', transformedData);
        setRegisteredMessages(transformedData);
      }
    } catch (error) {
      console.error('데이터 불러오기 중 예외 발생:', error);
      alert(`데이터를 불러오는 중 오류가 발생했습니다: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };
  
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
  
  // 메시지 등록 처리 - Supabase 연동
  const handleRegisterMessage = async () => {
    if (!textValue.trim()) {
      alert("메시지를 입력해주세요!");
      return;
    }

    try {
      setIsLoading(true);
      
      console.log('저장할 데이터:', {
        name: writerName !== "작성자명" ? writerName.trim() : "익명",
        text: textValue.trim()
      });
      
      // Supabase에 데이터 저장 (plate_type 필드 제거)
      const { data, error } = await supabase
        .from('cheering')
        .insert([
          {
            name: writerName !== "작성자명" ? writerName.trim() : "익명",
            text: textValue.trim()
          }
        ])
        .select();

      if (error) {
        console.error('데이터 저장 오류 상세:', error);
        console.error('에러 메시지:', error.message);
        console.error('에러 코드:', error.code);
        alert(`메시지 저장 중 오류가 발생했습니다: ${error.message}`);
        return;
      }

      console.log('저장된 데이터:', data);

      // 성공적으로 저장되면 새로운 메시지를 로컬 상태에도 추가
      if (data && data.length > 0) {
        const newMessage = {
          id: data[0].id,
          text: data[0].text,
          writer: data[0].name || "익명",
          plateType: Math.floor(Math.random() * 3) + 1, // 로컬에서만 랜덤 생성
          date: new Date(data[0].created_at).toISOString().split('T')[0]
        };
        
        console.log('로컬 상태에 추가할 메시지:', newMessage);
        
        // 새 메시지를 기존 메시지 배열의 맨 앞에 추가 (최신순)
        setRegisteredMessages(prev => [newMessage, ...prev]);
        
        // 새 메시지 등록 시 첫 페이지로 이동
        setCurrentPage(1);
        
        // 입력 폼 초기화
        setTextValue("");
        if (writerName !== "작성자명") {
          setWriterName("작성자명");
        }
        
        alert("고백접시가 등록되었습니다!");
      }
    } catch (error) {
      console.error('메시지 저장 중 예외 발생:', error);
      alert(`메시지 저장 중 오류가 발생했습니다: ${error.message || error}`);
    } finally {
      setIsLoading(false);
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
    console.log('접시 클릭됨:', messageId);
    console.log('현재 clickedPlates 상태:', clickedPlates);
    
    setClickedPlates(prev => {
      const newState = {
        ...prev,
        [messageId]: !prev[messageId] // 클릭된 상태를 토글
      };
      console.log('새로운 clickedPlates 상태:', newState);
      return newState;
    });
  };

  // 현재 페이지에 표시할 메시지 계산 (이미 최신순으로 정렬되어 있음)
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return registeredMessages.slice(startIndex, endIndex).map((message, index) => ({
      ...message,
      // 페이지 내에서 순서대로 접시 타입 배정 (1, 2, 3 순환)
      plateType: ((startIndex + index) % 3) + 1
    }));
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

  // 디버깅용 로그
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
            <Instruction>❶ 고백접시 돌리기 버튼을 눌러 응원의 메세지를 남긴다.</Instruction>
          </InstructionWrapper>
          <InstructionWrapper>
            <Instruction>❷ 고백접시를 눌러 글을 읽어본다.</Instruction>
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
                <WriterNameCount>*{getRemainingNameChars()}자 남음</WriterNameCount>
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
        ) : null}
        
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

// 기존 스타일 컴포넌트들은 그대로 유지
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
  padding: 100px 0 80px;
  
  @media (max-width: 768px) {
    padding: 60px 0 40px;
  }
`;

const Title = styled.h1`
  font-size: 100px;
  font-weight: 800; /* Gothic A1 Extra Bold */
  margin-bottom: 60px;
  text-align: center;
  color: #000;
  
  @media (max-width: 1440px) {
    font-size: 88px;
    margin-bottom: 50px;
  }
  
  @media (max-width: 1024px) {
    font-size: 72px;
    margin-bottom: 40px;
  }
  
  @media (max-width: 768px) {
    font-size: 56px;
    margin-bottom: 30px;
  }
`;

const SubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.p`
  font-size: 36px;
  font-weight: 500; /* Gothic A1 Medium */
  line-height: 1.3;
  margin: 0;
  margin-bottom: 8px;
  text-align: center;
  color: #000;
  
  @media (max-width: 1440px) {
    font-size: 32px;
  }
  
  @media (max-width: 1024px) {
    font-size: 28px;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 6px;
  }
`;

const PlatesStrip = styled.div`
  width: 100%;
  max-width: 1920px;
  background-color: #232323;
  padding: 0;
  overflow: hidden;
  position: relative;
  height: 303px;
  
  @media (max-width: 1920px) {
    max-width: 100%;
  }
  
  @media (max-width: 1440px) {
    height: 270px;
  }
  
  @media (max-width: 1024px) {
    height: 240px;
  }
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const PlatesContainer = styled.div`
  width: 100%;
  overflow: visible;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 303px;
  padding: 0;
  
  @media (max-width: 1440px) {
    height: 270px;
  }
  
  @media (max-width: 1024px) {
    height: 240px;
  }
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const PlatesRow = styled.div`
  display: flex;
  align-items: center;
  width: 450%;
  animation: ${slideAnimation} 35s linear infinite;
  height: auto;
`;

const PlateItem = styled.div`
  width: 220px;
  height: 220px;
  margin: 0 35px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 1440px) {
    width: 190px;
    height: 190px;
    margin: 0 30px;
  }
  
  @media (max-width: 1024px) {
    width: 160px;
    height: 160px;
    margin: 0 25px;
  }
  
  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
    margin: 0 20px;
  }
`;

const PlateImage = styled.img`
  width: 120%;
  height: 120%;
  border-radius: 50%;
  object-fit: cover;
  background-color: white;
  border: 2px #232323;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const DownArrowSection = styled.div`
  width: 100%;
  padding: 50px 0px;
  display: flex;
  justify-content: center;
  background-color: #ffff00;
  
  @media (max-width: 768px) {
    padding: 40px 0;
  }
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
  width: 48px;
  height: auto;
  
  @media (max-width: 1440px) {
    width: 44px;
  }
  
  @media (max-width: 1024px) {
    width: 40px;
  }
  
  @media (max-width: 768px) {
    width: 36px;
  }
`;

const MainContent = styled.div`
  width: 90%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 80px;
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 0 0 60px;
  }
`;

const InputLabelBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  margin-top: 0px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
    margin-top: 0px;
  }
`;

const InputLabel = styled.div`
  font-size: 22px;
  font-weight: 800; /* Gothic A1 Medium */
  padding: 12px 20px;
  background-color: white;
  border: 3px solid black;
  text-align: center;
  white-space: nowrap;
  
  @media (max-width: 1440px) {
    font-size: 20px;
    padding: 11px 18px;
  }
  
  @media (max-width: 1024px) {
    font-size: 18px;
    padding: 10px 16px;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 9px 14px;
  }
`;

const FormInstructions = styled.div`
  margin-bottom: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const InstructionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Instruction = styled.div`
  font-size: 22px;
  font-weight: 600; /* Gothic A1 Semibold */
  text-align: center;
  
  @media (max-width: 1440px) {
    font-size: 20px;
  }
  
  @media (max-width: 1024px) {
    font-size: 18px;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FormSection = styled.div`
  width: 100%;
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const FormContainer = styled.div`
  width: 1420px;
  max-width: 90vw;
  height: 500px;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1440px) {
    width: 1200px;
    height: 450px;
  }
  
  @media (max-width: 1024px) {
    width: 900px;
    height: 400px;
  }
  
  @media (max-width: 768px) {
    width: 90vw;
    height: 350px;
  }
`;

const FormHeader = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  padding: 24px 32px;
  font-size: 24px;
  position: relative;
  
  @media (max-width: 1440px) {
    font-size: 22px;
    padding: 22px 30px;
  }
  
  @media (max-width: 1024px) {
    font-size: 20px;
    padding: 20px 28px;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 18px 24px;
  }
`;

const WriterLabel = styled.div`
  margin-right: 16px;
  font-weight: 800;
  
  @media (max-width: 768px) {
    margin-right: 14px;
  }
`;

const Divider = styled.span`
  margin: 0 12px;
  color: solid #000000;
  font-size: 24px;
  display: inline-flex;
  align-items: center;
  transform: scaleY(0.9) scaleX(0.9); /* 세로 70%, 가로 60%로 줄임 */
  
  @media (max-width: 1440px) {
    font-size: 22px;
  }
  
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    transform: scaleY(0.6) scaleX(0.5); /* 모바일에서는 더 얇고 짧게 */
  }
`;

const WriterNameInput = styled.input`
  color: #000;
  font-size: 24px;
  font-weight: 400;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;
  margin-left: 12px;
  
  @media (max-width: 768px) {
    margin-left: 14px;
  }
  
  @media (max-width: 1440px) {
    font-size: 22px;
  }
  
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
  
  &:focus {
    color: #000;
  }
`;

const WriterNameCount = styled.div`
  position: absolute;
  right: 32px;
  font-size: 16px;
  color: #777;
  
  @media (max-width: 1440px) {
    font-size: 15px;
    right: 30px;
  }
  
  @media (max-width: 1024px) {
    font-size: 14px;
    right: 28px;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    right: 24px;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 280px;
  padding: 32px;
  border: none;
  resize: vertical;
  font-family: "Gothic A1", sans-serif;
  font-size: 24px;
  line-height: 1.6;
  margin: 0;
  box-sizing: border-box;
  display: block;
  color: ${props => props.isfocused === "true" ? "#000" : "#777"};
  flex: 1;
  
  @media (max-width: 1440px) {
    min-height: 260px;
    padding: 30px;
    font-size: 22px;
  }
  
  @media (max-width: 1024px) {
    min-height: 240px;
    padding: 28px;
    font-size: 20px;
  }
  
  @media (max-width: 768px) {
    min-height: 220px;
    padding: 24px;
    font-size: 18px;
  }
  
  &:focus {
    outline: none;
    color: #000;
  }
`;

const CharacterCount = styled.div`
  position: absolute;
  bottom: 80px;
  right: 32px;
  font-size: 16px;
  color: #777;
  
  @media (max-width: 1440px) {
    bottom: 75px;
    right: 30px;
    font-size: 15px;
  }
  
  @media (max-width: 1024px) {
    bottom: 70px;
    right: 28px;
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    bottom: 65px;
    right: 24px;
    font-size: 13px;
  }
`;

const FormDivider = styled.div`
  width: calc(100% - 64px);
  height: 1px;
  background-color: #000;
  margin: 0 32px;
  margin-top: auto;
  
  @media (max-width: 1440px) {
    width: calc(100% - 60px);
    margin: 0 30px auto 30px;
  }
  
  @media (max-width: 1024px) {
    width: calc(100% - 56px);
    margin: 0 28px auto 28px;
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 48px);
    margin: 0 24px auto 24px;
  }
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 32px;
  margin: 0;
  
  @media (max-width: 1440px) {
    padding: 30px;
  }
  
  @media (max-width: 1024px) {
    padding: 28px;
  }
  
  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  background-color: transparent;
  color: black;
  border: none;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  
  @media (max-width: 1440px) {
    font-size: 22px;
    padding: 15px 0;
  }
  
  @media (max-width: 1024px) {
    font-size: 20px;
    padding: 14px 0;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 12px 0;
  }
  
  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonDot = styled.span`
  width: 24px;
  height: 24px;
  background-color: black;
  border-radius: 50%;
  margin-right: 16px;
  display: inline-block;
  
  @media (max-width: 1440px) {
    width: 22px;
    height: 22px;
    margin-right: 15px;
  }
  
  @media (max-width: 1024px) {
    width: 20px;
    height: 20px;
    margin-right: 14px;
  }
  
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
    margin-right: 12px;
  }
`;

const LoadingMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 60px 0;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 40px 0;
  }
`;

const PlatesGridSection = styled.div`
  width: 100%;
  margin: 100px 0 60px;
  
  @media (max-width: 768px) {
    margin: 80px 0 50px;
  }
`;

const PlatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 546px);
  gap: 40px;
  width: 100%;
  justify-content: center;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 400px);
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 320px);
    gap: 40px;
  }
`;

const PlateGridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  width: 546px;
  height: 546px;
  
  @media (max-width: 1440px) {
    width: 480px;
    height: 480px;
  }
  
  @media (max-width: 1024px) {
    width: 400px;
    height: 400px;
  }
  
  @media (max-width: 768px) {
    width: 320px;
    height: 320px;
  }
  
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
  object-fit: cover;
  background-color: white;
  border: 3px solid #ffff00;
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
  
  @media (max-width: 768px) {
    padding: 10% 12%;
  }
`;

const PlateWriter = styled.div`
  color: black;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  margin-bottom: auto;
  margin-top: 6%;
  
  @media (max-width: 1440px) {
    font-size: 19px;
  }
  
  @media (max-width: 1024px) {
    font-size: 18px;
  }
  
  @media (max-width: 768px) {
    font-size: 17px;
    margin-top: 5%;
  }
`;

const PlateMessage = styled.div`
  color: black;
  font-size: 18px;
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
  
  @media (max-width: 1440px) {
    font-size: 17px;
    -webkit-line-clamp: 11;
  }
  
  @media (max-width: 1024px) {
    font-size: 16px;
    -webkit-line-clamp: 10;
  }
  
  @media (max-width: 768px) {
    font-size: 15px;
    -webkit-line-clamp: 8;
  }
`;

const PlateDate = styled.div`
  color: black;
  font-size: 16px;
  text-align: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: 6%;
  
  @media (max-width: 1440px) {
    font-size: 15px;
  }
  
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 5%;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const PageNumber = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 12px 16px;
  background-color: #ffff00;
  border: 2px solid #000;
  font-size: 18px;
  cursor: pointer;
  
  @media (max-width: 1440px) {
    width: 44px;
    height: 44px;
    font-size: 17px;
    margin: 11px 15px;
  }
  
  @media (max-width: 1024px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
    margin: 10px 14px;
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
    margin: 8px 12px;
  }
  
  &.active {
    background-color: #000;
    color: #ffff00;
  }
`;