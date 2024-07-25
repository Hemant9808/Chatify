import React, { useEffect, useRef } from "react";
interface MessageAreaProps {
  messages: any;
}

const MessageArea: React.FC<MessageAreaProps> = ({ messages }) => {
  const storedUser=localStorage.getItem("user")
  const user = JSON.parse(storedUser || '') 
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
      
     <div className="h-[34.5rem] rounded-2xl overflow-y-auto hide-scrollbar p-4 bg-white w-[100%] ">
      <div className=" hide-scrollbar p-4 bg-white w-[100%] ">
       {messages?.map((message: any, index: any) =>
          message.sender._id === user?._id ? (
            <div  key={index} className="w-[100%]  flex justify-end ">
            <div className="bg-[#fa5807] mb-2  text-md align-right text-white max-w-[80%] h-auto rounded-tl-[2rem] rounded-tr-[2rem] rounded-bl-[2rem] p-3 px-4 ">{message.content}</div>
            </div>) :  (
            <div  key={index} className="w-[100%] flex justify-start ">
            <div  className="bg-[#dfdcda] mb-2 align-left text-md font-semibold text-gray-700 max-w-[80%] h-auto rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[2rem] p-3 px-4">{message.content}</div>
            </div>
          )
        )}
         <div ref={messageEndRef} />
        </div>
     </div>
  );
};

export default MessageArea;
