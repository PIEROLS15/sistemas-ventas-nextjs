import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
} from '@/lib/tests/products'
import prisma from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
    product: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}))

describe('Products API', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('createProduct', () => {
        it('debería crear un producto correctamente', async () => {
            const input = {
                sku: 'SKU001',
                name: 'Producto de prueba',
                price: 100,
                stock: 10,
            }
            const mockResponse = { id: 1, ...input }
                ; (prisma.product.create as jest.Mock).mockResolvedValue(mockResponse)

            const result = await createProduct(input)

            expect(prisma.product.create).toHaveBeenCalledWith({ data: input })
            expect(result).toEqual(mockResponse)
        })

        it('debería lanzar error si faltan campos', async () => {
            await expect(
                createProduct({
                    sku: '',
                    name: '',
                    price: undefined as unknown as number,
                    stock: undefined as unknown as number,
                })
            ).rejects.toThrow('Faltan campos requeridos')
        })
    })

    describe('getAllProducts', () => {
        it('debería devolver todos los productos', async () => {
            const mockResponse = [
                { id: 1, sku: 'SKU001', name: 'Prod A', price: 100, stock: 10 },
                { id: 2, sku: 'SKU002', name: 'Prod B', price: 200, stock: 5 },
            ]
                ; (prisma.product.findMany as jest.Mock).mockResolvedValue(mockResponse)

            const result = await getAllProducts()

            expect(prisma.product.findMany).toHaveBeenCalledWith({
                orderBy: { createdAt: 'desc' },
            })
            expect(result).toEqual(mockResponse)
        })
    })

    describe('getProductById', () => {
        it('debería devolver un producto por ID', async () => {
            const mockProduct = { id: 1, sku: 'SKU001', name: 'Prod A', price: 100, stock: 10 }
                ; (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct)

            const result = await getProductById(1)

            expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 1 } })
            expect(result).toEqual(mockProduct)
        })

        it('debería lanzar error si el producto no existe', async () => {
            ; (prisma.product.findUnique as jest.Mock).mockResolvedValue(null)

            await expect(getProductById(99)).rejects.toThrow('Producto no encontrado')
        })
    })

    describe('updateProductById', () => {
        it('debería actualizar un producto por ID', async () => {
            const updatedData = {
                name: 'Producto actualizado',
                price: 150,
            }
            const mockResponse = {
                id: 1,
                sku: 'SKU001',
                name: 'Producto actualizado',
                price: 150,
                stock: 10,
            }
                ; (prisma.product.update as jest.Mock).mockResolvedValue(mockResponse)

            const result = await updateProductById(1, updatedData)

            expect(prisma.product.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: updatedData,
            })
            expect(result).toEqual(mockResponse)
        })

        it('debería lanzar error si el producto no existe', async () => {
            ; (prisma.product.findUnique as jest.Mock).mockResolvedValue(null)

            await expect(getProductById(99)).rejects.toThrow('Producto no encontrado')
        })
    })

    describe('deleteProductById', () => {
        it('debería eliminar un producto por ID', async () => {
            const mockResponse = { id: 1, sku: 'SKU001', name: 'Eliminado', price: 0, stock: 0 }
                ; (prisma.product.delete as jest.Mock).mockResolvedValue(mockResponse)

            const result = await deleteProductById(1)

            expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 1 } })
            expect(result).toEqual(mockResponse)
        })

        it('debería lanzar error si el producto no existe', async () => {
            ; (prisma.product.findUnique as jest.Mock).mockResolvedValue(null)

            await expect(getProductById(99)).rejects.toThrow('Producto no encontrado')
        })
    })
})
