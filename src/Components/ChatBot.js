import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Configuration } from "openai";
import React, { useState } from "react";
import ChatBotModal from "./Modal/ChatBotModal";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const ChatBot = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const modalHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const message = e.target.message.value;
    const endpoint = "https://api.openai.com/v1/chat/completions";
    const body = {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      max_tokens: 256,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    };

    axios
      .post(endpoint, body, {
        headers: { Authorization: `Bearer ${configuration.apiKey}` },
      })
      .then((res) => {
        setApiResponse([
          ...apiResponse,
          {
            text: message,
            isUser: true,
          },
          {
            text: res.data?.choices[0]?.message?.content,
            isUser: false,
          },
        ]);
        e.target.reset();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log(apiResponse);

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={openModal}
        className="hover:text-gray-100 transition-all bg-gradient-to-r from-sky-400 to-cyan-600 text-white p-4 rounded-full"
      >
        <ChatBubbleOvalLeftIcon className="h-6 w-6" />
      </button>

      <ChatBotModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalHandler={modalHandler}
        apiResponse={apiResponse}
        loading={loading}
      />
    </div>
  );
};

export default ChatBot;
