import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase/firebaseConfig";
import { ref, onValue, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }
    const userRef = ref(database, "users/" + user.uid);
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const addSkill = async () => {
    if (!newSkill.trim()) {
      setError("Skill cannot be empty");
      return;
    }
    setError("");
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }
    const userRef = ref(database, "users/" + user.uid);
    const updatedSkills = userData.skills ? [...userData.skills, newSkill.trim()] : [newSkill.trim()];
    await update(userRef, { skills: updatedSkills });
    setNewSkill("");
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-4">{userData.displayName}'s Profile</h1>
      <p className="mb-4">Email: {userData.email}</p>
      <p className="mb-4">Rating: {userData.rating || 0}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Skills Offered</h2>
        <ul className="list-disc list-inside mb-2">
          {userData.skills && userData.skills.length > 0 ? (
            userData.skills.map((skill, index) => <li key={index}>{skill}</li>)
          ) : (
            <li>No skills added yet.</li>
          )}
        </ul>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Add a new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button
            onClick={addSkill}
            className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
