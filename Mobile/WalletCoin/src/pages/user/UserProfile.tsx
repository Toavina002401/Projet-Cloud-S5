import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";

const UserProfile = () => {
  const [image, setImage] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const userName = "John"; // Replace with actual user name
  const userEmail = "john@hotmail.com"; // Replace with actual user email

  const startCamera = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Camera stream:", stream); // Verify the stream
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
      setImageError("Unable to access the camera.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Draw the current video frame to the canvas
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL("image/png");

        // Save the captured image locally
        setImage(imageData);
        setShowModal(false); // Close the modal
      }
    } else {
      setImageError("Error capturing the image.");
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1A1F2C] to-[#111827] p-4">
      <Card className="w-full max-w-md p-8 space-y-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl animate-fade-in">
        <div className="text-center space-y-4">
          <div
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-blue-500/20 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            {image ? (
              <img src={image} alt="User Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-4xl text-white font-bold">👤</span>
            )}
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {userName}
          </h1>
          <p className="text-gray-400 text-lg">{userEmail}</p>
        </div>

        <div className="space-y-4">
          <div className="text-xl text-white">
            <span className="font-bold">Wallet Balance:</span> {walletBalance} ₿
          </div>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Modify or Add Image</h2>
            <div className="space-y-4">
              {!isCameraActive ? (
                <button
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
                  onClick={startCamera}
                >
                  Use Camera
                </button>
              ) : (
                <div>
                  <video ref={videoRef} width="100%" height="auto" autoPlay></video>
                  <button
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-lg mt-4"
                    onClick={captureImage}
                  >
                    Take Photo
                  </button>
                  <button
                    className="w-full py-2 px-4 bg-red-500 text-white rounded-lg mt-2"
                    onClick={stopCamera}
                  >
                    Stop Camera
                  </button>
                </div>
              )}
              {imageError && (
                <p className="text-red-500 text-sm">{imageError}</p>
              )}
              <button
                className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default UserProfile;
