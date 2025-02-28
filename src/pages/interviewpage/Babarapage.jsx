import { motion, AnimatePresence } from "framer-motion";

const Babarapage = () =>{
    return <>
    <AnimatePresence>
            {<motion.div
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.3, ease: "easeInOut" }}
             className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
                <div style={{width:"1605px",height:"850px"}}>바바라</div>
            </motion.div>}
    </AnimatePresence>
</>
}

export default Babarapage