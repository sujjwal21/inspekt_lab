import React, { useState, useRef, useCallback, useEffect } from "react";
import Modal from "react-modal";
import CameraControls from "./CameraControls";
import WebcamContainer from "./WebcamContainer";
import Gallery from "./Gallery";
import ImageModal from "./ImageModal";

Modal.setAppElement("#root");
const CameraCapture = () => {
  const webcamRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [frontCamera, setFrontCamera] = useState(true);
  const [capturedImages, setCapturedImages] = useState([]);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalHeight, setModalHeight] = useState(window.innerHeight - 170);

  useEffect(() => {
    const savedImages =
      JSON.parse(localStorage.getItem("capturedImages")) || [];
    setCapturedImages(savedImages);
  }, []);
  const startCamera = () => {
    setCameraStarted(true);
  };
  const handleZoomChange = (event, newValue) => setZoom(newValue);
  const handleAspectRatioChange = (event) => setAspectRatio(event.target.value);

  const switchCamera = () => setFrontCamera(!frontCamera);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  //////////////////////////////////////////////////
  const capture = useCallback(() => {
    const container = webcamRef.current.video;
    const canvas = document.createElement("canvas");

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const zoomedWidth = containerWidth / zoom;
    const zoomedHeight = containerHeight / zoom;
    const offsetX = (containerWidth - zoomedWidth) / 2;
    const offsetY = (containerHeight - zoomedHeight) / 2;

    canvas.width = zoomedWidth;
    canvas.height = zoomedHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      container,
      offsetX,
      offsetY,
      zoomedWidth,
      zoomedHeight,
      0,
      0,
      zoomedWidth,
      zoomedHeight
    );

    const imageSrc = canvas.toDataURL("image/png");

    if (imageSrc) {
      const updatedImages = [...capturedImages, { original: imageSrc }];
      localStorage.setItem("capturedImages", JSON.stringify(updatedImages));
      setCapturedImages(updatedImages);
    } else {
      console.error("Failed to capture image.");
    }
  }, [capturedImages, zoom]);
  const deleteImage = (index) => {
    const updatedImages = [...capturedImages];
    updatedImages.splice(index, 1);
    localStorage.setItem("capturedImages", JSON.stringify(updatedImages));
    setCapturedImages(updatedImages);
  };
  useEffect(() => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex >= capturedImages.length
    ) {
      openModal(0);
    }
  }, [capturedImages.length, selectedImageIndex]);
  const closeModal = () => {
    setSelectedImageIndex(null);
    setModalIsOpen(false);
  };
  useEffect(() => {
    if (capturedImages.length === 0) {
      setModalIsOpen(false);
    }
  }, [capturedImages.length]);
  useEffect(() => {
    const handleResize = () => {
      setModalHeight(window.innerHeight - 170);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {!modalIsOpen ? (
        <>
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
            cameraStarted={cameraStarted}
            startCamera={startCamera}
          />
          <Gallery
            capturedImages={capturedImages}
            openModal={openModal}
            deleteImage={deleteImage}
          />
        </>
      ) : null}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        capturedImages={capturedImages}
        selectedImageIndex={selectedImageIndex}
        deleteImage={deleteImage}
        modalHeight={modalHeight}
      />
    </div>
  );
};

export default CameraCapture;
