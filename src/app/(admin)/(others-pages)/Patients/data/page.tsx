'use client'
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PatientsAside from "@/components/data/PatientsAside";
import PatientInfo from "@/components/data/PatientInfo";

export default function DataPage() {
  const [cedulaSeleccionada, setCedulaSeleccionada] = useState<string>("");
  const searchParams = useSearchParams();
  const cedulaQuery = searchParams.get("cedula");

  // Cuando cambia la query, actualiza la seleccion
  useEffect(() => {
    if (cedulaQuery) setCedulaSeleccionada(cedulaQuery);
  }, [cedulaQuery]);

  return (
    <div className="flex gap-8 w-full grid-col-6">
      <main className="flex-1 p-4 col-span-4">
        {cedulaSeleccionada ? (
          <PatientInfo cedula={cedulaSeleccionada} />
        ) : (
          <div className="text-gray-500">Selecciona un paciente</div>
        )}
      </main>
      <PatientsAside
        cedulaSeleccionada={cedulaSeleccionada}
        onSelect={setCedulaSeleccionada}
      />
    </div>
  );
}
