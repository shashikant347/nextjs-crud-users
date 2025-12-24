"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.map(user => (
        <div key={user.id} style={{ marginBottom: "15px", border: "1px solid #ccc", padding: "10px" }}>
          <p><strong>{user.name}</strong></p>
          <p>{user.email}</p>
          <Link href={`/users/${user.id}`}>
            <button>View</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
