import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const CameraControls = ({ zoom, handleZoomChange, aspectRatio, handleAspectRatioChange }) => {
  return (
    <div style={{ marginLeft: 17 }}>
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
    </div>
  );
};

export default CameraControls;
