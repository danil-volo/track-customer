import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { getClients } from "./apis";

export default function Admin() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then(({ data }) => {
      setClients(data);
    });
  }, []);

  const infos = useMemo(() => {
    return clients.map(
      ({ ip, language, browser, cookieEnabled, isMobile, height, width }) => (
        <TableRow key={ip}>
          <TableCell>{ip}</TableCell>
          <TableCell>{browser}</TableCell>
          <TableCell>{language}</TableCell>
          <TableCell>{cookieEnabled ? "Yes" : "No"}</TableCell>
          <TableCell>{isMobile ? "Yes" : "No"}</TableCell>
          <TableCell>{`${width}x${height}px`}</TableCell>
        </TableRow>
      )
    );
  }, [clients]);

  return (
    <Container>
      <Paper elevation={3}>
        <Box
          mt={6}
          p={8}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4" color="primary">
            Current Clients
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>IP</TableCell>
                <TableCell>Browser</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Cookie Enabled</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Dimension</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{infos}</TableBody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
}
