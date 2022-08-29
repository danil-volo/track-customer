import "./App.css";
import { useCallback, useEffect } from "react";
import { windowClosed, clientAccessed } from "./apis";
import { fnBrowserDetect, isMobile } from "./utils";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const notifyBeforeClose = useCallback(async (e) => {
    e.preventDefault();
    await windowClosed();
    window.close();
  }, []);

  // nofify when the window is closed
  useEffect(() => {
    window.addEventListener("beforeunload", notifyBeforeClose);

    return () => {
      window.removeEventListener("beforeunload", notifyBeforeClose);
    };
  }, [notifyBeforeClose]);

  // Sends client data to the server
  useEffect(() => {
    clientAccessed({
      browser: fnBrowserDetect(),
      language: navigator.languages[0],
      cookieEnabled: navigator.cookieEnabled,
      isMobile: isMobile(),
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  return (
    <Container>
      <Box mt={4}>
        <Button fullWidth variant="contained">
          Purchase
        </Button>
      </Box>
    </Container>
  );
}

export default App;
