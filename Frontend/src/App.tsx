
import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './redux/store';

// Pages
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PromptResponse  from './pages/PromptResponse'; // Update the path or casing if needed, e.g. './pages/PromptRespond', './pages/Promptrespond', or './pages/Promptrespond.tsx'

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/prompt-response" element={<PromptResponse response="" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
