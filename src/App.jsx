import React, { useState } from "react";
import FormComponent from "./components/FormComponent";
import UserDetails from "./components/UserDetails";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserData = async (username) => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error("User not found");
      }
      const user = await userResponse.json();
      setUserData(user);
      setError(null);

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const repositories = await reposResponse.json();
      setRepos(repositories);
    } catch (error) {
      console.error(error);
      setUserData(null);
      setRepos([]);
      setError(error.message);
    }
  };

  const handleReset = () => {
    setUserData(null);
    setRepos([]);
    setError(null);
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-4xl text-center">GitHub User Search</h1>
      {!userData && <FormComponent onSubmit={fetchUserData} />} {/* Conditionally render form */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {userData && (
        <>
          <UserDetails userData={userData} repos={repos} />
          <div className="flex justify-center mt-4">
            {" "}
            {/* Center the button */}
            <button onClick={handleReset} className="bg-red-500 text-white rounded p-2">
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
