import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";

export const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
};
