import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";
import { fetchCurrentUser } from "./redux/slices/authSlice";
import { RootState, AppDispatch } from "./redux/store";

// Pages
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import PromptResponse from "./pages/PromptResponse";

const queryClient = new QueryClient();

// קומפוננטת עטיפה שתבצע בדיקה בעת טעינה
const InitApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const token = useSelector((state: RootState) => state.auth.accessToken); // or the correct property name for the token
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  useEffect(() => {
    if (!user && token) {
      dispatch(fetchCurrentUser());
    }
  }, [user, token, dispatch]);

  return (
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
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <InitApp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
console.log('VITE_API_URL =', import.meta.env.VITE_API_URL);
