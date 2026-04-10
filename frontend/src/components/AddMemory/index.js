import React, { useState } from 'react';
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Chip,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import './AddMemory.css';

const AddMemory = ({ open, onClose, onMemoryAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    creator: '',
    date: '',
    tags: '',
    selectedFile: null,
  });
  const [tagList, setTagList] = useState([]);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && formData.tags.trim()) {
      e.preventDefault();
      const newTag = formData.tags.trim().replace(/^#/, '');
      if (newTag && !tagList.includes(newTag)) {
        setTagList([...tagList, newTag]);
      }
      setFormData({ ...formData, tags: '' });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTagList(tagList.filter((t) => t !== tagToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, selectedFile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageBase64 = "";
      if (formData.selectedFile) {
        imageBase64 = await fileToBase64(formData.selectedFile);
      }

      const memory = {
        image: imageBase64,
        creator: formData.creator,
        title: formData.title,
        description: formData.message,
        date: formData.date,
        tags: tagList,
      };

      await axios.post("http://localhost:5000/memories", memory);
      handleClear();
      onClose();
      if (onMemoryAdded) onMemoryAdded();
    } catch (err) {
      console.error("Error saving memory:", err);
      alert("Failed to save memory. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({ title: '', message: '', creator: '', date: '', tags: '', selectedFile: null });
    setTagList([]);
    setPreview(null);
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      color: '#e2e8f0',
      fontFamily: '"Inter", sans-serif',
      '& fieldset': { borderColor: '#2d4a7a' },
      '&:hover fieldset': { borderColor: '#4f8ef7' },
      '&.Mui-focused fieldset': { borderColor: '#4f8ef7', borderWidth: '2px' },
    },
    '& .MuiInputLabel-root': {
      color: '#8ba3c7',
      fontFamily: '"Inter", sans-serif',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#4f8ef7',
    },
    '& .MuiOutlinedInput-input::placeholder': {
      color: '#4a6a99',
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(145deg, #0f1e3d 0%, #162138 50%, #0a1628 100%)',
          border: '1px solid rgba(79, 142, 247, 0.25)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(79,142,247,0.08)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(5, 10, 30, 0.85)',
          backdropFilter: 'blur(6px)',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(90deg, rgba(79,142,247,0.12) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(79,142,247,0.15)',
          px: 3,
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PhotoCameraIcon sx={{ color: '#4f8ef7', fontSize: 26 }} />
          <Typography
            sx={{
              fontFamily: '"Dancing Script", cursive',
              fontSize: '1.7rem',
              fontWeight: 700,
              background: 'linear-gradient(90deg, #4f8ef7, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Add a Memory
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: '#8ba3c7',
            '&:hover': { color: '#fff', background: 'rgba(79,142,247,0.15)' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 3, py: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>

         <Box className="upload-box" onClick={() => document.getElementById('memory-file-input').click()}>
            {preview ? (
              <img src={preview} alt="Preview" className="upload-preview" />
            ) : (
              <Box className="upload-placeholder">
                <PhotoCameraIcon sx={{ fontSize: 40, color: '#4f8ef7', mb: 1 }} />
                <Typography sx={{ color: '#8ba3c7', fontSize: '0.9rem', fontFamily: '"Inter", sans-serif' }}>
                  Click to upload a photo
                </Typography>
                <Typography sx={{ color: '#4a6a99', fontSize: '0.75rem', fontFamily: '"Inter", sans-serif', mt: 0.5 }}>
                  PNG, JPG, WEBP supported
                </Typography>
              </Box>
            )}
            <input
              id="memory-file-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Box>

          {/* Creator */}
          <TextField
            id="memory-creator"
            label="Creator"
            name="creator"
            variant="outlined"
            fullWidth
            value={formData.creator}
            onChange={handleChange}
            placeholder="Your name"
            sx={inputStyles}
          />

          {/* Title */}
          <TextField
            id="memory-title"
            label="Memory Title"
            name="title"
            variant="outlined"
            fullWidth
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Give this memory a title..."
            sx={inputStyles}
          />

          {/* Message */}
          <TextField
            id="memory-message"
            label="What's the story?"
            name="message"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe this memory..."
            sx={inputStyles}
          />

          {/* Date */}
          <TextField
            id="memory-date"
            label="Date"
            name="date"
            type="date"
            variant="outlined"
            fullWidth
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={inputStyles}
          />

          {/* Tags */}
          <TextField
            id="memory-tags"
            label="Tags"
            name="tags"
            variant="outlined"
            fullWidth
            value={formData.tags}
            onChange={handleChange}
            onKeyDown={handleTagKeyDown}
            placeholder="Type a tag and press Enter"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalOfferIcon sx={{ color: '#4f8ef7', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            helperText={
              <Typography sx={{ color: '#4a6a99', fontSize: '0.75rem', fontFamily: '"Inter", sans-serif', mt: 0.25 }}>
                Press Enter to add each tag
              </Typography>
            }
            sx={inputStyles}
          />

          {/* Tag chips */}
          {tagList.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tagList.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(79,142,247,0.15)',
                    color: '#4f8ef7',
                    border: '1px solid rgba(79,142,247,0.3)',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.8rem',
                    '& .MuiChip-deleteIcon': { color: '#8ba3c7', '&:hover': { color: '#fff' } },
                  }}
                />
              ))}
            </Box>
          )}
        </DialogContent>

        {/* Actions */}
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 1,
            gap: 1.5,
            borderTop: '1px solid rgba(79,142,247,0.1)',
          }}
        >
          <Button
            id="memory-clear-btn"
            onClick={handleClear}
            variant="outlined"
            sx={{
              color: '#8ba3c7',
              borderColor: '#2d4a7a',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              borderRadius: '8px',
              px: 3,
              textTransform: 'none',
              '&:hover': {
                borderColor: '#4f8ef7',
                color: '#4f8ef7',
                background: 'rgba(79,142,247,0.08)',
              },
            }}
          >
            Clear
          </Button>
          <Button
            id="memory-submit-btn"
            type="submit"
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              color: '#fff',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              borderRadius: '8px',
              px: 4,
              textTransform: 'none',
              fontSize: '0.95rem',
              boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
                boxShadow: '0 6px 25px rgba(37,99,235,0.55)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            ✨ Save Memory
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddMemory;
