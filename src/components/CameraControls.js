import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

const CameraControls = ({
  zoom,
  handleZoomChange,
  aspectRatio,
  handleAspectRatioChange,
}) => {
  return (
    <div>
      <div style={{ marginLeft: 17, marginTop: 20 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <ZoomInRoundedIcon />
          <label htmlFor="zoom">Zoom:</label>
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <RemoveCircleRoundedIcon />
              <Slider
                aria-label="zoom"
                value={zoom}
                onChange={handleZoomChange}
                step={0.1}
                marks
                min={1}
                max={4}
              />
              <AddCircleRoundedIcon />
            </Stack>
          </Box>
        </Stack>
      </div>
      <Box
        style={{
          marginLeft: 17,
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          justifyContent: "space-between",
          alignItems: "center",
          width: "28%",
        }}
      >
        <Typography variant="h6" color="inherit">
          Select Aspect Ratio
        </Typography>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="aspectRatio">Aspect Ratio:</InputLabel>
          <Select
            labelId="aspectRatio"
            id="aspectRatio"
            value={aspectRatio}
            label="Aspect Ratio:"
            onChange={handleAspectRatioChange}
          >
            <MenuItem value="16:9">16:9</MenuItem>
            <MenuItem value="4:3">4:3</MenuItem>
            <MenuItem value="1:1">1:1</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default CameraControls;
