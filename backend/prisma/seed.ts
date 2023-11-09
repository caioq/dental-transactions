import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // CATEGORIES
  const categoryUuid1 = '8cc5dc1d-53ff-40da-af6d-40c9762dff14'
  await prisma.category.upsert({
    where: { id: categoryUuid1 },
    update: {
      name: 'Restauração',
    },
    create: {
      id: categoryUuid1,
      name: 'Restauração',
    },
  })

  const categoryUuid2 = 'f1ae914f-aab5-4d82-a21f-3b2aa218d50a'
  await prisma.category.upsert({
    where: { id: categoryUuid2 },
    update: {
      name: 'Extração',
    },
    create: {
      id: categoryUuid2,
      name: 'Extração',
    },
  })

  const categoryUuid3 = '565ea429-e594-41f3-afca-749fb382d73a'
  await prisma.category.upsert({
    where: { id: categoryUuid3 },
    update: {
      name: 'Limpeza',
    },
    create: {
      id: categoryUuid3,
      name: 'Limpeza',
    },
  })

  const categoryUuid4 = '3b5fbcb3-a5c4-470d-a411-e1db6a28a399'
  await prisma.category.upsert({
    where: { id: categoryUuid4 },
    update: {
      name: 'Prótese sobre implante',
    },
    create: {
      id: categoryUuid4,
      name: 'Prótese sobre implante',
    },
  })

  const categoryUuid5 = '93d78242-afeb-4ab1-a3c1-fa2fed54d0a7'
  await prisma.category.upsert({
    where: { id: categoryUuid5 },
    update: {
      name: 'Implante',
    },
    create: {
      id: categoryUuid5,
      name: 'Implante',
    },
  })

  const categoryUuid6 = 'ae7946ef-54b6-4d93-be28-b1ec3491e5f2'
  await prisma.category.upsert({
    where: { id: categoryUuid6 },
    update: {
      name: 'Prótese total',
    },
    create: {
      id: categoryUuid6,
      name: 'Prótese total',
    },
  })

  const categoryUuid7 = 'af9e4a06-57ee-4e67-9168-6b6210d6aac6'
  await prisma.category.upsert({
    where: { id: categoryUuid7 },
    update: {
      name: 'Prótese parcial removível',
    },
    create: {
      id: categoryUuid7,
      name: 'Prótese parcial removível',
    },
  })

  const categoryUuid8 = 'b9ea40d3-f68a-4f88-be84-267f3e7ed3b9'
  await prisma.category.upsert({
    where: { id: categoryUuid8 },
    update: {
      name: 'Prótese fixa',
    },
    create: {
      id: categoryUuid8,
      name: 'Prótese fixa',
    },
  })

  const categoryUuid9 = 'dace9165-767a-44df-87e4-09b995058bde'
  await prisma.category.upsert({
    where: { id: categoryUuid9 },
    update: {
      name: 'Clareamento',
    },
    create: {
      id: categoryUuid9,
      name: 'Clareamento',
    },
  })

  const categoryUuid10 = 'cdc55ba9-6209-4218-9b11-0575ffbb6159'
  await prisma.category.upsert({
    where: { id: categoryUuid10 },
    update: {
      name: 'Protocolo',
    },
    create: {
      id: categoryUuid10,
      name: 'Protocolo',
    },
  })

  const categoryUuid11 = 'b94b1302-c54c-4b04-81d8-bf9e7665583d'
  await prisma.category.upsert({
    where: { id: categoryUuid11 },
    update: {
      name: 'Faceta',
    },
    create: {
      id: categoryUuid11,
      name: 'Faceta',
    },
  })

  const categoryUuid12 = '1db8a55a-3c53-4309-81b0-08bb71ebad3e'
  await prisma.category.upsert({
    where: { id: categoryUuid12 },
    update: {
      name: 'Tracionamento dentário',
    },
    create: {
      id: categoryUuid12,
      name: 'Tracionamento dentário',
    },
  })

  const categoryUuid13 = '1db8a55a-3c53-4309-81b0-08bb71ebad3e'
  await prisma.category.upsert({
    where: { id: categoryUuid13 },
    update: {
      name: 'Levantamento de seio maxilar',
    },
    create: {
      id: categoryUuid13,
      name: 'Levantamento de seio maxilar',
    },
  })

  // ADMIN
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (adminEmail && adminPassword) {
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
      },
      create: {
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
