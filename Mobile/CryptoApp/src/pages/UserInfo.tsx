import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, Wallet, Bell, LogOut, X } from "lucide-react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import Camera from "react-camera-pro"; // Assurez-vous que ce module est bien installé

const UserInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef<any>(null); // Référence pour la caméra

  const cld = new Cloudinary({ cloud: { cloudName: 'dwalh5pwm' } });

  const handleLogout = () => {
    console.log("Déconnecté");
    window.location.href = "/login";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const captureImage = () => {
    if (cameraRef.current) {
      cameraRef.current.takePhoto().then((dataUri: string) => {
        // Upload to Cloudinary
        const formData = new FormData();
        formData.append("file", dataUri);
        formData.append("upload_preset", "ml_default"); // Assurez-vous de configurer un preset si nécessaire.

        fetch(`https://api.cloudinary.com/v1_1/dwalh5pwm/image/upload`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            setImageUrl(data.secure_url); // L'URL de l'image téléchargée
            setIsCameraOpen(false); // Ferme la caméra
          })
          .catch((error) => {
            console.error("Erreur lors de l'upload :", error);
          });
      });
    }
  };

  const handleCapture = () => {
    setIsCameraOpen(true);
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4 animate-fadeIn">
      <div className="max-w-md mx-auto space-y-6">

        {/* Profile Header */}
        <Card className="bg-crypto-card border-none p-6 relative">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 cursor-pointer" onClick={toggleModal}>
              {imageUrl ? (
                <img src={imageUrl} alt="Profile" className="h-12 w-12 rounded-full" />
              ) : (
                <User className="h-12 w-12" />
              )}
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-crypto-primary">Premium Member</p>
            </div>
          </div>
        </Card>

        {/* Modale pour la caméra */}
        {isCameraOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-72 relative">
              <button
                onClick={() => setIsCameraOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
              <Camera
                ref={cameraRef} // Assurez-vous de passer une référence à la caméra
                idealFacingMode="user"
                isImageMirror={true}
                isSilentMode={false}
                imageType="image/jpeg"
                imageCompression={0.8}
                isMaxResolution={true}
              />
              <button onClick={captureImage} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Prendre une photo
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="bg-crypto-card border-none hover:bg-crypto-primary/20"
          >
            <Settings className="mr-2" />
            Settings
          </Button>
          <Button
            variant="outline"
            className="bg-crypto-card border-none hover:bg-crypto-primary/20"
          >
            <Bell className="mr-2" />
            Notifications
          </Button>
        </div>

        {/* Account Details */}
        <Card className="bg-crypto-card border-none p-6 space-y-4">
          <h3 className="text-lg font-semibold">Account Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Email</span>
              <span>john.doe@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Member Since</span>
              <span>Jan 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-crypto-primary">Active</span>
            </div>
          </div>
        </Card>

        {/* Portfolio Summary */}
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

        {/* Capture Photo Button */}
        {!isCameraOpen && (
          <Button
            onClick={handleCapture}
            variant="outline"
            className="w-full bg-crypto-primary text-white border-none hover:bg-crypto-primary/90 transition mt-4"
          >
            Ouvrir la caméra
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
