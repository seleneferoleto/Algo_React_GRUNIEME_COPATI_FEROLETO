import './App.css';
import Formulario from './Formulario';
import type { Tarea, Prioridad } from './interfaces/Tarea.interface';
import ListadoTareas from './ListadoTareas';
import SearchBar from './filtros/SearchBar';
import FilterBar from './filtros/FilterBar';
import SortBar from './filtros/SortBar';
import { useState, useEffect } from 'react';


const INITIAL_TAREAS: Tarea[] = [
  { id: 1, titulo: "Aprender JavaScript", prioridad: "alta", completada: false },
  { id: 2, titulo: "Hacer ejercicios React", prioridad: "media", completada: false },
  { id: 3, titulo: "Leer documentación", prioridad: "baja", completada: true },
];

function cargarTareasIniciales(): Tarea[] {
  const guardadas = localStorage.getItem("tareas");
  if (guardadas) {
    return JSON.parse(guardadas);
  }
  return INITIAL_TAREAS;
}

function App() {
  const [tareas, setTareas] = useState<Tarea[]>(cargarTareasIniciales);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"todas" | "completadas" | "pendientes">("todas");
  const [ordenPrioridad, setOrdenPrioridad] = useState<"ninguna" | Prioridad>("ninguna");

  const agregar = (titulo: string, prioridad: Prioridad) => {
    const nueva: Tarea = {
      id: Date.now(),
      titulo,
      prioridad,
      completada: false,
    };
    setTareas([...tareas, nueva]);
  };

  const toggleCompletada = (id: number) => {
    setTareas(tareas.map((t) =>
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  };

  const eliminar = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  // Filtrado y ordenamiento
  let tareasFiltradas = tareas.filter((t) =>
    t.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );
  if (filtroEstado === "completadas") {
    tareasFiltradas = tareasFiltradas.filter((t) => t.completada);
  } else if (filtroEstado === "pendientes") {
    tareasFiltradas = tareasFiltradas.filter((t) => !t.completada);
  }
  if (ordenPrioridad !== "ninguna") {
    const prioridadOrden = { alta: 1, media: 2, baja: 3 };
    tareasFiltradas = [...tareasFiltradas].sort((a, b) =>
      prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad]
    );
  }

  return (
    <div className="todo-container">
      <header className="todo-header">
        <h1>Mis Tareas</h1>
        <p className="todo-subtitle">Organiza, filtra y prioriza tus tareas fácilmente</p>
      </header>
      <section className="todo-controls">
        <SearchBar value={busqueda} onChange={setBusqueda} />
        <div className="todo-filters">
          <FilterBar value={filtroEstado} onChange={setFiltroEstado} />
          <SortBar value={ordenPrioridad} onChange={setOrdenPrioridad} />
        </div>
      </section>
      <Formulario onAgregar={agregar} />
      <main className="todo-list-section">
        <ListadoTareas
          tareas={tareasFiltradas}
          onToggle={toggleCompletada}
          onEliminar={eliminar}
        />
        {tareasFiltradas.length === 0 && (
          <div className="todo-empty">No hay tareas que coincidan con la búsqueda o filtros.</div>
        )}
      </main>
    </div>
  );
}

export default App
