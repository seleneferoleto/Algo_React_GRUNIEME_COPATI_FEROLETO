type EstadoFiltro = "todas" | "completadas" | "pendientes";

type Props = {
  value: EstadoFiltro;
  onChange: (value: EstadoFiltro) => void;
};

export default function FilterBar({ value, onChange }: Props) {
  return (
    <div className="filter-bar">
      {(["todas", "completadas", "pendientes"] as EstadoFiltro[]).map((opcion) => (
        <label key={opcion}>
          <input
            type="radio"
            checked={value === opcion}
            onChange={() => onChange(opcion)}
          />
          {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
        </label>
      ))}
    </div>
  );
}