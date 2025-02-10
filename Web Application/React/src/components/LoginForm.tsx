import { useState,useEffect } from "react";
import Button from "./common/Button";
import Card from "./common/Card";
import { Link,useNavigate  } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../services/LoginService";
import loadingAnimation from "../../dist/assets/images/load.json";
import lottie from "lottie-web";

const LoginForm = () => {
  const [email, setEmail] = useState("john.doe@company.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      lottie.loadAnimation({
        container: document.getElementById("loading-animation")!,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
      });
    }
  }, [isLoading]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(email, password);
      if (response.status =="erreur") {
        Swal.fire({
          title: "Erreur de connexion",
          text: response.error || "Email ou mot de passe incorrect",
          icon: "error",
        });
      }else{
        // Stocker les informations de session
        const { utilisateur, session } = response.data.data;
        localStorage.setItem("user", JSON.stringify(utilisateur));
        localStorage.setItem("token", session.token);

        Swal.fire({
          title: "Connexion réussie!",
          text: "Bienvenue sur la plateforme!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/home");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Erreur de connexion",
        text: error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    tailleForm: {
      padding: "3rem",
      width: "40rem",
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card variant="glass" style={styles.tailleForm}>
        {isLoading ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Traitement en cours</h1>
              <p className="text-muted-foreground">
                Nous vérifions vos informations, cela ne prendra qu’un instant...
              </p>
            </div>
            <div className="flex justify-center">
              <div id="loading-animation" style={{ width: 150, height: 150 }}></div>
            </div>
            <p className="text-center mt-6 text-sm text-muted-foreground">
              IT Université Andoharanofotsy
            </p>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Connexion à la cryptomonnaie</h1>
              <p className="text-muted-foreground">
                Entrez vos identifiants pour accéder à votre compte
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                  placeholder="Entrez votre email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
              <Button className="w-full" size="lg">
                Se connecter
              </Button>
            </form>
            <p className="text-center mt-6 text-sm text-muted-foreground">
              Je n'ai pas de compte?{" "}
              {/* Utilisation de Link pour rediriger vers la page d'inscription */}
              <Link to="/register" className="text-crypto-primary hover:underline">
                S'inscrire
              </Link>
            </p>
          </>
        )}
      </Card>
    </div>
  );
};

export default LoginForm;