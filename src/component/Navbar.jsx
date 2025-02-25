import styled from "styled-components";

const Navbar = ()=>{
    return <Header></Header>
}

export default Navbar


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem 0.2rem 1.5rem;
  height: 4.5rem;
  background-color: red;
  border-bottom: 1px solid #e6e6e6;

  position: sticky;
  top: 0;
  z-index: 9999;
`;