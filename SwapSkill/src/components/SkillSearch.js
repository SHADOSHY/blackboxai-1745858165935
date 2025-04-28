import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";

export default function SkillSearch() {
  const [skillOffers, setSkillOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const offersRef = ref(database, "skillOffers");
    const unsubscribe = onValue(offersRef, (snapshot) => {
      const offers = [];
      snapshot.forEach((childSnapshot) => {
        offers.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setSkillOffers(offers);
    });
    return () => unsubscribe();
  }, []);

  const filteredOffers = skillOffers.filter((offer) =>
    offer.skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6">Search Skills</h1>
      <input
        type="text"
        placeholder="Search for a skill..."
        className="w-full p-2 border border-gray-300 rounded mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredOffers.length > 0 ? (
        <ul>
          {filteredOffers.map((offer) => (
            <li
              key={offer.id}
              className="border-b border-gray-200 py-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{offer.skill}</h2>
                <p className="text-gray-600">{offer.description}</p>
              </div>
              <Link
                to={`/profile?userId=${offer.userId}`}
                className="text-blue-600 hover:underline"
              >
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No skill offers found.</p>
      )}
    </div>
  );
}
