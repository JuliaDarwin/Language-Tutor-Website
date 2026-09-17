import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const users = await prisma.message.findMany({ distinct: ['userId'], select: { userId: true } })
  console.log("Users:", users)
  const msgs = await prisma.message.findMany()
  console.log("Msgs:", msgs)
}
main()
