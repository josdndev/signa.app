'use client'
import React, { useState, useEffect } from "react";

import Image from "next/image";

// Colores para los diferentes estados de triage
const triageColors: Record<string, string> = {
  "Crítico": "bg-red-500 text-white",
  "Urgente": "bg-yellow-400 text-black",
  "No Urgente": "bg-green-400 text-black",
  "Observación": "bg-blue-400 text-white",
};

// Interfaz para definir la estructura de los datos del paciente
interface Paciente {
  id: number;
  foto: string;
  nombre: string;
  cedula: string;
  horaIngreso: string;
  edad: number;
  estado: keyof typeof triageColors;
}

// Función para calcular el tiempo de espera basado en la hora de ingreso
function calcularEspera(horaIngreso: string) {
  const [h, m] = horaIngreso.split(":").map(Number);
  const ahora = new Date();
  const ingreso = new Date();
  ingreso.setHours(h, m, 0, 0);
  let diffMs = ahora.getTime() - ingreso.getTime();
  if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000; // Ajuste si la hora es del día anterior
  const horas = Math.floor(diffMs / (1000 * 60 * 60));
  const minutos = Math.floor((diffMs / (1000 * 60)) % 60);
  return `${horas}h ${minutos}m`;
}

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string>("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect para obtener los datos de los pacientes desde la API
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

  // Filtrado de pacientes basado en la búsqueda y el estado seleccionado
  const pacientesFiltrados = pacientes.filter((p) =>
    p.cedula.includes(busqueda) && (filtroEstado === "" || p.estado === filtroEstado)
  );

  // Mostrar mensaje de carga o de no hay pacientes según el estado
  if (loading) return <div className="p-4">Cargando pacientes...</div>;
  if (!pacientes.length) return <div className="p-4">No hay pacientes</div>;

  return (
    <div className="overflow-visible rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4 w-full">
      <div className="mb-4 flex flex-col sm:flex-row gap-2 justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por cédula..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring"
        />
        <select
          value={filtroEstado}
          onChange={e => setFiltroEstado(e.target.value)}
          className="border rounded px-3 py-2 w-48 focus:outline-none focus:ring"
        >
          <option value="">Todos los estados</option>
          {Object.keys(triageColors).map(estado => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <table className="w-full border-collapse">
          <thead className="border-b border-gray-100 dark:border-white/[0.05]">
            <tr>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Hora de ingreso</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Espera</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Foto</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nombre</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Cédula</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Edad</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pacientesFiltrados.map((paciente) => (
              <tr
                key={paciente.id}
                className={triageColors[paciente.estado] + " transition-colors"}
              >
                <td className="px-5 py-4 text-start">{paciente.horaIngreso}</td>
                <td className="px-5 py-4 text-start">{calcularEspera(paciente.horaIngreso)}</td>
                <td className="px-5 py-4 text-start">
                  <Image src={paciente.foto} width={40} height={40} alt={paciente.nombre} className="rounded-full" />
                </td>
                <td className="px-5 py-4 text-start">
                  <button
                    className="bg-transparent border-none p-0 m-0 text-black hover:bg-gray-200 rounded transition-colors cursor-pointer"
                    style={{textDecoration: 'none'}}
                    onClick={() => window.location.href = `Patients/data?cedula=${paciente.cedula}`}
                  >
                    {paciente.nombre}
                  </button>
                </td>
                <td className="px-5 py-4 text-start">{paciente.cedula}</td>
                <td className="px-5 py-4 text-start">{paciente.edad}</td>
                <td className="px-5 py-4 text-start font-bold">{paciente.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
