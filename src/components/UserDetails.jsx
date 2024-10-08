import React from "react";

const UserDetails = ({ userData, repos }) => {
  return (
    <div className="user-details mt-5 p-5 border rounded shadow">
      <div className="flex items-center">
        <img src={userData.avatar_url} alt="Avatar" className="rounded-full w-24 h-24 mr-4" />
        <h2 className="text-2xl">{userData.name}</h2> {/* User name next to avatar */}
      </div>
      <p className="mt-2">
        <strong>Bio:</strong> {userData.bio || "No bio available"}
      </p>
      <p>
        <strong>Location:</strong> {userData.location || "Not specified"}
      </p>
      <h3 className="text-lg font-semibold mt-4">Repositories:</h3>
      {repos.length > 0 ? (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id} className="border-b py-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No repositories found.</p>
      )}
    </div>
  );
};

export default UserDetails;
