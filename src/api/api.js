const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const getUserData = async (token) => {
  const response = await fetch(`${API_URL}/api/v1/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await response.json();
};

const editUsername = async (username, token) => {

    const userData = { userName: username } 
    const payload = JSON.stringify(userData)

  try {
    if (!token) alert("Vous devez être connecté pour modifier votre username.");
    const response = await fetch(`${API_URL}/api/v1/user/profile`, {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    },
      body: payload,
    });

    return await response.json();
  } catch (error) {
    alert("On n'arrive pas à modifier votre username.");
    throw error;
  }
};

export { getUserData, editUsername };
