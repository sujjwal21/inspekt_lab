import React from 'react';
import Modal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const ImageModal = ({ modalIsOpen, closeModal, capturedImages, selectedImageIndex, deleteImage }) => {
  return (
    <Modal
      className="modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Captured Image Modal"
      style={{
        content: {
          height: window.innerHeight - 170,
          justifyContent: 'center',
          width: '50%',
          marginLeft: '25%',
        },
      }}
    >
      <ImageGallery
        items={capturedImages}
        showPlayButton={false}
        showFullscreenButton={false}
        showNav={true}
        startIndex={selectedImageIndex}
        renderCustomControls={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: 17 }}>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteImage(selectedImageIndex)} />
            <Button variant="outlined" startIcon={<CloseIcon />} onClick={closeModal} />
          </div>
        )}
      />
    </Modal>
  );
};

export default ImageModal;
