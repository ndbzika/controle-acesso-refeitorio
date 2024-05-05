import { Link } from "react-router-dom"

type CardRootProps = {
  children: React.ReactNode
  destiny: string
}

export const CardRoot = ({children, destiny}: CardRootProps) => {
  const handleSortBgColor = () => {
    const colors = [
      'bg-[#74A3FF]',
      'bg-[#CCFF61]',
      'bg-[#5EF5FF]',
      'bg-[#FF9900]',
      'bg-[#00A3FF]',
      ]
    return colors[Math.floor(Math.random() * colors.length)]
  }
  return (
    <Link to={`/admin/${destiny}`}>
      <div className={`w-72 h-72 ${handleSortBgColor()} rounded-md flex flex-col items-center justify-center gap-2 group`}>
        {children}
      </div>
    </Link>
  )
}
