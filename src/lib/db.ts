import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

//this is what creates a the connection
const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

//declare is a way to tell typescript we are not writing code but updating its rules
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>; //it adds a new global variable that typescript can understand, which is whatever comes out of prismaClientSingleton
} & typeof global; //and also keep whatever stuff is allowed in the global object

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
