import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { LogOut, Mail, Calendar } from "lucide-react";
import { useRouter } from "next/router";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      router.push("/login");
    } else {
      setUser(JSON.parse(data));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        {/* Profile Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-sm opacity-80">
            Manage your account and personal information
          </p>
        </div>

        {/* Profile Card */}

        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition">
          {user ? (
            <>
              <div className="flex items-center gap-6">
                {/* Avatar */}

                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-700 shadow-inner">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Info */}

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <Mail size={18} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <Calendar size={18} />
                    <span>
                      Joined on{" "}
                      {new Date(
                        user.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}

              <hr className="my-6 border-gray-200" />

              {/* Account Summary */}

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Account Type</p>
                  <h3 className="font-semibold text-blue-700 mt-1">
                    Standard User
                  </h3>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200 hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Status</p>
                  <h3 className="font-semibold text-green-700 mt-1">Active</h3>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 hover:shadow-md transition">
                  <p className="text-sm text-gray-500">Tasks Created</p>
                  <h3 className="font-semibold text-purple-700 mt-1">∞</h3>
                </div>
              </div>

              {/* Logout */}

              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </main>
    </div>
  );
}
