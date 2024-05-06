import { ColumnDef } from "@tanstack/react-table";

export type Aluno = {
  id: string;
  matricula: string;
  nome: string;
  curso: string;
  presenca: boolean;
};

export const columns: ColumnDef<Aluno>[] = [
  {
    header: "Matrícula",
    accessorKey: "matricula",
  },
  {
    header: "Nome",
    accessorKey: "nome",
  },
  {
    header: "Curso",
    accessorKey: "curso",
  },
  {
    header: "Presença",
    accessorKey: "presenca",
  },
];
