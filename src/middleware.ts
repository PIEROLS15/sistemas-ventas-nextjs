import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
    async function middleware(request: NextRequestWithAuth) {
        const token = await getToken({ req: request });

        // Si no hay token, redirigir a la página de inicio
        if (!token) {
            const url = new URL("/", request.url);
            return NextResponse.redirect(url.origin);
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        '/admin/:path*',
        '/dashboard/:path*',
    ]
};
