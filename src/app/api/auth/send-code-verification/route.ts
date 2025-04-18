import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/brevo";
import prisma from "@/lib/prisma";
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
    function generateVerificationCode(length = 6): string {
        return Math.floor(100000 + Math.random() * 900000).toString().substring(0, length);
    }

    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ message: "Email es requerido" }, { status: 400 });
    }

    try {
        // Verificar si el usuario existe
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                isActive: true,
                email: true,
            }
        });

        if (!user) {
            return NextResponse.json({ message: "No existe una cuenta con este correo electrónico" }, { status: 404 });
        }

        if (!user.isActive) {
            return NextResponse.json({ message: "Esta cuenta está desactivada" }, { status: 403 });
        }

        const code = generateVerificationCode();
        const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hora de expiración
        const resetPasswordUrl = `${process.env.NEXTAUTH_URL}/reset-password/${code}?email=${encodeURIComponent(user.email)}`;

        // Actualizar el usuario con el token de reset y la fecha de expiración
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: code,
                resetTokenExpiresAt: expirationTime,
                updatedAt: new Date(),
            }
        });

        // Cargar el template HTML desde el archivo
        const templatePath = path.join(process.cwd(), 'src/components/emails/password-reset-email.html');
        let emailTemplate = await fs.readFile(templatePath, 'utf-8');

        // Reemplazar placeholders con datos reales
        emailTemplate = emailTemplate
            .replace(/{nombre_usuario}/g, `${user.firstName} ${user.lastName}`)
            .replace(/{url_reset_password}/g, resetPasswordUrl)
            .replace(/{codigo_verificacion}/g, code)
            .replace(/{email_usuario}/g, user.email)
            .replace(/{url_contacto}/g, `${process.env.NEXTAUTH_URL}/contact`);

        // Enviar el correo electrónico
        const emailResponse = await sendEmail({
            subject: "Recuperación de contraseña - Sistema de Ventas",
            to: [{
                email: user.email,
                name: `${user.firstName} ${user.lastName}`
            }],
            htmlContent: emailTemplate,
        });

        if (!emailResponse) {
            throw new Error("Failed to send email");
        }

        return NextResponse.json({ message: "Correo enviado" });

    } catch (error) {
        console.error("Error en el proceso de recuperación:", error);
        return NextResponse.json(
            { message: "Ocurrió un error al procesar tu solicitud" },
            { status: 500 }
        );
    }
}