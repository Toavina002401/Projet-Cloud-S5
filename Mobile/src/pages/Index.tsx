const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-crypto-dark text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Bienvenue sur votre application</h1>
        <p className="text-xl text-crypto-primary">
          Commencez à créer votre projet incroyable ici !
        </p>
        <button className="px-6 py-3 bg-crypto-primary text-white font-medium rounded-lg hover:bg-crypto-primary/90 transition">
          Démarrer maintenant
        </button>
      </div>
    </div>
  );
};

export default Index;
