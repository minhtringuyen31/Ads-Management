import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "axiosConfig/axiosClient";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ScrollBar from "react-perfect-scrollbar";
import { useTheme } from "@mui/material/styles";
import MainCard from "ui-component/cards/MainCard";

const data = [
  {
    _id: 12,
    name: "Time-based - Peak hour",
    condition:
      "config.hours >= 7 && config.hours < 9 || config.hours >= 17 && config.hours < 19",
    action: "config.baseFare *= 1.2",
    createdAt: "01/01/2023",
    updatedAt: "01/05/2023",
  },
  {
    _id: 13,
    name: "Car distance-based - Discount",
    condition: "config.distance >= 5 && config.type === 'car'",
    action: "config.distanceFare *= 0.6",
    createdAt: "01/01/2023",
    updatedAt: "01/05/2023",
  },
  {
    _id: 14,
    name: "Weather-based - Bad weather",
    condition: "config.badWeather",
    action: "config.baseFare *= 1.2",
    createdAt: "01/01/2023",
    updatedAt: "01/05/2023",
  },
];

const RuleList = () => {
  const theme = useTheme();
  const [rules, setRules] = useState([]);
  const navigate = useNavigate();

  function formatPeakHourCondition(inputString) {
    const parts = inputString.split(/\s*\|\|\s*/);
    let condition = "";
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        condition += " or ";
      }
      condition += formatPeakHourTimeRange(parts[i]);
    }
    return condition;
  }

  function formatPeakHourTimeRange(inputString) {
    const hours = inputString.match(/\d+/g);

    if (hours && hours.length === 2) {
      const startHour = parseInt(hours[0]);
      const endHour = parseInt(hours[1]);
      const formattedRange = `${startHour
        .toString()
        .padStart(2, "0")}:00 - ${endHour.toString().padStart(2, "0")}:00`;
      return formattedRange;
    } else if (inputString.includes("<")) {
      const endHour = parseInt(inputString.match(/\d+/)[0]);
      const formattedRange = `0:00 - ${endHour.toString().padStart(2, "0")}:00`;
      return formattedRange;
    } else if (inputString.includes(">")) {
      const startHour = parseInt(inputString.match(/\d+/)[0]);
      const formattedRange = `${startHour
        .toString()
        .padStart(2, "0")}:00 - 24:00`;
      return formattedRange;
    }
    return inputString;
  }

  function formatAction(inputString) {
    const parts = inputString.split(/\s*\|\|\s*/);
    let condition = "";
    for (let i = 0; i < parts.length; i++) {
      condition += formatExpression(parts[i]);
    }
    return condition;
  }

  function formatExpression(inputString) {
    const matches = inputString.match(/config\.(\w+)\s*\*=\s*(\d+(\.\d+)?)/);

    if (matches && matches.length === 4) {
      const variableName = matches[1];
      const newValue = parseFloat(matches[2]);
      const formattedString = `New ${variableName} = Current ${variableName} * ${newValue}`;
      return formattedString;
    }
    return inputString;
  }

  function formatDiscountCondition(inputString) {
    const parts = inputString.split(/\s*\|\|\s*/);
    let condition = "";
    for (let i = 0; i < parts.length; i++) {
      if (i > 0) {
        condition += " and ";
      }
      condition += formatDiscountExpression(parts[i]);
    }
    return condition;
  }

  function formatDiscountExpression(inputString) {
    const distanceMatch = inputString.match(
      /config\.distance\s*(>=|<=|>|<)\s*(\d+(\.\d+)?)/
    );
    const typeMatch = inputString.match(/config\.type\s*===\s*'([^']+)'/);

    if (distanceMatch && distanceMatch.length === 4) {
      const operator = distanceMatch[1];
      const value = parseFloat(distanceMatch[2]);
      const formattedString = `Distance ${operator} ${value}km`;
      return formattedString;
    } else if (typeMatch && typeMatch.length === 2) {
      const vehicleType = typeMatch[1];
      const formattedString = `Vehicle Type: ${
        vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)
      }`;
      return formattedString;
    }
    return inputString;
  }

  function formatWeatherCondition(inputString) {
    const matches = inputString.match(/config\.(\w+)/);

    if (matches && matches.length === 2) {
      const propertyName = matches[1];
      const formattedString = propertyName.replace(/([A-Z])/g, " $1").trim();
      return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
    }

    return inputString;
  }

  function strProcessing(objectArray) {
    const newData = [];

    for (const object of objectArray) {
      const newObject = {
        name: object.name,
        condition: "",
        action: "",
      };
      if (object.name === "Time-based - Peak hour") {
        newObject.condition = formatPeakHourCondition(object.condition);
        newObject.action = formatAction(object.action);
      } else if (object.name === "Car distance-based - Discount") {
        newObject.condition = formatDiscountCondition(object.condition);
        newObject.action = formatAction(object.action);
      } else {
        newObject.condition = formatWeatherCondition(object.condition);
        newObject.action = formatAction(object.action);
      }
      newData.push(newObject);
    }
    return newData;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // const response = await axiosClient.get("rules");
        // const newData = strProcessing(response.data.data);

        const newData = strProcessing(data);
        setRules(newData);
        console.log("Rule: ", newData);

        // console.log("Repponse Rule List: ", response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleTableRowClick = (bookingId) => {
    navigate(`/utils/history-booking/${bookingId}`, { state: bookingId });
  };

  return (
    <MainCard title="Rule">
      <ScrollBar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead
              sx={{
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Condition
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Action
                </TableCell>
                {/* <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Created At
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Updated At
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rules.map((rule, index) => {
                return (
                  <TableRow
                    hover
                    key={rule._id}
                    onClick={() => handleTableRowClick(rule._id)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{rule?.name}</TableCell>
                    <TableCell>{rule?.condition}</TableCell>
                    <TableCell>{rule?.action}</TableCell>

                    {/* <TableCell>{rule?.createdAt}</TableCell>
                    <TableCell>{rule?.updatedAt}</TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </ScrollBar>
    </MainCard>
  );
};

export default RuleList;
