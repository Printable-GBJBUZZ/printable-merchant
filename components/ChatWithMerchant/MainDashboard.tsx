"use client";

import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import LeftMainDashBoard from "./LeftDashboard/LeftMainDashBoard";
import RightMainDashBoard from "./RightDashboard/RightMainDashBoard";
import { useUser } from "@clerk/nextjs";

export type MessageType = {
  id: string;
  role: "merchant";
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
  timestamp: string;
};

type Conversation = {
  id: string;
  name: string;
  lastMessage?: {
    text: string;
    time: string;
  };
  lastMessageTime: string;
};

export default function MainDashBoard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(
    null
  ); // Changed from selectedIndex to selectedPartnerId
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageInput, setMessageInput] = useState("");

  const { user } = useUser();
  const currentMerchantId = user?.id ?? null;

  const selectedPartnerIdRef = useRef<string | null>(null);

  useEffect(() => {
    selectedPartnerIdRef.current = selectedPartnerId;
  }, [selectedPartnerId]);

  useEffect(() => {
    if (!currentMerchantId) return;
    const fetchConversations = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/chat/partners?userId=${currentMerchantId}`
        );
        const partners = await res.json();
        const enriched = await Promise.all(
          partners.map(async (partner: any) => {
            const infoRes = await fetch(
              `http://localhost:5000/api/chat/partner-info?userId=${currentMerchantId}&partnerId=${partner.partnerId}`
            );
            const info = await infoRes.json();
            return {
              id: partner.partnerId,
              name: info.data.name || `${partner.partnerId.slice(0, 8)}...`,
              lastMessage: partner.lastMessage
                ? {
                    text: partner.lastMessage,
                    time: new Date(
                      partner.lastMessageTime ?? Date.now()
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  }
                : undefined,
              lastMessageTime:
                partner.lastMessageTime || new Date().toISOString(),
            };
          })
        );

        // Sort conversations by lastMessageTime (newest first)
        const sortedConversations = enriched.sort(
          (a, b) =>
            new Date(b.lastMessageTime).getTime() -
            new Date(a.lastMessageTime).getTime()
        );

        setConversations(sortedConversations);
      } catch (err) {
        console.error("❌ Failed to fetch conversations:", err);
      }
    };
    fetchConversations();
  }, [currentMerchantId]);

  useEffect(() => {
    if (!selectedPartnerId || !currentMerchantId) {
      setMessages([]);
      return;
    }
    fetch(
      `http://localhost:5000/api/chat/conversation?userA=${currentMerchantId}&userB=${selectedPartnerId}`
    )
      .then((r) => r.json())
      .then((arr) => setMessages(arr))
      .catch(() => setMessages([]));
  }, [selectedPartnerId, currentMerchantId]);

  useEffect(() => {
    if (!currentMerchantId) return;

    const pusher = new Pusher("7e1f499e8a4730060fd6", {
      cluster: "ap2",
      forceTLS: true,
    });

    const merchantChannel = pusher.subscribe(`merchant-${currentMerchantId}`);
    const chatChannel = pusher.subscribe(`chat-userid-${currentMerchantId}`);

    const handleNewMessage = (eventData: any) => {
      console.log("🔥 RAW EVENT DATA:", eventData);

      let newMessage: MessageType;

      if (eventData.type === "message" && eventData.data) {
        newMessage = eventData.data;
      } else if (eventData.data) {
        newMessage = eventData.data;
      } else {
        newMessage = eventData;
      }

      console.group(
        `[PUSHER DEBUG] Merchant (${currentMerchantId}) received a message:`
      );
      console.log("Processed message:", newMessage);
      console.log(
        "Current open chat partner (ref):",
        selectedPartnerIdRef.current
      );

      // Update conversations and sort by latest message
      const partnerId =
        newMessage.senderId === currentMerchantId
          ? newMessage.receiverId
          : newMessage.senderId;

      setConversations((prev) => {
        const newTime = new Date(newMessage.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let partnerExists = false;
        const updatedConvos = prev.map((conv) => {
          if (conv.id === partnerId) {
            partnerExists = true;
            return {
              ...conv,
              lastMessage: { text: newMessage.message, time: newTime },
              lastMessageTime: newMessage.timestamp,
            };
          }
          return conv;
        });
        if (!partnerExists) {
          updatedConvos.push({
            id: partnerId,
            name: `${partnerId.slice(0, 8)}...`,
            lastMessage: { text: newMessage.message, time: newTime },
            lastMessageTime: newMessage.timestamp,
          });
        }

        // Sort conversations by lastMessageTime (newest first)
        return updatedConvos.sort(
          (a, b) =>
            new Date(b.lastMessageTime).getTime() -
            new Date(a.lastMessageTime).getTime()
        );
      });

      // Check if message is relevant to current open chat
      const isMessageForCurrentChat =
        (newMessage.senderId === selectedPartnerIdRef.current &&
          newMessage.receiverId === currentMerchantId) ||
        (newMessage.senderId === currentMerchantId &&
          newMessage.receiverId === selectedPartnerIdRef.current);

      console.log(
        "Is this message for the open chat?",
        isMessageForCurrentChat
      );
      console.log("Message sender:", newMessage.senderId);
      console.log("Message receiver:", newMessage.receiverId);
      console.log("Current merchant:", currentMerchantId);
      console.log("Selected partner:", selectedPartnerIdRef.current);
      console.groupEnd();

      if (
        isMessageForCurrentChat &&
        newMessage.senderId !== currentMerchantId
      ) {
        console.log("✅ Adding message to current chat");
        setMessages((prev) => {
          const exists = prev.some(
            (msg) =>
              msg.id === newMessage.id ||
              (msg.message === newMessage.message &&
                Math.abs(
                  new Date(msg.timestamp).getTime() -
                    new Date(newMessage.timestamp).getTime()
                ) < 1000)
          );
          if (exists) {
            console.log("⚠️ Message already exists, skipping");
            return prev;
          }
          console.log("📝 Adding new message to chat");
          return [...prev, newMessage];
        });
      } else {
        console.log("❌ Message not added to current chat", {
          isMessageForCurrentChat,
          isFromCurrentMerchant: newMessage.senderId === currentMerchantId,
        });
      }
    };

    merchantChannel.bind("chat", handleNewMessage);
    merchantChannel.bind("message", handleNewMessage);
    merchantChannel.bind("new-message", handleNewMessage);

    chatChannel.bind("chat", handleNewMessage);
    chatChannel.bind("message", handleNewMessage);
    chatChannel.bind("new-message", handleNewMessage);

    console.log(
      `🔌 Merchant subscribed to channels: merchant-${currentMerchantId} and chat-userid-${currentMerchantId}`
    );

    return () => {
      pusher.unsubscribe(`merchant-${currentMerchantId}`);
      pusher.unsubscribe(`chat-userid-${currentMerchantId}`);
      pusher.disconnect();
    };
  }, [currentMerchantId]);

  const handleSend = async () => {
    if (!messageInput.trim() || !selectedPartnerId || !currentMerchantId)
      return;

    const optimisticMessage: MessageType = {
      id: `tmp-${Date.now()}`,
      senderId: currentMerchantId,
      receiverId: selectedPartnerId,
      message: messageInput.trim(),
      isRead: false,
      role: "merchant",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    const messageToSend = messageInput.trim();
    setMessageInput("");

    // Update conversations list optimistically when sending
    setConversations((prev) => {
      const updatedConversations = prev.map((conv) => {
        if (conv.id === selectedPartnerId) {
          return {
            ...conv,
            lastMessage: {
              text: messageToSend,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
            lastMessageTime: new Date().toISOString(),
          };
        }
        return conv;
      });

      // Sort conversations by lastMessageTime (newest first)
      return updatedConversations.sort(
        (a, b) =>
          new Date(b.lastMessageTime).getTime() -
          new Date(a.lastMessageTime).getTime()
      );
    });

    try {
      await fetch("http://localhost:5000/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: currentMerchantId,
          receiverId: selectedPartnerId,
          message: messageToSend,
        }),
      });
    } catch (err) {
      console.error("❌ Failed to send message:", err);
    }
  };

  // Helper function to find selected conversation
  const getSelectedConversation = () => {
    return conversations.find((conv) => conv.id === selectedPartnerId) || null;
  };

  return (
    <div className="flex w-full h-full">
      <LeftMainDashBoard
        conversations={conversations}
        selectedPartnerId={selectedPartnerId} // Pass selected partner ID
        onSelect={(partnerId) => setSelectedPartnerId(partnerId)} // Changed to pass partnerId directly
      />
      <RightMainDashBoard
        data={messages}
        currentUserId={currentMerchantId}
        message={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onSubmit={handleSend}
        conversation={getSelectedConversation()}
      />
    </div>
  );
}
