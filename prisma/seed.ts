import { PrismaClient, $Enums } from '@prisma/client';

// Para ejecutar e insertar datos: npx tsx prisma/seed.ts

const prisma = new PrismaClient();

async function main() {
    // Insertar roles
    const roles: $Enums.RoleType[] = [$Enums.RoleType.ADMIN, $Enums.RoleType.SELLER];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role },
            update: {},
            create: { name: role },
        });
    }

    // Insertar tipos de identificación
    const identifications: $Enums.IDType[] = [$Enums.IDType.DNI, $Enums.IDType.RUC];

    for (const idType of identifications) {
        await prisma.identificationType.upsert({
            where: { type: idType },
            update: {},
            create: { type: idType },
        });
    }

    console.log('Seed data inserted successfully!');
}

main()
    .catch((e) => {
        console.error('Error inserting seed data:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
