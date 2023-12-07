import { List } from "@mui/material";
import React from "react";
import AdsItem from "./AdsItem";

// const items = [
//   {
//     id: "",
//     location: {
//       lat: "",
//       lng: "",
//       address: "",
//       area_type: "",
//       image: [],
//       is_planed: "",
//     },
//     type: "",
//     width: "",
//     height: "",
//     contract_start_date: "",
//     contract_end_date: "",
//   },
// ];

const items = [
  { id: 1, content: "aaaa" },
  { id: 2, content: "aaaa" },
  { id: 3, content: "aaaa" },
];

const AdsList = () => {
  return (
    <List>
      {items.map((item) => (
        <AdsItem key={item.id} item={item} />
      ))}
    </List>
  );
};

export default AdsList;
