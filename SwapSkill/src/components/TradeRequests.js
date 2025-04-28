import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase/firebaseConfig";
import { ref, onValue, push, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function TradeRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }
    const requestsRef = ref(database, "tradeRequests");
    const unsubscribe = onValue(requestsRef, (snapshot) => {
      const allRequests = [];
      snapshot.forEach((childSnapshot) => {
        const request = { id: childSnapshot.key, ...childSnapshot.val() };
        if (request.toUserId === user.uid || request.fromUserId === user.uid) {
          allRequests.push(request);
        }
      });
      setRequests(allRequests);
    });
    return () => unsubscribe();
  }, [navigate]);

  const acceptRequest = async (id) => {
    setError("");
    try {
      // For simplicity, just remove the request on accept
      await remove(ref(database, "tradeRequests/" + id));
      alert("Trade request accepted!");
    } catch (err) {
      setError(err.message);
    }
  };

  const declineRequest = async (id) => {
    setError("");
    try {
      await remove(ref(database, "tradeRequests/" + id));
      alert("Trade request declined.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!auth.currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please login to view trade requests.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">Trade Requests</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {requests.length === 0 ? (
        <p>No trade requests.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li
              key={req.id}
              className="border-b border-gray-200 py-4 flex justify-between items-center"
            >
              <div>
                <p>
                  From: <strong>{req.fromUserId}</strong>
                </p>
                <p>
                  To: <strong>{req.toUserId}</strong>
                </p>
                <p>
                  Skill Offered: <strong>{req.skillOffered}</strong>
                </p>
                <p>
                  Skill Requested: <strong>{req.skillRequested}</strong>
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => acceptRequest(req.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => declineRequest(req.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
