// Add a home
export const addHome = async (homeData) => {
  const url = `${process.env.REACT_APP_API_URL}/homes`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
    },
    body: JSON.stringify(homeData),
  });

  const data = await response.json();

  return data;
};

//get all homes
export const getAllHome = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/homes`);
  const data = await response.json();
  return data;
};

//get all homes for hosts
export const getHomes = async (email) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/homes/${email}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

// update a home
export const updateHome = async (homeData) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/homes`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
    },
    body: JSON.stringify(homeData),
  });

  const data = await response.json();
  return data;
};

// update a home bookings status
export const updateBookingStatus = async (homeData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/homebookingstatus`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
      },
      body: JSON.stringify(homeData),
    }
  );

  const data = await response.json();
  return data;
};

// Delete a home
export const deleteHome = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/home/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
    },
  });
  const result = await response.json();
  return result;
};

// Search Result
export const getSearchResult = async ({
  location,
  from,
  to,
  price,
  category,
}) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/search-result?category=${category}&location=${location}&from=${from}&to=${to}&price=${price}`
  );
  const data = await response.json();
  return data;
};
