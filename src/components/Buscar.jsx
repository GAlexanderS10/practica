import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    // Aquí puedes implementar la lógica para realizar la búsqueda con el término de búsqueda 'searchTerm'
    console.log('Buscando:', searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Buscar Mascota"
        variant="outlined"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          style: {
            color: '#010E2E', 
          },
        }}
        focused
        style={{
          borderColor: '#010E2E', 
          '&:hover': {
            borderColor: '#010E2E', 
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#010E2E', 
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            backgroundColor: '#010E2E', 
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
