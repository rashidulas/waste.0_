"use client";
import { useState } from "react";

export default function CSVUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");

      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(`File successfully uploaded: ${result.url}`);
      } else {
        setUploadStatus("Error uploading file.");
      }
    } catch (error) {
      console.error("Error uploading file", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button type="submit">Upload CSV</button>
      <p>{uploadStatus}</p>
    </form>
  );
}
