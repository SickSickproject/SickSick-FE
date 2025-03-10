import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

const Firstpage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Container>
      <Sidebar>
        <SidebarBtn 
          active={true}
          style={{ borderTop: "none" }}
        >
          식식에 대하여
        </SidebarBtn>
        
        <SidebarBtn 
          active={false}
        >
          고백으로 연결되다
        </SidebarBtn>
        
        <SidebarBtn 
          active={false}
        >
          섭식장애란
        </SidebarBtn>
      </Sidebar>

      <MainContent>
        
      </MainContent>
    </Container>
  );
};

export default Firstpage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 95px;
  left: 0px;
  width: 316px;
  height: calc(100vh - 95px);
  display: flex;
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

const MainContent = styled.div`
  margin-left: 316px;
  width: calc(100% - 316px);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
`;