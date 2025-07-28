import prisma from '@/lib/prisma'
import { UserInput } from '@/types/users'

export async function createUser(user: UserInput) {
    const { firstName, lastName, email, password, roleId, isActive } = user

    if (!firstName || !lastName || !email || !password) {
        throw new Error('Faltan campos requeridos')
    }

    return await prisma.user.create({
        data: { firstName, lastName, email, password, roleId, isActive },
    })
}

export async function getAllUsers() {
    return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export async function getUserById(id: number) {
    const user = await prisma.user.findUnique({
        where: { id },
    })

    if (!user) {
        throw new Error('Usuario no encontrado')
    }

    return user
}

export async function updateUserById(id: number, user: Partial<UserInput>) {
    const { firstName, lastName, email, password, roleId, isActive } = user

    const userUpdate = await prisma.user.update({
        where: { id },
        data: { firstName, lastName, email, password, roleId, isActive },
    })

    return userUpdate
}

export async function deleteUserById(id: number) {
    const user = await prisma.user.delete({
        where: { id },
    })

    return user
}
