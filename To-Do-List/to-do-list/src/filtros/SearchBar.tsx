type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Buscar tarea..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ marginBottom: 10, width: '100%', padding: 6 }}
    />
  );
}
