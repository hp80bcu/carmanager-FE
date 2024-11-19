import React from "react";
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { categories } from "../categories";

interface Category {
    title: string;
    options: string[];
  }
  
  interface Step1Props {
    categories: Category[];
  }

const Step1: React.FC<Step1Props> = ({ categories }) => {
  return (
    <Box sx={{ textAlign: "left", marginLeft: "15rem", marginRight: "15rem" }}>
      {categories.map((category, index) => (
        <Box key={index} sx={{ marginBottom: "30px" }}>
          <Typography variant="h6" fontWeight="bold">
            {category.title}
          </Typography>
          <Grid container spacing={1} sx={{ marginTop: "5px" }}>
            {category.options.map((option, idx) => (
              <Grid item xs={1} sm={3} key={idx}>
                <FormControlLabel control={<Checkbox />} label={option} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Step1;
