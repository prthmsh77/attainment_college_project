import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [matrix, setMatrix] = useState(
    Array.from({ length: 6 }, () => Array(15).fill(0))
  );
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const columnHeaders = [
    ...Array.from({ length: 12 }, (_, i) => `PO${i + 1}`),
    "PSO1",
    "PSO2",
    "PSO3",
  ];
  const rowHeaders = ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMatrixChange = (params) => {
    const updatedMatrix = [...matrix];
    const rowIndex = params.id;
    const colIndex = parseInt(params.field, 10);
    updatedMatrix[rowIndex][colIndex] = parseFloat(params.value) || 0;
    console.log(updatedMatrix);
    setMatrix(updatedMatrix);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("matrix", JSON.stringify(matrix));

    try {
      const response = await axios.post(
        "https://college-project-server.onrender.com/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOutput(response.data);
    } catch (error) {
      console.error("Error while processing:", error);
      alert("Failed to process the data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const rows = matrix.map((row, rowIndex) => {
    const rowData = {
      id: rowIndex,
      ...Object.fromEntries(row.map((val, i) => [`${i}`, val])),
    };
    return { ...rowData, name: rowHeaders[rowIndex] };
  });

  const columns = [
    { field: "name", headerName: "CO/PO", width: 80 },
    ...columnHeaders.map((header, index) => ({
      field: `${index}`,
      headerName: header,
      width: 70,
      editable: true,
    })),
  ];

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" component="h1">
          CO/PO Calculator
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Upload an Excel file and input the matrix to calculate CO and PO
          values.
        </Typography>
      </Box>

      <Box mb={3}>
        <Button variant="contained" component="label" fullWidth>
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {file && (
          <Typography
            variant="caption"
            display="block"
            mt={1}
            color="textSecondary"
          >
            Selected File: {file.name}
          </Typography>
        )}
      </Box>

      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          CO PO PSO Mapping
        </Typography>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            processRowUpdate={(newRow, oldRow) => {
              const updatedMatrix = [...matrix];
              console.log(newRow, oldRow);
              const rowIndex = newRow.id;
              Object.keys(newRow).forEach((key) => {
                if (key !== "id" && key !== "name") {
                  const colIndex = parseInt(key, 10);
                  updatedMatrix[rowIndex][colIndex] =
                    parseFloat(newRow[key]) || 0;
                }
              });
              setMatrix(updatedMatrix);
              console.log(updatedMatrix);
              return newRow;
            }}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            sx={{
              "& .MuiDataGrid-cell": { padding: "4px", fontSize: "0.8rem" },
              "& .MuiDataGrid-columnHeader": {
                fontSize: "0.9rem",
                padding: "4px",
              },
            }}
          />
        </div>
      </Box>

      <Box mb={3} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Calculate"}
        </Button>
      </Box>

      {output && output.co_values && output.po_values && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Results
          </Typography>
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom>
              CO Values
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {Object.keys(output.co_values).map((key) => (
                      <TableCell align="center" key={key}>
                        {key}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {Object.values(output.co_values).map((value, index) => (
                      <TableCell align="center" key={`co_value_${index}`}>
                        {value ? value.toFixed(3) : "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              PO Values
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {columnHeaders.map((header) => (
                      <TableCell align="center" key={header}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {columnHeaders.map((header) => (
                      <TableCell align="center" key={`${header}_value`}>
                        {output.po_values[header]?.toFixed(3) || "N/A"}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default App;
