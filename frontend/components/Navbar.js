// Author: Ambar Ubale
// Generated/Edited to look like Ambar Ubale's project

export default function Navbar({user, onLogout}) {
  return (
    <header className="flex items-center justify-between bg-white border-b px-4 py-2">
      <div className="flex items-center space-x-4">
        <button className="md:hidden p-2 rounded bg-gray-100">☰</button>
        <h3 className="text-lg font-semibold">Dashboard</h3>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-sm">
          <div className="font-medium">{user?.name}</div>
          <div className="text-xs text-gray-500">{user?.email}</div>
        </div>
        <button onClick={onLogout} className="px-3 py-1 rounded bg-red-500 text-white text-sm">Logout</button>
      </div>
    </header>
  )
}
