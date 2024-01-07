import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(255, 255, 255, 0.75)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  display: "flex",
  alignItems: "center", // Center the content vertically
  justifyContent: "space-between",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const CloseIconWrapper = styled("div")(() => ({
  right: 15,
  height: "100%",
  position: "absolute",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const SearchBar = () => {
  /**
   * useState
   */
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  /**
   * @returns {void}
   */
  const handleClearInput = () => {
    setKeyword("");
    setResults([]);
  };
  const handleInput = (event) => {
    console.log("Input: ", event.target.value);
    setKeyword(event.target.value);
  };

  /**
   * useEffect
   * Search Location by Keyword
   */
  useEffect(() => {
    const fetchResults = async () => {
      if (keyword.length >= 3) {
        try {
          const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
              params: {
                q: keyword,
                format: "json",
                limit: 5, // Adjust as needed
              },
            },
          );
          console.log("Geocoding: ", response.data);
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching results:", error);
        }
      } else {
        setResults([]);
      }
    };
    fetchResults();
  }, [keyword]);

  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Tìm kiếm địa điểm..."
          inputProps={{ "aria-label": "search" }}
          onChange={(event) => handleInput(event)}
        />
        <CloseIconWrapper onClick={() => handleClearInput()}>
          <ClearIcon />
        </CloseIconWrapper>
      </Search>
      <Demo>
        <List
          style={{ display: results.length === 0 ? "none" : "block" }}
          dense={true}
        >
          {results.map((item) => (
            <ListItem key={item.place_id}>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary={item.display_name} />
            </ListItem>
          ))}
        </List>
      </Demo>
    </Box>
  );
};

export default SearchBar;
