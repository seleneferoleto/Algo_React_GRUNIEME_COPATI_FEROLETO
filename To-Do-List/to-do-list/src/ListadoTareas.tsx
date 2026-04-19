import type { Tarea } from "./interfaces/Tarea.interface";
 
type Props = {
  tareas: Tarea[];
  onToggle: (id: number) => void;
  onEliminar: (id: number) => void;
};
 
export default function ListadoTareas({ tareas, onToggle, onEliminar }: Props) {
  return (
    <ul>
      {tareas.map((t) => (
        <li key={t.id}>
          <input
            type="checkbox"
            checked={t.completada}
            onChange={() => onToggle(t.id)}
          />
          <span className={t.completada ? "completada" : ""}>
            {t.titulo}
          </span>
          <span className={`prioridad-badge prioridad-${t.prioridad}`}>
            {t.prioridad}
          </span>
          <button onClick={() => onEliminar(t.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}