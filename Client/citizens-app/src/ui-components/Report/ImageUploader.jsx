import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const selectedImage = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(selectedImage);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>

      {image && (
        <div>
          <h4>Preview:</h4>
          <img src={image} alt="Preview" style={previewStyle} />
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const previewStyle = {
  maxWidth: "100%",
  maxHeight: "300px",
  marginTop: "10px",
};

export default ImageUploader;
