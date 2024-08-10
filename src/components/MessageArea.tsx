import React, { useEffect, useRef } from "react";
interface MessageAreaProps {
  messages: any;
  searchTerm:string
}

const MessageArea: React.FC<MessageAreaProps> = ({searchTerm, messages }) => {
  const storedUser=localStorage.getItem("user")
  const user = JSON.parse(storedUser || '') 
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index} style={{ backgroundColor: 'yellow', color: 'black' }}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
     <div className="h-[34.5rem] rounded-2xl overflow-y-auto hide-scrollbar p-4 bg-white w-[100%] ">
      <div className=" hide-scrollbar p-4 bg-white w-[100%] ">
       {messages?.map((message: any, index: any) =>
          message.sender._id === user?._id ? (
            <div  key={index} className="w-[100%]  flex justify-end ">
            <div className="bg-[#fa5807] mb-3  text-md align-right text-white max-w-[60%] h-auto rounded-tl-[2rem] rounded-tr-[2rem] rounded-bl-[2rem] p-3 px-4 "> {highlightText(message.content)}</div>
            </div>) :  (
            <div  key={index} className="w-[100%] flex justify-start ">
            <div  className="bg-[#dfdcda] mb-3 align-left text-md font-semibold text-gray-700 max-w-[60%] h-auto rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[2rem] p-3 px-4"> {highlightText(message.content)}</div>
            </div>
          )
        )}
         <div ref={messageEndRef} />
        </div>
     </div>
  );
};

export default MessageArea;
