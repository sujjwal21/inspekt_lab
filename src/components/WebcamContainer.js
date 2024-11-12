import React from "react";
import Webcam from "react-webcam";
import Card from "@mui/joy/Card";
import Button from "@mui/material/Button";

const WebcamContainer = ({
  webcamRef,
  frontCamera,
  zoom,
  aspectRatio,
  switchCamera,
  capture,
  startCamera,
  cameraStarted,
}) => {
  return (
    <div>
      {!cameraStarted && (
        <div style={{ marginLeft: 17, marginTop: 25 }}>
          <Button className="button" color="secondary" variant="contained" onClick={startCamera}>
            Start Camera
          </Button>
        </div>
      )}
      {cameraStarted && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 25 
          }}
        >
          <Card sx={{ width: 740 }} className="card">
            <div
              className="webcam-container"
              style={{
                width: "100%",
                height: 0,
                paddingBottom:
                  aspectRatio === "16:9"
                    ? "56.25%"
                    : aspectRatio === "4:3"
                    ? "75%"
                    : "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Webcam
                ref={webcamRef}
                videoConstraints={{
                  facingMode: frontCamera ? "user" : "environment",
                }}
                audio={false}
                screenshotFormat="image/png"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${zoom})`,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Button color="secondary" variant="contained" onClick={switchCamera}>
                {frontCamera
                  ? "Switch to Back Camera"
                  : "Switch to Front Camera"}
              </Button>
              <Button color="secondary" variant="contained" onClick={capture}>
                Capture Image
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WebcamContainer;
