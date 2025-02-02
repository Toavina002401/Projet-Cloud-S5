import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transaction";
import Analyse from "./pages/Alea1";
import Modifier from "./pages/Alea2";
import Tableau from "./pages/Alea3";
import Crypto from "./pages/Alea4-V4";

// NotFound Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transaction" element={<Transactions />} />
          <Route path="/analyseCrypto" element={<Analyse />} />
          <Route path="/modifCommission" element={<Modifier />} />
          <Route path="/tableau" element={<Tableau />} />
          <Route path="/cryptoFavoris" element={<Crypto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;