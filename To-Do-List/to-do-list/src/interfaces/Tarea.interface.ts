
export type Prioridad = "baja" | "media" | "alta";

export type Tarea = {
  id: number;
  titulo: string;
  prioridad: Prioridad;
  completada: boolean;
};
