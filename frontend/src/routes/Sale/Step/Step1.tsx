import React, { useState } from "react";
import { Box, Typography, Grid, FormControlLabel, Checkbox } from "@mui/material";

interface Category {
  title: string;
  options: string[];
}

interface Step1Props {
  categories: Category[];
  updateSelectedOptions: (options: string[]) => void;
}

const Step1: React.FC<Step1Props> = ({ categories, updateSelectedOptions }) => {
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    setCheckedOptions((prev) => {
      const newCheckedOptions = prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option];
      updateSelectedOptions(newCheckedOptions); // 부모로 데이터 전달
      return newCheckedOptions;
    });
  };

  return (
    <Box sx={{ textAlign: "left", marginLeft: "19rem", marginRight: "15rem" }}>
      {categories.map((category, index) => (
        <Box key={index} sx={{ marginBottom: "30px" }}>
          <Typography variant="h6" fontWeight="bold">
            {category.title}
          </Typography>
          <Grid container spacing={1} sx={{ marginTop: "5px" }}>
            {category.options.map((option, idx) => (
              <Grid item xs={1} sm={3} key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedOptions.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                  }
                  label={option}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Step1;
