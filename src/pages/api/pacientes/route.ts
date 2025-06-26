// Simulación de una API REST para pacientes
import { NextApiRequest, NextApiResponse } from 'next';

const pacientes = [
  {
    id: 1,
    foto: "/images/user/user-17.jpg",
    nombre: "Lindsey Curtis",
    cedula: "12345678",
    horaIngreso: "08:30",
    edad: 32,
    estado: "Crítico",
  },
  {
    id: 2,
    foto: "/images/user/user-18.jpg",
    nombre: "Kaiya George",
    cedula: "87654321",
    horaIngreso: "09:10",
    edad: 28,
    estado: "Urgente",
  },
  {
    id: 3,
    foto: "/images/user/user-19.jpg",
    nombre: "Zain Geidt",
    cedula: "11223344",
    horaIngreso: "10:05",
    edad: 45,
    estado: "No Urgente",
  },
  {
    id: 4,
    foto: "/images/user/user-20.jpg",
    nombre: "Abram Schleifer",
    cedula: "99887766",
    horaIngreso: "11:20",
    edad: 37,
    estado: "Observación",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { cedula } = req.query;
    if (cedula) {
      const paciente = pacientes.find(p => p.cedula === cedula);
      if (paciente) return res.status(200).json(paciente);
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    return res.status(200).json(pacientes);
  }
  res.status(405).json({ error: 'Método no permitido' });
}
