"use client";

import { api } from "@/trpc/react";
import React, { useState } from "react";

const Test = () => {
  const { mutateAsync } = api.catalog.createProductPictureUrl.useMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file as File);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("Please select an image file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      const cbImageUrl = await mutateAsync({
        name: selectedFile.name,
        type: selectedFile.type,
        base64Data,
      });
      setImageUrl(cbImageUrl);
    };
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
    </div>
  );
};

export default Test;
