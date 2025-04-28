import React, { useState } from "react";
import { auth, database } from "../firebase/firebaseConfig";
import { ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function SkillOffer() {
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOffer = async (e) => {
    e.preventDefault();
    setError("");
    if (!skill.trim() || !description.trim()) {
      setError("Please fill in all fields");
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const offersRef = ref(database, "skillOffers");
      await push(offersRef, {
        userId: user.uid,
        skill: skill.trim(),
        description: description.trim(),
        timestamp: Date.now(),
      });
      setSkill("");
      setDescription("");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Offer a Skill</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleOffer}>
        <label className="block mb-2 font-semibold">Skill Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          required
        />
        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
}
