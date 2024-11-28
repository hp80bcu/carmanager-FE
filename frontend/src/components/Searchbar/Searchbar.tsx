import React, { useState } from "react";
import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    const url = new URL("http://localhost:8080/sells/");
    url.searchParams.append("model", searchTerm);
    // 검색어를 이용한 실제 검색 로직 수행
    onSearch(searchTerm);
    console.log("검색어:", searchTerm);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem"
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "0px 4px",
          display: "flex",
          alignItems: "center",
          width: "100vw",
          marginLeft: "20rem",
          marginRight: "15rem",
          boxShadow: "none",
          border: "1px solid #D9D9D9",
          borderRadius: "10px",
          backgroundColor: "#fffff",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchBar;