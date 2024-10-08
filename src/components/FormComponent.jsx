import React, { useState } from "react";

const FormComponent = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username); // Call the function passed as prop
    setUsername(""); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mt-5">
      <label htmlFor="username" className="mb-2 text-lg">
        GitHub Username:
      </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className="border rounded p-2 mb-2 w-64"
        required
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Search
      </button>
    </form>
  );
};

export default FormComponent;
