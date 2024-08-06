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
  Breadcrumbs,
  Link,
  Typography,
  Box,
} from "@mui/material";
import { xml2json } from "@/utils/xml2json";
import { getSupabase } from "@/utils/getSupabase";
import { useRouter } from "next/navigation";

// Interface for KeyValuePair
interface KeyValuePair {
  tag: string;
  value: any;
  description: string;
  number: number;
}

const renderObject = (obj: any, breadcrumb: string[] = []): KeyValuePair[] => {
  let keyValuePairs: KeyValuePair[] = [];
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (
      (!Array.isArray(obj) && typeof value === "object") ||
      Array.isArray(value)
    ) {
      keyValuePairs.push({
        tag: `${key}`,
        value,
        description: "", // Add descriptions as needed
        number: breadcrumb.length - 1,
      });
    } else if (Array.isArray(obj)) {
      keyValuePairs.push({
        tag: `${breadcrumb[breadcrumb.length - 1]} [${key}]`,
        value: value,
        description: "", // Add descriptions as needed
        number: breadcrumb.length - 1,
      });
    } else {
      keyValuePairs.push({
        tag: `${key}`,
        value: String(value),
        description: "", // Add descriptions as needed
        number: breadcrumb.length,
      });
    }
  });
  return keyValuePairs;
};

const TableComponent: React.FC<{
  data: any;
  breadcrumb: string[];
  onRowClick?: (key: string, value: any) => void;
}> = ({ data, breadcrumb, onRowClick }) => {
  const handleClick = (key: string, value: any) => {
    if (onRowClick && (typeof value === "object" || Array.isArray(value))) {
      onRowClick(key, value);
    }
  };

  const keyValuePairs: KeyValuePair[] = renderObject(data, breadcrumb);

  return (
    <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Tag</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Value</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Depth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keyValuePairs.map((pair, index) => (
            <TableRow
              key={index}
              onClick={() => handleClick(pair.tag, pair.value)}
              style={{
                cursor:
                  typeof pair.value === "object" || Array.isArray(pair.value)
                    ? "pointer"
                    : "default",
              }}
            >
              <TableCell>{pair.tag}</TableCell>
              <TableCell>
                {Array.isArray(pair.value) ? (
                  <span style={{ color: "blue", cursor: "pointer" }}>
                    Array
                  </span>
                ) : typeof pair.value === "object" ? (
                  <span style={{ color: "blue", cursor: "pointer" }}>
                    Object
                  </span>
                ) : (
                  pair.value
                )}
              </TableCell>
              <TableCell>{pair.description}</TableCell>
              <TableCell>{pair.number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Detail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [initData, setInitData] = useState<any>();
  const [currentData, setCurrentData] = useState<any>(null);
  const [breadcrumb, setBreadcrumb] = useState<string[]>(["Home", params.id]);

  const loadData = async () => {
    const data = await getSupabase(params.id);
    setInitData(data);
    setCurrentData(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRowClick = (key: string, value: any) => {
    setCurrentData(value);
    setBreadcrumb((prev) => [...prev, key]);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index == 0) {
      router.push("/");
      return;
    }

    let updatedData = initData;

    for (let i = 2; i <= index; i++) {
      let keys = breadcrumb[i].split(/[\.\[\]]/).filter(Boolean);
      if (keys.some((element) => Number.isInteger(Number(element)))) {
        keys = keys.filter((element) => Number.isInteger(Number(element)));
        console.log(keys);
      }
      updatedData = updatedData[keys[0]];
    }

    setCurrentData(updatedData);
    setBreadcrumb((prev) => prev.slice(0, index + 1));
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "20px" }}>
        {breadcrumb.map((crumb, index) => (
          <Link
            key={index}
            color="inherit"
            onClick={() => handleBreadcrumbClick(index)}
            style={{ cursor: "pointer" }}
          >
            {crumb}
          </Link>
        ))}
      </Breadcrumbs>
      <Typography sx={{ color: "black" }} variant="h6" gutterBottom>
        {breadcrumb[breadcrumb.length - 1]}
      </Typography>
      {currentData && (
        <TableComponent
          data={currentData}
          breadcrumb={breadcrumb}
          onRowClick={handleRowClick}
        />
      )}
    </Box>
  );
};

export default Detail;
