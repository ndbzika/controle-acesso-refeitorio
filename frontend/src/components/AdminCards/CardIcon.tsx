export const CardIcon = ({children}: {children: React.ReactNode}) => {
  return <div className="w-14 h-14">
    <img className="w-full" src={`/icons/${children}.svg`} alt={`${children} icon`} />
  </div>
}
