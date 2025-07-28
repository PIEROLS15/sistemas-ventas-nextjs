import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} from '@/lib/tests/users'
import prisma from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
    user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}))

describe('Users API', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('createUser', () => {
        it('debería crear un usuario correctamente', async () => {
            const input = {
                firstName: 'Piero',
                lastName: 'Llanos',
                email: '2101010200@undc.edu.pe',
                password: '12345678',
                roleId: 2,
                isActive: true
            }
            const mockResponse = { id: 1, ...input }
                ; (prisma.user.create as jest.Mock).mockResolvedValue(mockResponse)

            const result = await createUser(input)

            expect(prisma.user.create).toHaveBeenCalledWith({ data: input })
            expect(result).toEqual(mockResponse)
        })

        it('debería lanzar error si faltan campos', async () => {
            await expect(
                createUser({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    roleId: undefined as unknown as number,
                    isActive: undefined as unknown as boolean,
                })
            ).rejects.toThrow('Faltan campos requeridos')
        })
    })

    describe('getAllUsers', () => {
        it('debería devolver todos los usuarios', async () => {
            const mockResponse = [
                {
                    id: 1,
                    firstName: 'Piero',
                    lastName: 'Llanos',
                    email: '2101010200@undc.edu.pe',
                    password: '123456',
                    roleId: 1,
                    isActive: true
                },
                {
                    id: 2,
                    firstName: 'Arianna',
                    lastName: 'Espinoza',
                    email: '2101010123@undc.edu.pe',
                    password: '123456',
                    roleId: 2,
                    isActive: true
                }

            ]
                ; (prisma.user.findMany as jest.Mock).mockResolvedValue(mockResponse)

            const result = await getAllUsers()

            expect(prisma.user.findMany)
            expect(result).toEqual(mockResponse)
        })
    })

    describe('getUserById', () => {
        it('debería devolver un usuario por ID', async () => {
            const mockUser = {
                id: 1,
                firstName: 'Piero',
                lastName: 'Llanos',
                email: '2101010200@undc.edu.pe',
                password: '123456',
                roleId: 1,
                isActive: true
            }
                ; (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

            const result = await getUserById(1)

            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })
            expect(result).toEqual(mockUser)
        })

        it('debería lanzar error si el usuario no existe', async () => {
            ; (prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

            await expect(getUserById(99)).rejects.toThrow('Usuario no encontrado')
        })
    })

    describe('updateUserById', () => {
        it('debería actualizar un usuario por ID', async () => {
            const updatedData = {
                firstName: 'Daniel',
                roleId: 2,
            }
            const mockResponse = {
                id: 1,
                firstName: 'Daniel',
                lastName: 'Llanos',
                email: '2101010200@undc.edu.pe',
                password: '123456',
                roleId: 2,
                isActive: true
            }
                ; (prisma.user.update as jest.Mock).mockResolvedValue(mockResponse)

            const result = await updateUserById(1, updatedData)

            expect(prisma.user.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: updatedData,
            })
            expect(result).toEqual(mockResponse)
        })

        it('debería lanzar error si el usuario no existe', async () => {
            ; (prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

            await expect(getUserById(99)).rejects.toThrow('Usuario no encontrado')
        })
    })

    describe('deleteUserById', () => {
        it('debería eliminar un usuario por ID', async () => {
            const mockResponse = { id: 1 }
                ; (prisma.user.delete as jest.Mock).mockResolvedValue(mockResponse)

            const result = await deleteUserById(1)

            expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } })
            expect(result).toEqual(mockResponse)
        })

        it('debería lanzar error si el usuario no existe', async () => {
            ; (prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

            await expect(getUserById(99)).rejects.toThrow('Usuario no encontrado')
        })
    })
})
