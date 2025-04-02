"use client"

import { User } from "lucide-react"

const ProfileHeader = () => {
    return (
        <div className="space-y-4 pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/20 p-2 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="font-heading text-3xl md:text-4xl">Mi Perfil</h1>
                        <p className="text-lg text-muted-foreground">Gestiona tu información personal y seguridad</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader;