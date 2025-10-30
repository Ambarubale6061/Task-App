import Link from "next/link";
import { useRouter } from "next/router";
import { Home, CheckSquare, User } from "lucide-react";
import { motion } from "framer-motion";

const SidebarLink = ({ href, icon: Icon, label }) => {
  const router = useRouter();
  const active = router.pathname === href;

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
          active
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <Icon
          size={20}
          className={
            active ? "text-white" : "text-gray-600 group-hover:text-blue-600"
          }
        />
        <span className="text-sm font-medium">{label}</span>
      </motion.div>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200 h-screen fixed left-0 top-0 p-5 shadow-lg flex flex-col">
      {/* Logo/Header */}

      <div className="mb-10 flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
          Ambar<span className="text-blue-600">Dash</span>
        </h2>
      </div>

      {/* Navigation */}

      <nav className="space-y-2 flex-1">
        <SidebarLink href="/dashboard" icon={Home} label="Dashboard" />
        <SidebarLink href="/dashboard/tasks" icon={CheckSquare} label="Tasks" />
        <SidebarLink href="/dashboard/profile" icon={User} label="Profile" />
      </nav>

      {/* Footer / Version info */}

      <div className="mt-auto text-xs text-gray-500 text-center border-t pt-3">
        © {new Date().getFullYear()} Ambar Ubale
      </div>
    </aside>
  );
}
