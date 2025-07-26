import prisma from '@/lib/prisma'
import { ProductInput } from '@/types/products'

export async function createProduct(product: ProductInput) {
    const { sku, name, price, stock } = product

    if (!sku || !name || price === undefined || stock === undefined) {
        throw new Error('Faltan campos requeridos')
    }

    return await prisma.product.create({
        data: { sku, name, price, stock },
    })
}

export async function getAllProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: { id },
    })

    if (!product) {
        throw new Error('Producto no encontrado')
    }

    return product
}

export async function updateProductById(id: number, data: Partial<ProductInput>) {
    const { sku, name, price, stock } = data

    const product = await prisma.product.update({
        where: { id },
        data: { sku, name, price, stock },
    })

    return product
}

export async function deleteProductById(id: number) {
    const product = await prisma.product.delete({
        where: { id },
    })

    return product
}
