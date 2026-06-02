import { Button } from "@/components/ui/button"; 
import { MdPhone } from "react-icons/md"; 
 
const ContactUsButton = () => { 
  return ( 
    <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-14 pe-6 group transition-all w-fit overflow-hidden cursor-pointer bg-black text-white"> 
      <span className="relative z-10 transition-all duration-500 pr-0"> 
        Contact Us 
      </span> 
      <div className="absolute left-1 w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-500"> 
        <MdPhone size={18} className="text-black" /> 
      </div> 
    </Button> 
  ); 
}; 
 
export default ContactUsButton;