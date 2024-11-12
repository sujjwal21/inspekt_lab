import React from 'react';
import Card from '@mui/joy/Card';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Gallery = ({ capturedImages, openModal, deleteImage }) => {
  return (
    <div className="gallery">
      {capturedImages.map((image, index) => (
        <Card sx={{ width: 270 }} className="card" key={index}>
          <div className="gallery-item">
            <img
              src={image.original}
              alt={`Captured ${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => openModal(index)}
            />
          </div>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => deleteImage(index)}
          />
        </Card>
      ))}
    </div>
  );
};

export default Gallery;
