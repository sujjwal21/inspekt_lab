import React, { useState, useRef, useCallback } from 'react';
import CameraControls from './CameraControls';
import WebcamContainer from './WebcamContainer';
import Gallery from './Gallery';
import ImageModal from './ImageModal';

const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [frontCamera, setFrontCamera] = useState(true);
  const [capturedImages, setCapturedImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleZoomChange = (event, newValue) => setZoom(newValue);
  const handleAspectRatioChange = (event) => setAspectRatio(event.target.value);

  const switchCamera = () => setFrontCamera(!frontCamera);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImages([...capturedImages, { original: imageSrc, thumbnail: imageSrc }]);
    }
  }, [capturedImages]);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const deleteImage = (index) => {
    setCapturedImages(capturedImages.filter((_, i) => i !== index));
    if (index === selectedImageIndex) closeModal();
  };

  return (
    <div>
      <CameraControls
        zoom={zoom}
        handleZoomChange={handleZoomChange}
        aspectRatio={aspectRatio}
        handleAspectRatioChange={handleAspectRatioChange}
      />
      <WebcamContainer
        webcamRef={webcamRef}
        frontCamera={frontCamera}
        zoom={zoom}
        aspectRatio={aspectRatio}
        switchCamera={switchCamera}
        capture={capture}
      />
      <Gallery capturedImages={capturedImages} openModal={openModal} deleteImage={deleteImage} />
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        capturedImages={capturedImages}
        selectedImageIndex={selectedImageIndex}
        deleteImage={deleteImage}
      />
    </div>
  );
};

export default CameraCapture;
