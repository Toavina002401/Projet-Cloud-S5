const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const multer = require("multer");
const FormData = require("form-data");
const crypto = require("crypto"); // Pour la génération de signature

const upload = multer();
const app = express();

app.use(cors({
    origin: '*',
  }));
  

// Configuration ImageKit
const IMAGEKIT_PUBLIC_KEY = "public_iGIERvQIqHyYfr1AUkbPC10ByM0="; 
const IMAGEKIT_PRIVATE_KEY = "private_uFfpt+cIPX2qWvofJcdrLyhHL6c="; // Remplacez par votre clé privée ImageKit

// Endpoint pour générer la signature
app.get("/generate-signature", (req, res) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000); // Timestamp en secondes
    const expire = timestamp + 60 * 60; // Expiration dans 1 heure
    const signature = crypto
      .createHmac("sha1", IMAGEKIT_PRIVATE_KEY)
      .update(`${timestamp}`)
      .digest("hex");

    res.json({ signature, timestamp, expire });
  } catch (error) {
    console.error("Erreur lors de la génération de la signature :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

// Endpoint pour l'upload proxy
app.post("/upload-proxy", upload.single("file"), async (req, res) => {
  try {
    console.log("Fichier reçu via multer :", req.file);
    console.log("Données supplémentaires :", req.body);

    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier fourni." });
    }

    const { publicKey, signature, expire, timestamp } = req.body;
    const fileBuffer = req.file.buffer;
    const fileName = req.body.fileName || req.file.originalname || "default_name.jpg";

    const formData = new FormData();
    formData.append("file", fileBuffer, fileName); // Nom du fichier
    formData.append("fileName", fileName);
    formData.append("publicKey", publicKey);
    formData.append("signature", signature);
    formData.append("expire", expire);
    formData.append("timestamp", timestamp);

    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
        headers: {
          ...formData.getHeaders(),
          Authorization: `Basic ${Buffer.from(IMAGEKIT_PUBLIC_KEY + ":" + IMAGEKIT_PRIVATE_KEY).toString("base64")}`, // Utilisation uniquement de Basic Auth
        },
      });
      
      
      
      

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Réponse d'ImageKit :", response.status, errorText); // Ajout de logs
        throw new Error(`Erreur d'upload : ${errorText}`);
      }
      

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erreur dans le proxy :", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
