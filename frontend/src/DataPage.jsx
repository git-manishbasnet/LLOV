
import { Link } from "react-router-dom";


import { useEffect, useState } from "react";
import axios from "axios";

const DataPage = () => {
  const [entries, setEntries] = useState([]);

  // Fetch data from the backend when the page loads
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/entries");
           const response = await axios.get("https://llov.vercel.app/api/entries");
   
        setEntries(response.data); // Set the fetched entries into state
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []); // Empty array means this effect runs only once when the component mounts

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-red-400 to-orange-300 p-4">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-md mb-8">
        💖 Collected Data 💖
      </h1>
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-sm w-full">
        {/* Show data if there are entries */}
        {entries.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-pink-500 mb-4">All Entries:</h2>
            <ul>
              {entries.map((entry, index) => (
                <li key={index} className="mb-4">
                  <p className="text-gray-700 font-semibold">
                    {entry.yourName} ❤️ {entry.partnerName}
                  </p>
                  <p className="text-sm text-gray-500">Love Percentage: {entry.percentage}%</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500">No data available yet.</p>
        )}
        <Link
     to="/"
          className="block mt-6 text-center py-2 px-4 bg-pink-500 text-white rounded-md shadow hover:bg-pink-600 transition-all"
        >
          Back to Home
         </Link>
      </div>
    </div>
  );
};

export default DataPage;


