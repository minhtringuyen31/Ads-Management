export const items = [
  {
    id: "1",
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: "123 Main Street",
      area_type: "Residential",
      image: ["image1.jpg", "image2.jpg"],
      is_planed: true,
    },
    type: "Apartment",
    width: 1200,
    height: 800,
    contract_start_date: "2023-01-01",
    contract_end_date: "2023-12-31",
  },
  {
    id: "2",
    location: {
      lat: 40.7128,
      lng: -74.006,
      address: "456 Oak Avenue",
      area_type: "Commercial",
      image: ["image3.jpg", "image4.jpg"],
      is_planed: false,
    },
    type: "Office",
    width: 1500,
    height: 1000,
    contract_start_date: "2023-02-15",
    contract_end_date: "2023-11-30",
  },
  {
    id: "3",
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: "789 Pine Street",
      area_type: "Residential",
      image: ["image5.jpg", "image6.jpg"],
      is_planed: true,
    },
    type: "House",
    width: 900,
    height: 1200,
    contract_start_date: "2023-03-10",
    contract_end_date: "2023-10-15",
  },
  {
    id: "4",
    location: {
      lat: 41.8781,
      lng: -87.6298,
      address: "101 Oak Lane",
      area_type: "Commercial",
      image: ["image7.jpg", "image8.jpg"],
      is_planed: false,
    },
    type: "Store",
    width: 800,
    height: 600,
    contract_start_date: "2023-04-20",
    contract_end_date: "2023-09-30",
  },
  {
    id: "5",
    location: {
      lat: 32.7157,
      lng: -117.1611,
      address: "543 Elm Street",
      area_type: "Residential",
      image: ["image9.jpg", "image10.jpg"],
      is_planed: true,
    },
    type: "Condo",
    width: 1000,
    height: 700,
    contract_start_date: "2023-05-15",
    contract_end_date: "2023-12-01",
  },
];

export const locationInformation = {
  results: [
    {
      address_components: [
        {
          long_name: "1600",
          short_name: "1600",
          types: ["street_number"],
        },
        {
          long_name: "Amphitheatre Parkway",
          short_name: "Amphitheatre Pkwy",
          types: ["route"],
        },
        {
          long_name: "Mountain View",
          short_name: "Mountain View",
          types: ["locality", "political"],
        },
        {
          long_name: "Santa Clara County",
          short_name: "Santa Clara County",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "California",
          short_name: "CA",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "United States",
          short_name: "US",
          types: ["country", "political"],
        },
        {
          long_name: "94043",
          short_name: "94043",
          types: ["postal_code"],
        },
      ],
      formatted_address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
      geometry: {
        location: {
          lat: 37.4224428,
          lng: -122.0842467,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 37.4239627802915,
            lng: -122.0829089197085,
          },
          southwest: {
            lat: 37.4212648197085,
            lng: -122.0856068802915,
          },
        },
      },
      place_id: "ChIJeRpOeF67j4AR9ydy_PIzPuM",
      plus_code: {
        compound_code: "CWC8+X8 Mountain View, CA",
        global_code: "849VCWC8+X8",
      },
      types: ["street_address"],
    },
  ],
  status: "OK",
};

export const reports = [
  {
    id: "1",
    object: {
      title: "",
      address: "",
    },
    content: "",
    image: [],
    data_to_post: "",
    status: "",
    operation: "",
  },
  {
    id: "2",
    object: {
      title: "",
      address: "",
    },
    content: "",
    image: [],
    data_to_post: "",
    status: "",
    operation: "",
  },
];
