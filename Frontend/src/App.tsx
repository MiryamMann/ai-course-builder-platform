// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AppProviders } from "@/components/providers/AppProviders";
import { AuthInit } from "./hooks/AuthInit";

// Pages
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PromptResponse from "./pages/PromptResponse";

const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <AuthInit />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/response/:id" element={<PromptResponse />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;
