import { Header } from "@/components/Header"
import { PresencaTable } from "@/components/PresencaTable"
import { columns } from "@/components/PresencaTable/columns"
import { Input } from "@/components/ui/input"
import { alunos } from "@/utils/AlunosExample"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"

export const Presencas = () => {
  const todayDate = new Date();
  const [matriculaOrName, setMatriculaOrName] = useState('');
  const [filteredAlunos, setFilteredAlunos] = useState(alunos);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFilteredAlunos(alunos);
      setMatriculaOrName('');
      return;
    }
    setMatriculaOrName(e.target.value);
    setFilteredAlunos((alunos) => alunos.filter((aluno) => {
      return aluno.matricula.includes(e.target.value) || aluno.nome.toLowerCase().includes(e.target.value.toLowerCase());
    }));
  }
  const alunosConfirmados = () => {
    return alunos.filter(aluno => !!aluno.presenca).length;
  }

  return (
    <>
      <Header/>
      <main
      className="flex flex-col gap-4 p-4"
      >
        <div
        className="px-20 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-md"
        >
          <Input
          className="w-80"
          placeholder="Buscar nome ou matricula..."
          value={matriculaOrName}
          onChange={handleSearch}
          />
          <div className="flex gap-24">
            <div className="text-center">
              <p className="text-xl font-medium">Confirmados</p>
              <span className="text-3xl">{alunosConfirmados()}</span>
            </div>
            <div className="text-center font-medium">
              <p className="text-xl">Pendente</p>
              <span className="text-3xl">{alunos.length - alunosConfirmados()}</span>
            </div>
          </div>
          <div className="flex flex-col gap-8 text-3xl text-center">
            <h3>{format(todayDate, 'dd/MM/yyyy', {
              locale: ptBR
            })}</h3>
            <h3>{format(todayDate, 'EEEE', {
              locale: ptBR
            })}</h3>
          </div>
        </div>
        <div>
          <PresencaTable columns={columns} data={filteredAlunos}/>
        </div>
      </main>
    </>
  )
}
