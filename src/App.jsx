import {
  Box,
  TextField,
  Container,
  Button,
  Slider,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState(8);
  const [IsNumber, setIsNumber] = useState(false);
  const [IsCharacter, setIsCharacter] = useState(false);

  const handleCharacterChange = (event) => {
    setIsCharacter(event.target.checked);
    console.log("Char : ", event.target.checked);
  };

  const handleNumberChange = (event) => {
    setIsNumber(event.target.checked);
    console.log("number : ", event.target.checked);
  };

  const handleChange = (event, newValue) => {
    setLength(newValue);
  };

  const generatePassword = useCallback(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let characters = letters;

    if (IsCharacter) {
      characters += symbols;
    }

    if (IsNumber) {
      characters += numbers;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  }, [IsCharacter, IsNumber, length]);

  useEffect(() => {
    generatePassword();
  }, [IsCharacter, IsNumber, length]);

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    // alert("Password copied to clipboard!"); // Optional alert
  };

  return (
    <Box sx={{ backgroundColor: "black", height: "100vh", width: "100vw" }}>
      <Box
        sx={{
          height: "10px",
        }}
      />
      <Container
        sx={{
          flexGrow: 1,
          mt: 10,
          width: "50%",
          height: "150px",
          alignContent: "center",
          backgroundColor: "gray",
        }}
      >
        <Grid container>
          <Grid size={8} spacing={0}>
            <TextField
              fullWidth
              label={password}
              id="fullWidth"
              sx={{
                "& .MuiInputBase-input": { color: "white" }, // Text color
                "& .MuiInputLabel-root": { color: "white" }, // Label color
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderRadius: "8px 0 0 8px" }, // Ensure outline follows
                  "& > fieldset": { borderColor: "white" }, // Default border color
                  "&:hover fieldset": { borderColor: "purple" }, // Hover border color
                  "&.Mui-focused fieldset": { borderColor: "orange" }, // Focused border color
                },
              }}
            />
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              onClick={copyToClipboard}
              sx={{
                height: "57px",
                borderRadius: "0px 8px 8px 0px", // No left & bottom radius
                "& fieldset": { borderRadius: "0px 8px 8px 0px" }, // Ensure outline follows
              }}
            >
              Copy
            </Button>
          </Grid>
          <Grid
            size={4}
            sx={{
              mt: 3,
            }}
          >
            <Slider
              value={length}
              onChange={handleChange}
              aria-labelledby="length"
              min={0}
              max={100}
              step={1}
            />
          </Grid>
          <Grid
            size={0.5}
            sx={{
              mt: 3,
            }}
          />
          <Grid
            size={2}
            sx={{
              mt: 3,
            }}
          >
            <Typography variant="button" color="initial">
              Length ({length})
            </Typography>
          </Grid>

          <Grid
            size={2}
            sx={{
              mt: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox checked={IsNumber} onChange={handleNumberChange} />
              }
              label="Number"
              sx={{ color: "black" }} // Label color
            />
          </Grid>
          <Grid
            size={2}
            sx={{
              mt: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={IsCharacter}
                  onChange={handleCharacterChange}
                />
              }
              label="Characters"
              sx={{ color: "black" }} // Label color
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
