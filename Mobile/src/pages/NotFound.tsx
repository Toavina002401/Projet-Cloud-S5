import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Erreur 404 : L'utilisateur a tenté d'accéder à une route inexistante :",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-crypto-dark p-6">
      <div className="text-center space-y-4 page-transition">
        <h1 className="text-6xl font-bold text-crypto-primary">404</h1>
        <p className="text-xl text-crypto-light/80">
          Oups ! La page que vous cherchez est introuvable.
        </p>
        <Link
          to="/login"
          className="inline-block mt-4 text-crypto-primary hover:text-crypto-secondary transition-colors duration-200"
        >
          Retourner à la page de connexion
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
