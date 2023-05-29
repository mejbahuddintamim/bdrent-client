// Post booking data
export const saveBooking = (bookingData) => {
  return fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
    },
    body: JSON.stringify(bookingData),
  });
};

// Get All Bookings for Admin
export const getAllBookings = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/allbookings`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
    },
  });
  const bookings = await response.json();
  return bookings;
};

// Get all bookings for a host by email
export const getHostBookings = async (email) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/hostbookings?email=${email}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
      },
    }
  );
  const bookings = await response.json();
  return bookings;
};

// Get all bookings for a user by email
export const getUserBookings = async (email) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/userbookings?email=${email}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
      },
    }
  );
  const bookings = await response.json();
  return bookings;
};

// Delete a booking
export const deleteBooking = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/booking/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
      },
    }
  );

  const data = await response.json();
  return data;
};

// Create Payment Intent
export const getPaymentIntent = async (price) => {
  console.log(price);
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/create-payment-intent`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
      },
      body: JSON.stringify({ price }),
    }
  );

  const data = await response.json();
  return data;
};
