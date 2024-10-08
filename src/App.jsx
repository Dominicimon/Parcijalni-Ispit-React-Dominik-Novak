import React, { useState } from "react";
import FormComponent from "./components/FormComponent";
import UserDetails from "./components/UserDetails";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]); // New state for repositories
  const [error, setError] = useState(null);

  const fetchUserData = async (username) => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const user = await userResponse.json();
      setUserData(user);
      setError(null); // Clear error on successful fetch

      // Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const repositories = await reposResponse.json();
      setRepos(repositories); // Set the repositories state
    } catch (error) {
      console.error(error);
      setUserData(null);
      setRepos([]); // Reset repositories on error
      setError(error.message);
    }
  };

  const handleReset = () => {
    setUserData(null); // Clear user data
    setRepos([]); // Clear repositories
    setError(null); // Clear any errors
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-4xl text-center">GitHub User Search</h1>
      <FormComponent onSubmit={fetchUserData} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {userData && (
        <UserDetails userData={userData} repos={repos} onReset={handleReset} /> // Pass reset function
      )}
    </div>
  );
};

export default App;
