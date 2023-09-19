import React, { useState } from "react";

const UserRegistration = ({ onStartGame }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [difficulty, setDifficulty] = useState("easy"); // Default to 'easy'

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate user input
    if (name.trim() === "" || email.trim() === "" || mobile.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Call the callback function with user data
    onStartGame({ name, email, mobile, difficulty });
  };

  return (
    <div className="user-registration">
      <h1>User Registration</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mobile Number:</label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          pattern="[0-9]{10}"
          title="Mobile number should be 10 digits"
        />

        <label>Difficulty Level:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default UserRegistration;
