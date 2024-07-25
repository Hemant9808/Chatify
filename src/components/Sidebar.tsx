import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-[4%] bg-gray-900 text-white flex flex-col items-center p-4 space-y-6">
      <button>
        <img src="/path-to-icon/mail.svg" alt="Mail" className="w-6 h-6" />
      </button>
      <button>
        <img src="/path-to-icon/chat.svg" alt="Chat" className="w-6 h-6" />
      </button>
      <button>
        <img src="/path-to-icon/trash.svg" alt="Trash" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Sidebar;
