import React from "react";
import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageModal = ({
  modalIsOpen,
  closeModal,
  capturedImages,
  selectedImageIndex,
  deleteImage,
  modalHeight,
}) => {
  return (
    <Modal
      className="modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Captured Image Modal"
      style={{
        content: {
          height: modalHeight,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          width: "50%",
          marginLeft: "30%",
          marginTop:"5%"
        },
      }}
    >
      <ImageGallery
        items={capturedImages}
        showPlayButton={false}
        showFullscreenButton={true}
        showNav={true}
        startIndex={selectedImageIndex}
        onThumbnailClick={closeModal}
        renderCustomControls={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: 17,
            }}
          >
            <Button
              className="button"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => deleteImage(selectedImageIndex)}
            />
            <Button
              className="button"
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={closeModal}
            />
          </div>
        )}
      />
    </Modal>
  );
};

export default ImageModal;
