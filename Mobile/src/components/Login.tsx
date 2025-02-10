import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Eye, EyeOff } from "react-feather";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("john.doe@company.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const token = await user.getIdToken();
      const idUser = await user.uid;
      sessionStorage.setItem("firebaseUser", JSON.stringify({ token, idUser }));

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
          <h2 className="text-3xl font-bold text-crypto-light mb-2">Bienvenue</h2>
          <p className="text-crypto-light/60">Entrez vos identifiants pour accéder à votre compte</p>
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
                placeholder="Entrez votre email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-crypto-light/80 mb-1 block">
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"} // Changez le type en fonction de l'état
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="crypto-input pr-12" // Augmenter un peu le padding droit pour l'icône
                placeholder="Entrez votre mot de passe"
              />
              <br />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2" // Centrer verticalement
                onClick={() => setShowPassword(!showPassword)} // Inversez l'état de showPassword
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} style={{ position: "relative", top: "12px", left: "-30px" }}/>}
              </button>
            </div>
            <Button
              type="submit"
              className="w-full crypto-button"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;