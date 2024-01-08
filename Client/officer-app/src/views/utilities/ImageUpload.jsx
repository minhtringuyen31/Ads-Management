import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Box, Button, IconButton } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import { styled } from "@mui/material/styles";
import { useEffect } from "react";

const Input = styled("input")({
  display: "none",
});

const ImageUpload = forwardRef(({ onUpload, showImages = true }, ref) => {
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const mappedFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...mappedFiles]);
  };

  const handleRemoveImage = (imageToRemove) => {
    setImages(images.filter((image) => image !== imageToRemove));
    URL.revokeObjectURL(imageToRemove.preview); // Free up memory
  };

  const handleRemoveImageByUrl = (imageToRemove) => {
    setImages(images.filter((image) => image.preview !== imageToRemove));
    URL.revokeObjectURL(imageToRemove.preview); // Free up memory
  };
  useImperativeHandle(ref, () => ({
    handleRemoveImageByUrl,
  }));

  useEffect(() => {
    onUpload(images);
    console.log(images);
  }, [images]);

  return (
    <Box
      textAlign="center"
      mt={2}
      style={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <Label htmlFor="raised-button-file">
        <Input
          accept="image/*"
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadOutlinedIcon />}
          style={{
            border: "1px dashed gray",
            width: "6.5rem",
            height: "6.5rem",
          }}
        >
          Upload images
        </Button>
      </Label>
      {showImages && (
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
          {images.map((image, index) => (
            <Box
              key={index}
              position="relative"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px dashed gray",
                borderRadius: "0.25rem",
                width: "6.5rem",
                height: "6.5rem",
              }}
            >
              <img
                src={image.preview}
                alt={`upload-preview-${index}`}
                style={{
                  width: "6rem",
                  height: "6rem",
                  borderRadius: "0.25rem",
                }}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemoveImage(image)}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
});

const Label = styled("label")({
  // Add styles for label if needed
});

export default ImageUpload;
