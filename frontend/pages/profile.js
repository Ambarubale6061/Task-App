import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <Card title="Profile Details">
            {user ? (
              <div className="space-y-2">
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
