export const setAuthToken = (user) => {
  if (user?.email) {
    const currentUser = {
      email: user?.email,
      name: user?.displayName,
      profileImg: user?.photoURL,
    };

    //   Save user in db & get token
    fetch(`${process.env.REACT_APP_API_URL}/user/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then((data) => {
        //Save token in LocalStorage
        localStorage.setItem("bdrent-token", data.token);
      });
  }
};
