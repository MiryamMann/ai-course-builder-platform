import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/redux/store";

const queryClient = new QueryClient();

export const AppProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};
export default AppProviders;