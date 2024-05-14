import { PresencaTable } from "@/components/PresencaTable"
import { Aluno, columns } from "@/components/PresencaTable/columns"
import { Input } from "@/components/ui/input"
import { format, set } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import axios from '@/config/axios';
import { handleError } from "@/helpers/ErrorHandle"

export const Presencas = () => {
  const [isReady, setIsReady] = useState(false);
  const [alunos, setAlunos] = useState<Aluno[]>([] as Aluno[]);
  const todayDate = new Date();
  const [matriculaOrName, setMatriculaOrName] = useState('');
  const [filteredAlunos, setFilteredAlunos] = useState<Aluno[]>([] as Aluno[]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setFilteredAlunos(alunos);
    }
    setMatriculaOrName(e.target.value);
    setFilteredAlunos(alunos.filter((aluno) => (
      aluno.nome.toLowerCase().includes(e.target.value.toLowerCase()) ||
      aluno.matricula.includes(e.target.value)
    )))
  }

  const alunosConfirmados = () => {
    return alunos.filter((aluno) => aluno.presenca).length;
  }

  const handleGetAlunos = async () => {
    try {
      const response = await axios.get('/presencas');
      response.data.forEach((aluno: any) => {
        handleGetAluno(aluno.alunoEmail).then((data) => {
          setAlunos((alunos) => (
            [
              ...alunos,
              {
                id: data.id,
                matricula: data.matricula,
                nome: data.nome,
                curso: data.curso,
                presenca: aluno.presenca
              }
            ]
          ))
          setFilteredAlunos((alunos) => (
            [
              ...alunos,
              {
                id: data.id,
                matricula: data.matricula,
                nome: data.nome,
                curso: data.curso,
                presenca: aluno.presenca
              }
            ]
          ))
        })
      });
      return alunos;
    } catch (error) {
      handleError(error);
    }
  }

  const handleGetAluno = async (email: string) => {
    try {
      return await axios.get(`/users/${email}`).then((response) => response.data);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    handleGetAlunos().then((alunos) => {
      if (alunos) {
        setFilteredAlunos(alunos);
      }
      setIsReady(true);
    })
  },[])

  return (
    isReady ? (
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
              <span className="text-3xl">{filteredAlunos.length - alunosConfirmados()!}</span>
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
    ) : (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  )
}
