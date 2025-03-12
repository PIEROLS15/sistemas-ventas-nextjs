import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Sesión cerrada exitosamente" });

    // Eliminar cookies de sesión
    response.cookies.set("sessionToken", "", { maxAge: -1, path: "/" });

    return response;
}
