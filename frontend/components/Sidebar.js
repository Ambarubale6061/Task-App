// Author: Ambar Ubale
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, CheckSquare, User } from "lucide-react";

const SidebarLink = ({ href, icon: Icon, label }) => {
  const router = useRouter();
  const active = router.pathname === href;

  return (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
          active
            ? "bg-blue-600 text-white shadow-md"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 p-5 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-600">ScalableApp</h2>
        <p className="text-xs text-gray-500">Admin Dashboard</p>
      </div>
      <nav className="space-y-2">
        <SidebarLink href="/dashboard" icon={Home} label="Dashboard" />
        <SidebarLink href="/dashboard/tasks" icon={CheckSquare} label="Tasks" />
        <SidebarLink href="/dashboard/profile" icon={User} label="Profile" />
      </nav>
    </aside>
  );
}
