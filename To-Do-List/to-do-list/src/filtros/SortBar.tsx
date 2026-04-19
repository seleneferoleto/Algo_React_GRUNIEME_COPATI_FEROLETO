type Prioridad = "baja" | "media" | "alta";
 
type Props = {
  value: "ninguna" | Prioridad;
  onChange: (value: "ninguna" | Prioridad) => void;
};
 
export default function SortBar({ value, onChange }: Props) {
  return (
    <div className="sort-bar">
      <label>Ordenar:</label>
      <select value={value} onChange={e => onChange(e.target.value as any)}>
        <option value="ninguna">Sin orden</option>
        <option value="alta">Por prioridad</option>
        
      </select>
    </div>
  );
}