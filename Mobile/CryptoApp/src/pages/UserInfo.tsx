import { useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"; // Assurez-vous que le chemin vers votre configuration Firebase est correct.
import { useAuth } from "../auth/AuthProvider";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, Wallet, Bell, LogOut, X, Loader2 } from "lucide-react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';

const UserInfo = () => {
  const { user } = useAuth();
  const email = user ? user.email : "Not logged in";
  const memberSince = user ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A";
  const status = user ? "Active" : "Inactive";

  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const IMAGEKIT_PUBLIC_KEY = "public_iGIERvQIqHyYfr1AUkbPC10ByM0=";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("firebaseToken");
      console.log("Déconnecté");
      window.location.href = "/login";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };


  const fetchSignature = async () => {
    try {
      const response = await fetch("http://localhost:3000/generate-signature");
      if (!response.ok) throw new Error("Erreur lors de la récupération de la signature");

      const { signature, timestamp, expire } = await response.json();
      return { signature, timestamp, expire };
    } catch (error) {
      console.error("Erreur de signature :", error);
      throw error;
    }
  };


  const uploadImage = async (file: File | Blob) => {
    try {
      const { signature, timestamp, expire } = await fetchSignature();
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file instanceof File ? file.name : "captured_image.jpg");
      formData.append("publicKey", IMAGEKIT_PUBLIC_KEY);
      formData.append("signature", signature);
      formData.append("expire", expire);
      formData.append("timestamp", timestamp);
  
      setIsUploading(true);
  
      const response = await fetch("http://localhost:3000/upload-proxy", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur inconnue");
      }
  
      const data = await response.json();
      console.log("Upload réussi :", data);
      setImageUrl(data.url || null);
  
      toast({
        title: "Upload réussi",
        description: "L'image a été uploadée avec succès.",
      });
    } catch (error) {
      console.error("Erreur d'upload :", error);
      toast({
        variant: "destructive",
        title: "Erreur d'upload",
        description: "Une erreur s'est produite lors du téléchargement de l'image.",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  
  

  


  const captureImage = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });
  
      if (photo.webPath) {
        const response = await fetch(photo.webPath);
        const blob = await response.blob();
        await uploadImage(blob);
      }
    } catch (error: any) {
      if (error.message === "User cancelled photos app") {
        console.log("L'utilisateur a annulé la capture.");
      } else {
        console.error("Erreur de capture:", error);
        toast({
          variant: "destructive",
          title: "Erreur de caméra",
          description: "Impossible d'accéder à la caméra.",
        });
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      await uploadImage(file);
    }
  };

  const handleCapture = () => {
    setIsCameraOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageError = () => {
    toast({
      variant: "destructive",
      title: "Erreur de chargement",
      description: "L'image de profil n'a pas pu être chargée.",
    });
    setImageUrl(null);
  };





  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-crypto-card border-none p-6 relative">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Avatar
                className="h-20 w-20 cursor-pointer rounded-full border-4 border-crypto-primary transition-transform duration-300 group-hover:scale-105"
                onClick={toggleModal}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="bg-crypto-primary/20 h-full w-full rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-crypto-primary" />
                  </div>
                )}
              </Avatar>
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user ? user.displayName || "John Doe" : "Guest"}</h2>
              <p className="text-crypto-primary">Premium Member</p>
            </div>
          </div>
        </Card>

        {/* Camera Modal */}
        {isCameraOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-80 relative">
              <button
                onClick={() => setIsCameraOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                disabled={isUploading}
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="mt-4 space-y-4">
                <Button
                  onClick={captureImage}
                  className="w-full"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Prendre une photo"
                  )}
                </Button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  Choisir depuis la galerie
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Actions rapides */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bouton pour ouvrir la caméra */}
          {!isCameraOpen && (
            <Button
              onClick={handleCapture}
              variant="outline"
              className="w-full bg-crypto-card border-none hover:bg-crypto-primary/20 flex justify-center items-center"
            >
              Ouvrir la caméra
            </Button>
          )}
          <Button
            variant="outline"
            className="w-full bg-crypto-card border-none hover:bg-crypto-primary/20 flex justify-center items-center"
          >
            <Bell className="mr-2" />
            Notifications
          </Button>
        </div>

        {/* Détails du compte */}
        <Card className="bg-crypto-card border-none p-6 space-y-4">
          <h3 className="text-lg font-semibold">Account Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span>{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Member Since</span>
              <span>{memberSince}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-crypto-primary">{status}</span>
            </div>
          </div>
        </Card>

        {/* Résumé du portfolio */}
        <Card className="bg-crypto-card border-none p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Portfolio Value</h3>
            <Wallet className="text-crypto-primary" />
          </div>
          <div className="text-2xl font-bold text-crypto-primary">$25,468.32</div>
          <p className="text-green-500 text-sm">+2.4% (24h)</p>
        </Card>

        <div className="w-full">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full bg-red-500 text-white border-none hover:bg-red-600 transition"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
