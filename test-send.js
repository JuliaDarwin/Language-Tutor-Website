const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
  try {
    const message = await prisma.message.create({
        data: {
            userId: "test-user-id",
            userName: "Test User",
            senderId: "test-user-id",
            text: "Hello world"
        }
    });
    console.log("Success:", message)
  } catch (e) {
    console.error("Error:", e)
  }
}
main()
