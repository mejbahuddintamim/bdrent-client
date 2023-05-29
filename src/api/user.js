// Host requests
export const hostRequest = async (hostData) => {
  const url = `${process.env.REACT_APP_API_URL}/user/${hostData?.email}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
    },
    body: JSON.stringify(hostData),
  });

  const data = await response.json();

  return data;
};

// Get user role
export const getRole = async (email) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/user/${email}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
      },
    }
  );
  const user = await response.json();
  return user?.role;
};

// Get user confirmation status
export const isUserExist = async (email) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/confirmuser/${email}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const isExist = await response.json();
  return isExist;
};

// Get All Users
export const getAllUsers = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
    },
  });
  console.log("test");
  const users = await response.json();

  return users;
};

// Make a user a host
export const makeHost = async (user) => {
  delete user._id;
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/user/${user?.email}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("bdrent-token")}`,
      },
      body: JSON.stringify({ ...user, role: "host" }),
    }
  );
  const users = await response.json();

  return users;
};
