import { useState,useEffect } from "react";
import Button from "./common/Button";
import Card from "./common/Card";
import { Link,useNavigate } from "react-router-dom";
import loadingAnimation from "../../dist/assets/images/load.json";
import lottie from "lottie-web";
import Swal from "sweetalert2";
import { inscription,validationPin } from "../services/RegisterService";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (password != confirmPassword) {
      Swal.fire({
        title: "Erreur de saisie",
        text: "Les deux mots de passe doivent être identiques.",
        icon: "error"
      });
    }else{
      setIsLoading(true);
      try {
        const response = await inscription(username,email, password);
        if (response.status =="erreur") {
          Swal.fire({
            title: "Échec de l'inscription",
            text: response.error || "Problème lors de l'inscription",
            icon: "error",
          });
        }else{
          const { value: codePin } = await Swal.fire({
            title: "Vérification de votre identité",
            html: `
            <div style="text-align: center;">
              <p style="font-size: 14px; color: #555; margin-bottom: 15px;">Veuillez entrer le code PIN à 6 chiffres envoyé à votre email.</p>
              <div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 10px;">
                <input type="text" id="codePin1" maxlength="1" class="pin-input" style="width: 40px; height: 40px; text-align: center; border-radius: 5px; border: 1px solid #ccc; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-size: 18px;" />
                <input type="text" id="codePin2" maxlength="1" class="pin-input" style="width: 40px; height: 40px; text-align: center; border-radius: 5px; border: 1px solid #ccc; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-size: 18px;" />
                <input type="text" id="codePin3" maxlength="1" class="pin-input" style="width: 40px; height: 40px; text-align: center; border-radius: 5px; border: 1px solid #ccc; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-size: 18px;" />
                <input type="text" id="codePin4" maxlength="1" class="pin-input" style="width: 40px; height: 40px; text-align: center; border-radius: 5px; border: 1px solid #ccc; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-size: 18px;" />
                <input type="text" id="codePin5" maxlength="1" class="pin-input" style="width: 40px; height: 40px; text-align: center; border-radius: 5px; border: 1px solid #ccc; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-size: 18px;" />
                <input type="text" id="codePin6" maxlength="1" class="pin-input" style="width: 40px; height: 40px; text-align: center; border-radius: 5px; border: 1px solid #ccc; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-size: 18px;" />
              </div>
              <div style="font-size: 14px; text-align: center;" id="countdown"></div>
            </div>
          `,
            focusConfirm: false,
            preConfirm: () => {
              const pin = Array.from({ length: 6 }, (_, i) => {
                const inputElement = document.getElementById(`codePin${i + 1}`) as HTMLInputElement;
                return inputElement.value;
              }).join("");
              if (pin.length !== 6) {
                Swal.showValidationMessage("Veuillez entrer un code PIN de 6 chiffres.");
                return false;
              }
              return pin;
            },
            timer: 90000,
            timerProgressBar: true,
            willOpen: () => {
              // Initialiser le compte à rebours dès que le Swal s'ouvre
              let countdown = 90; // 90 secondes
              const countdownInterval = setInterval(() => {
                if (countdown <= 0) {
                  Swal.fire({
                    title: "Code PIN expiré",
                    text: "Le délai de saisie du code PIN a expiré. Veuillez réessayer.",
                    icon: "error",
                  });
                  clearInterval(countdownInterval); // Arrêter le compte à rebours
                } else {
                  // Mettre à jour le texte du compte à rebours dans le Swal
                  document.getElementById('countdown').textContent = `Temps restant : ${countdown}s`;
                  countdown--; // Décrémenter le compte à rebours
                }
              }, 1000); // Mettre à jour chaque seconde (1000ms)

              // Ajouter un événement pour stopper le compte à rebours si l'utilisateur valide le code
              Swal.getConfirmButton().addEventListener('click', () => {
                clearInterval(countdownInterval); // Arrêter le compte à rebours
              });
            },
            confirmButtonText: "Valider"
          });
          
          // Si l'utilisateur entre un code PIN
          if (codePin) {
            try {
              const validationResponse = await validationPin(email,codePin);
              if (validationResponse.status =="erreur") {
                Swal.fire({
                  title: "Échec de la validation",
                  text: validationResponse.error || "Code Pin invalide",
                  icon: "error",
                });
              }else{
                Swal.fire({
                  title: "Inscription réussie!",
                  text: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                }).then(() => {
                  navigate("/");
                });
              }
            } catch (error) {
              Swal.fire({
                title: "La validation du code PIN a échoué",
                text: error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
                icon: "error",
              });
            }
          }
          
        }
      } catch (error) {
        Swal.fire({
          title: "L'inscription a échoué",
          text: error.response?.data?.message || "Une erreur est survenue. Veuillez réessayer.",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const styles = {
    tailleForm: {
      padding: "3rem",
      width: "35rem",
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
                L'email et le code PIN sont en cours de traitement, cela ne prendra qu’un instant...
              </p>
            </div>
            <div className="flex justify-center">
              <div id="loading-animation" style={{ width: 100, height: 100 }}></div>
            </div>
            <p className="text-center mt-6 text-sm text-muted-foreground">
              IT Université Andoharanofotsy
            </p>
          </>
        ) : (
          <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Créer un compte</h1>
            <p className="text-muted-foreground">
              Inscrivez-vous pour commencer avec votre compte
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">             
                Nom d'utilisateur
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                placeholder="Entrez votre nom d'utilisateur"
                required
              />
            </div>
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
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmez le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-crypto-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-crypto-primary"
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>
            <Button className="w-full" size="lg">
              S'inscrire
            </Button>
          </form>
          <p className="text-center mt-6 text-sm text-muted-foreground">
            Vous avez déjà un compte?{" "}
            <Link to="/" className="text-crypto-primary hover:underline">
              Se connecter
            </Link>
          </p>
          </>
        )}
      </Card>
    </div>
  );
};

export default RegisterForm;