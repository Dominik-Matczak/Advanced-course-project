import React, { useEffect } from "react";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { useDispatch } from "react-redux";
import { setFilterValue, resetFilters } from "../slices/filterSlice";

const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
const rates = ["Highest → Lowest", "Lowest → Highest"];

const FilterProducts = () => {

  const {filters, filters: {priceFrom, priceTo, category, rate}, filteredProducts} = useFilteredProducts();
  const dispatch = useDispatch();

    const handleSetFilterValue = (key, value) => {
      dispatch(setFilterValue({ key, value }));
  };

  
  return (
    <Box
      className="mt-[30px] flex w-[100%] md:basis-1/3"
      sx={{
        position: 'sticky',
        flexDirection: "column",
        gap: 2,
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxHeight: '80vh'
      }}
    >
      <h2>Filters</h2>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField label="Price from" type="number" variant="outlined" fullWidth value={priceFrom} onChange={(e) => handleSetFilterValue("priceFrom", e.target.value)}/>
        <TextField label="to" type="number" variant="outlined" fullWidth value={priceTo} onChange={(e) => handleSetFilterValue("priceTo", e.target.value)}/>
      </Box>

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select label="Category" value={category} onChange={(e) => handleSetFilterValue("category", e.target.value)}>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Rate</InputLabel>
        <Select label="Rate" value={rate} onChange={(e) => handleSetFilterValue("rate", e.target.value)}>
          {rates.map((rate) => (
            <MenuItem key={rate} value={rate}>
              {rate}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={(e) => dispatch(resetFilters())}>
        Delete filters
      </Button>
    </Box>
  );
};

export default FilterProducts;
