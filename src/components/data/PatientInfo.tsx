import React, { useEffect, useState } from "react";
import Image from "next/image";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";

interface Paciente {
  id: number;
  foto: string;
  nombre: string;
  cedula: string;
  edad: number;
  horaIngreso?: string;
  estado?: string;
}

interface PatientInfoProps {
  cedula: string;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ cedula }) => {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/pacientes?cedula=${cedula}`)
      .then((res) => res.json())
      .then((data) => {
        setPaciente(data && !data.error ? data : null);
        setLoading(false);
      })
      .catch(() => {
        setPaciente(null);
        setLoading(false);
      });
  }, [cedula]);

  if (loading) return <div>Cargando paciente...</div>;
  if (!paciente) return <div>Paciente no encontrado</div>;

  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <Image src={paciente.foto} width={80} height={80} alt={paciente.nombre} className="rounded-full" />
        <div>
          <h2 className="text-2xl font-bold mb-2">{paciente.nombre}</h2>
          <p><b>Cédula:</b> {paciente.cedula}</p>
          <p><b>Edad:</b> {paciente.edad}</p>
          {paciente.horaIngreso && <p><b>Hora de ingreso:</b> {paciente.horaIngreso}</p>}
          {paciente.estado && <p><b>Estado:</b> {paciente.estado}</p>}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
