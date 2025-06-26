'use client'
import React, { useState, useEffect } from "react";

interface Paciente {
  id: number;
  foto: string;
  nombre: string;
  cedula: string;
  edad: number;
}

interface PatientsAsideProps {
  cedulaSeleccionada?: string;
  onSelect: (cedula: string) => void;
}

const PatientsAside: React.FC<PatientsAsideProps> = ({ cedulaSeleccionada, onSelect }) => {
  const [busqueda, setBusqueda] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/pacientes")
      .then((res) => res.json())
      .then((data) => {
        setPacientes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setPacientes([]);
        setLoading(false);
      });
  }, []);

  const pacientesFiltrados = pacientes.filter((p) => p.cedula.includes(busqueda));

  if (loading) return <div className="p-4">Cargando pacientes...</div>;
  if (!pacientes.length) return <div className="p-4">No hay pacientes</div>;

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 h-fit rounded-xl">
      <input
        type="text"
        placeholder="Buscar cédula..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring"
      />
      <ul>
        {pacientesFiltrados.map((p) => (
          <li key={p.cedula}>
            <button
              className={`w-full text-left px-2 py-1 rounded hover:bg-blue-100 ${p.cedula === cedulaSeleccionada ? "font-bold text-blue-700" : "text-gray-700"}`}
              onClick={() => onSelect(p.cedula)}
            >
              {p.cedula}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default PatientsAside;
