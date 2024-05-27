import { Link } from "react-router-dom"

type CardRootProps = {
  children: React.ReactNode
  destiny: string
}

export const CardRoot = ({children, destiny}: CardRootProps) => {
  const handleSortBgColor = () => {
    type coresDestinosType = {
      'presencas': string,
      'relatorios': string,
      'turmas': string,
      'validar-presenca': string,
      'lista-do-dia': string
    };

    const coresDestinos: coresDestinosType = {
      'presencas': 'bg-[#74A3FF]',
      'relatorios': 'bg-[#CCFF61]',
      'turmas': 'bg-[#5EF5FF]',
      'validar-presenca': 'bg-[#FF9900]',
      'lista-do-dia': 'bg-[#00A3FF]'
    };
    const dest: keyof coresDestinosType = destiny as keyof coresDestinosType;
    return coresDestinos[dest];
  }
  return (
    <Link to={`/admin/${destiny}`}>
      <div className={`w-72 h-72 ${handleSortBgColor()} rounded-md flex flex-col items-center justify-center gap-2 group`}>
        {children}
      </div>
    </Link>
  )
}
