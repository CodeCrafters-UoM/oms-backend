const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function contactus(data, res) {
    console.log("data", data);
    try{
        await prisma.contactUs.create({ data });
        return res.status(200).json({ message: "your message submit successfully" });
    }
    catch(error){
        return res.status(500).json({ message: "Internal server error" });
    }
  }
module.exports={
  contactus,
}