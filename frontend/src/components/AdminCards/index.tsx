import { CardIcon } from "./CardIcon"
import { CardLabel } from "./CardLabel"
import { CardRoot } from "./CardRoot"

export const Cards = ({role}: {role:'caest'|'cozinha'}) => {
  return (
    role === 'caest' ? (
      <div className="flex justify-center items-center gap-10 flex-wrap">
        <CardRoot destiny='presencas'>
          <CardIcon>controle-presenca</CardIcon>
          <CardLabel>Controle de presença</CardLabel>
        </CardRoot>
        <CardRoot destiny="relatorios">
          <CardIcon>relatorios</CardIcon>
          <CardLabel>Relatórios</CardLabel>
        </CardRoot>
        <CardRoot destiny="turmas">
          <CardIcon>turmas</CardIcon>
          <CardLabel>Turmas</CardLabel>
        </CardRoot>
      </div>
    ) : (
      <div className="flex justify-center items-center gap-10 flex-wrap">
        <CardRoot destiny="validar-presenca">
          <CardIcon>validar-presenca</CardIcon>
          <CardLabel>Validar Presença</CardLabel>
        </CardRoot>
        <CardRoot destiny="presencas">
          <CardIcon>lista-do-dia</CardIcon>
          <CardLabel>Lista do Dia</CardLabel>
        </CardRoot>
      </div>
    )
  )
}
