import React, { useState } from "react";
import Card from "@mui/joy/Card";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/joy/CardContent";
import { IconButton, Typography } from "@mui/material";
import './Gallery.css'; // Assuming you have an external CSS file for styles

const Gallery = ({
  capturedImages = JSON.parse(localStorage.getItem("capturedImages")) || [],
  openModal,
  deleteImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "5px",
        marginLeft: 17,
        marginTop: "25px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5" color="secondary">
        Image Gallery
      </Typography>
      <div className="gallery">
        {capturedImages.map((image, index) => (
          <Card
            sx={{ width: 270 }}
            className="card"
            key={index}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div className="gallery-item">
              <img
                src={image.original}
                alt={`Captured ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: "0.5px dashed #ccc",
                  cursor: "pointer",
                  transition: "transform 0.8s ease",
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => openModal(index)}
              />
            </div>
            <CardContent sx={{ justifyContent: "flex-end" }}>
              <IconButton
                aria-label="delete"
                size="large"
                color="secondary"
                onClick={() => deleteImage(index)}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
