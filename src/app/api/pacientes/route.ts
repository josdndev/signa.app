import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cedula = searchParams.get("cedula");
    if (cedula) {
      const paciente = pacientes.find((p) => p.cedula === cedula);
      if (paciente) return NextResponse.json(paciente);
      return NextResponse.json({ error: "Paciente no encontrado" }, { status: 404 });
    }
    return NextResponse.json(pacientes);
  } catch (error) {
    // Log para debug en Vercel
    console.error("API /api/pacientes error:", error);
    return NextResponse.json({ error: "Error interno del servidor", details: String(error) }, { status: 500 });
  }
}
