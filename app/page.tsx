"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { getSupabase } from "@/utils/getSupabase";
import { useRouter } from "next/navigation";

interface DataRecord {
  created_at: string;
  errorMessage: string;
  id: string;
  messageNumber: string;
  status: string;
  xmlText: string;
}

const TableComponent = ({
  data,
  onRowClick,
}: {
  data: DataRecord[];
  onRowClick: (messageNumber: string) => void;
}) => {
  return (
    <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>XML Text</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Message Number</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Error Message</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((record, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick(record.messageNumber)}
              style={{
                cursor: "pointer",
              }}
            >
              <TableCell>{record.id}</TableCell>
              <TableCell>
                <span style={{ color: "blue", cursor: "pointer" }}>Detail</span>
              </TableCell>
              <TableCell>{record.messageNumber}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>{record.errorMessage}</TableCell>
              <TableCell>
                {new Date(record.created_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const App = () => {
  const router = useRouter();
  const [initData, setInitData] = useState<any>();

  const loadData = async () => {
    const data = await getSupabase();
    setInitData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRowClick = (messageNumber: string) => {
    router.push(`/${messageNumber}`);
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Typography sx={{ color: "black" }} variant="h6" gutterBottom>
        Home
      </Typography>
      {initData && (
        <TableComponent data={initData} onRowClick={handleRowClick} />
      )}
    </Box>
  );
};

export default App;
