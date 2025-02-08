import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const token = await user.getIdToken();
      localStorage.setItem("firebaseToken", token);

      navigate("/home");
    } catch (error: any) {
      toast({
        title: "Error",
        description: getErrorMessage(error.code),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code: string): string => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/user-disabled":
        return "Your account has been disabled.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Incorrect email or password.";
      default:
        return "Error logging in.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 page-transition">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-crypto-primary/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-crypto-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-crypto-light mb-2">Welcome Back</h2>
          <p className="text-crypto-light/60">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-crypto-light/80 mb-1 block">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="crypto-input"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-crypto-light/80 mb-1 block">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="crypto-input"
                placeholder="Enter your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full crypto-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-crypto-light/60 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-crypto-primary hover:text-crypto-secondary">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
