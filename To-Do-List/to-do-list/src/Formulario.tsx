import { useForm } from "react-hook-form";
import type { Prioridad } from "./interfaces/Tarea.interface";

type FormValues = {
  titulo: string;
  prioridad: Prioridad;
};

type Props = {
  onAgregar: (titulo: string, prioridad: Prioridad) => void;
};

export default function Formulario({ onAgregar }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      prioridad: "media",
    },
  });

  const onSubmit = (data: FormValues) => {
    onAgregar(data.titulo.trim(), data.prioridad);
    reset();
  };

  return (
    <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="formulario-campo">
        <input
          type="text"
          placeholder="Nueva tarea..."
          {...register("titulo", {
            required: "El título no puede estar vacío",
          })}
        />
        {errors.titulo && (
          <span className="formulario-error">{errors.titulo.message}</span>
        )}
      </div>

      <div className="formulario-campo">
        <select
          {...register("prioridad", {
            required: "Seleccioná una prioridad",
            validate: (v) =>
              ["baja", "media", "alta"].includes(v) ||
              "Seleccioná una prioridad válida",
          })}
        >
          <option value="">-- Prioridad --</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        {errors.prioridad && (
          <span className="formulario-error">{errors.prioridad.message}</span>
        )}
      </div>

      <button type="submit">+ Agregar</button>
    </form>
  );
}
