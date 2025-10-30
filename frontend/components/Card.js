// Author: Ambar Ubale
// Generated/Edited to look like Ambar Ubale's project

export default function Card({title, children}) {
  return (
    <div className="bg-white rounded shadow-sm p-4 border">
      {title && <h4 className="font-semibold mb-2">{title}</h4>}
      {children}
    </div>
  )
}
