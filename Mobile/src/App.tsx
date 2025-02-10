import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import CryptoList from "./pages/CryptoList";
import DepositWithdraw from "./pages/DepositWithdraw";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

// Créer un composant de mise en page qui inclut BottomNav
const LayoutWithNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
      <BottomNav />
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-crypto-dark overflow-hidden">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              {/* Utiliser le LayoutWithNav pour les routes qui nécessitent BottomNav */}
              <Route
                path="/home"
                element={
                  <LayoutWithNav>
                    <Home />
                  </LayoutWithNav>
                }
              />
              <Route
                path="/user"
                element={
                  <LayoutWithNav>
                    <UserInfo />
                  </LayoutWithNav>
                }
              />
              <Route
                path="/crypto"
                element={
                  <LayoutWithNav>
                    <CryptoList />
                  </LayoutWithNav>
                }
              />
              <Route
                path="/wallet"
                element={
                  <LayoutWithNav>
                    <DepositWithdraw />
                  </LayoutWithNav>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
