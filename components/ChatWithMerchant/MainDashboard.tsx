"use client";
import { useState } from "react";
import LeftMainDashBoard from "./LeftDashboard/LeftMainDashBoard";
import RightMainDashBoard from "./RightDashboard/RightMainDashBoard";

type MessageType = {
  sender: string;
  time: string;
  text: string;
};

const MessageFakeData2: MessageType[][] = [
  [
    {
      sender: "Jay Vasani",
      time: "09:30 AM",
      text: "Hey! Are you available for a quick call?",
    },
    {
      sender: "Jay Vasani",
      time: "09:32 AM",
      text: "Need to discuss the client feedback.",
    },
    {
      sender: "Me",
      time: "09:35 AM",
      text: "Sure, give me 5 minutes.",
    },
  ],
  [
    {
      sender: "Alice Johnson",
      time: "10:00 AM",
      text: "Sent the updated report. Check the budget section.",
    },
    {
      sender: "Me",
      time: "10:05 AM",
      text: "Looks good overall. Minor tweaks needed in layout.",
    },
  ],
  [
    {
      sender: "Bob Smith",
      time: "11:10 AM",
      text: "Lunch today?",
    },
    {
      sender: "Me",
      time: "11:12 AM",
      text: "Let’s do 1 PM at the usual place.",
    },
  ],
  [
    {
      sender: "Clara Zhou",
      time: "12:00 PM",
      text: "The UI changes are live now.",
    },
    {
      sender: "Me",
      time: "12:02 PM",
      text: "Great! I’ll review them and let you know.",
    },
  ],
  [
    {
      sender: "David Kim",
      time: "01:20 PM",
      text: "Can you send the onboarding doc to the new intern?",
    },
    {
      sender: "Me",
      time: "01:22 PM",
      text: "On it. Will do in 10 minutes.",
    },
  ],
  [
    {
      sender: "Samantha Lee",
      time: "02:45 PM",
      text: "The client meeting has been rescheduled to tomorrow.",
    },
    {
      sender: "Me",
      time: "02:47 PM",
      text: "Thanks for the heads-up!",
    },
  ],
  [
    {
      sender: "Emily Wang",
      time: "03:15 PM",
      text: "The design team needs your input on the new color scheme.",
    },
    {
      sender: "Me",
      time: "03:20 PM",
      text: "I'll check the mockups and provide feedback by EOD.",
    },
    {
      sender: "Emily Wang",
      time: "03:22 PM",
      text: "Perfect, thanks! We need to finalize this by tomorrow.",
    }
  ],
  [
    {
      sender: "Michael Rodriguez",
      time: "03:45 PM",
      text: "Server deployment completed successfully.",
    },
    {
      sender: "Me",
      time: "03:47 PM",
      text: "Any issues during the process?",
    },
    {
      sender: "Michael Rodriguez",
      time: "03:50 PM",
      text: "All smooth. Performance metrics look good too.",
    }
  ],
  [
    {
      sender: "Sarah Chen",
      time: "04:00 PM",
      text: "Quick question about the API documentation.",
    },
    {
      sender: "Me",
      time: "04:05 PM",
      text: "Sure, what do you need help with?",
    },
    {
      sender: "Sarah Chen",
      time: "04:07 PM",
      text: "The authentication section seems outdated. Should we update it?",
    }
  ],
  [
    {
      sender: "Alex Thompson",
      time: "04:30 PM",
      text: "Marketing team requested some website updates.",
    },
    {
      sender: "Me",
      time: "04:35 PM",
      text: "Send over the details, I'll prioritize it.",
    }
  ],
  [
    {
      sender: "Rachel Kim",
      time: "05:00 PM",
      text: "Weekly report is ready for your review.",
    },
    {
      sender: "Me",
      time: "05:05 PM",
      text: "Thanks Rachel, I'll take a look soon.",
    },
    {
      sender: "Rachel Kim",
      time: "05:07 PM",
      text: "Great! Let me know if any changes are needed.",
    }
  ],
  [
    {
      sender: "Tom Wilson",
      time: "05:30 PM",
      text: "Are we still on for the code review tomorrow?",
    },
    {
      sender: "Me",
      time: "05:32 PM",
      text: "Yes, 10 AM works for me.",
    }
  ]
];


export default function MainDashBoard() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  // Ensure we have valid data
  const currentMessages = selectedIndex !== null ? MessageFakeData2[selectedIndex] : [];

  // Function to handle message input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    console.log("Message:", e.target.value);
  };

  // Function to handle message send
  const handleSend = () => {
    if (message.trim()) {
      // Add the new message to the selected conversation
      const newMessage: MessageType = {
        sender: "Me",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: message,
      };
      MessageFakeData2[selectedIndex!].push(newMessage);
      setMessage("");
    }
  };

  return (
    <div className="flex w-full h-full">
      <LeftMainDashBoard 
        onSelect={setSelectedIndex} 
        conversations={MessageFakeData2}  
      />
      <RightMainDashBoard 
        data={currentMessages}
        onChange={handleChange}
        onSubmit={handleSend}
      />
    </div>
  );
}
