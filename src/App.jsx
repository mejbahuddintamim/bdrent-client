import React from "react";
import { RouterProvider } from "react-router-dom";
import ChatBot from "./Components/ChatBot";
import router from "./Routes/routes";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ChatBot />
    </div>
  );
}

export default App;
