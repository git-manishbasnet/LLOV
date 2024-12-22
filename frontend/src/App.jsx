import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import DataPage from "./DataPage";

const App = () => {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [lovePercentage, setLovePercentage] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateLove = async () => {
    const percentage = Math.floor(Math.random() * 101);
    setLovePercentage(percentage);

    const newEntry = { yourName, partnerName, percentage };

    console.log("Data being sent to backend:", newEntry); // Log the data

    try {
       const response = await axios.post("https://llov-git-manishbasnets-projects.vercel.app/api/entries", newEntry);
      
      // const response = await axios.post("http://localhost:5000/api/entries", newEntry);
      console.log("Backend response:", response.data);

      // Fetch the updated entries after saving the new entry
       const entriesResponse = await axios.get("https://llov-git-manishbasnets-projects.vercel.app/api/entries");
      // const entriesResponse = await axios.get("http://localhost:5000/api/entries");
      console.log("Fetched entries:", entriesResponse.data);

      setEntries(entriesResponse.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting entry:", error);
    }
  };

  const resetForm = () => {
    setYourName("");
    setPartnerName("");
    setLovePercentage(null);
    setIsSubmitted(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-red-400 to-orange-300 p-4">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              !isSubmitted ? (
                <>
                  <h1 className="text-4xl font-extrabold text-white drop-shadow-md mb-8">
                    ❤️ Love Calculator ❤️
                  </h1>
                  <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-sm w-full">
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Partner's Name
                      </label>
                      <input
                        type="text"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder="Enter partner's name"
                        className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                        required
                      />
                    </div>
                    <button
                      onClick={calculateLove}
                      className="w-full py-3 text-white bg-gradient-to-r from-pink-500 to-red-400 rounded-md shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-red-500 transition-all"
                    >
                      Calculate Love
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-sm w-full text-center">
                  <h2 className="text-3xl font-bold text-pink-500 mb-4">
                    Sorry! You got pranked🤣🤣
                  </h2>
                  <p className="text-lg text-gray-500">
                    Your Partner's name is sent to Manish
                  </p>
                  <p className="text-lg text-red-400 mb-4 font-bold mt-4">
                    {yourName} ❤️ {partnerName}
                  </p>
                  <p className="text-lg text-gray-500">
                    Your love percentage is{" "}
                    <span className="text-pink-500 font-bold">
                      {lovePercentage}%
                    </span>
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-6 py-2 px-4 bg-pink-500 text-white rounded-md shadow hover:bg-pink-600 transition-all"
                  >
                    Go Back to Form
                  </button>
                </div>
              )
            }
          />
          {/* Data Page */}
          <Route path="/data" element={<DataPage />} />
        </Routes>
        <p className="mt-6 text-white text-sm opacity-80">Made with ❤️ for fun!</p>
        <p className="mt-6 text-white text-sm opacity-80">Designed By Manish Basnet</p>
        <Link to="/data" className="block mt-4 text-blue-500 hover:underline">
          View Collected Data
        </Link>
      </div>
    </Router>
  );
};

export default App;
