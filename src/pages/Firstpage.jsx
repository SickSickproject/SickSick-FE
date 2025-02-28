
import { useMediaQuery } from "react-responsive";
const Firstpage = ()=>{

    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });


    return <>
    {isMobile ? <div style={{width:"83%",height:"89%",float:"left"}}>첫페이지</div> :
    <div style={{width:"83%",height:"89%",float:"left"}}>sd</div>
    }
    </>
}

export default Firstpage