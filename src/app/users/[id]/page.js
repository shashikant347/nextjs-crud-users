"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../api";

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!id) return; // avoid undefined
    api.get(`/users/${id}`).then((res) => {
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
    });
  }, [id]);

  const handleUpdate = async () => {
    if (!id) return;
    const updatedUser = { ...user, name, email };
    setUser(updatedUser); // optimistic update
    await api.put(`/users/${id}`, { name, email });
    alert("User updated (optimistic)");
  };

  const handleDelete = async () => {
    if (!id) return;
    router.push("/users"); // optimistic redirect
    await api.delete(`/users/${id}`);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Detail</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        style={{ display: "block", marginBottom: "10px", padding: "5px" }}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ display: "block", marginBottom: "10px", padding: "5px" }}
      />
      <button onClick={handleUpdate} style={{ marginRight: "10px" }}>
        Update
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
