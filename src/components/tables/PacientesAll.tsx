'use client'
import React, { useState, useEffect } from "react";

import Image from "next/image";



interface Paciente {
  id: number;
  foto: string;
  nombre: string;
  cedula: string;
  edad: number;
}




export default function PacientesAll() {
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

  const pacientesFiltrados = pacientes.filter((p) =>
    p.cedula.includes(busqueda)
  );

  if (loading) return <div className="p-4">Cargando pacientes...</div>;
  if (!pacientes.length) return <div className="p-4">No hay pacientes</div>;

  const handleSelect = (cedula: string) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.pathname = "Patients/data";
      url.searchParams.set('cedula', cedula);
      window.location.href = url.toString();
    }
  };

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
      </div>
      <div className="w-full">
        <table className="w-full border-collapse">
          <thead className="border-b border-gray-100 dark:border-white/[0.05]">
            <tr>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Foto</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nombre</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Cédula</th>
              <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Edad</th>
            </tr>
          </thead>
          <tbody>
            {pacientesFiltrados.map((paciente) => (
              <tr key={paciente.id}>
                <td className="px-5 py-4 text-start">
                  <Image src={paciente.foto} width={40} height={40} alt={paciente.nombre} className="rounded-full" />
                </td>
                <td className="px-5 py-4 text-start">
                  <button
                    className="bg-transparent border-none p-0 m-0 text-black hover:bg-gray-200 rounded transition-colors cursor-pointer"
                    style={{textDecoration: 'none'}}
                    onClick={() => handleSelect(paciente.cedula)}
                  >
                    {paciente.nombre}
                  </button>
                </td>
                <td className="px-5 py-4 text-start">{paciente.cedula}</td>
                <td className="px-5 py-4 text-start">{paciente.edad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}