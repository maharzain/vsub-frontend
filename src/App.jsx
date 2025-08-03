import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import Pricing from "./pages/Pricing";

import Brain from "./pages/Brain";
import FakeText from "./pages/FakeText";
import AiVideo from "./pages/AiVideo";
import Quiz from "./pages/Quiz";
import Split from "./pages/Split";
import Story from "./pages/Story";
import Reddit from "./pages/Reddit";
import Captions from "./pages/Captions";
import Wyr from "./pages/Wyr";

// Import Toaster from react-hot-toast
import { Toaster } from "react-hot-toast";

import "./App.css";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import Editor from "./pages/Editor";
import NotFound from "./NotFound";
import api from "./constants/api"


function App() {
  return (
    <Router>
      {/* Global Toaster with custom styles */}
      <Toaster
        toastOptions={{
          style: {
            background: "#1a1325", // Default background color
            color: "#ffffff", // Default text color
          },
          success: {
            icon: "✅",
            style: {
              background: "#242838", // Success background
              color: "#b2b8cd", // Success text color
            },
          },
          error: {
            icon: <IconInfoCircleFilled size={20} className="text-[#d89614]" />,
            style: {
              background: "#242838", // Error background
              color: "#b2b8cd", // Error text color
            },
          },
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout footer={true} />}>
          <Route index element={<Home />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>

        <Route path="/workspace" element={<Layout footer={false} />}>
          <Route index element={<Workspace />} />
          <Route path="brain" element={<Brain />} />
          <Route path="fake-texts" element={<FakeText />} />
          <Route path="ai-videos" element={<AiVideo />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="split" element={<Split />} />
          <Route path="story" element={<Story />} />
          <Route path="reddit" element={<Reddit />} />
          <Route path="captions" element={<Captions />} />
          <Route path="wyr" element={<Wyr />} />
          <Route path="editor/:unique_key" element={<Editor />} />
        </Route>

        {/* 404 - Content Not Found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
