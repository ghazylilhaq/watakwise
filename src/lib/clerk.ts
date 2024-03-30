import { auth, currentUser } from "@clerk/nextjs";
import { prisma } from "./db";

export async function exportUserData() {
    const userData = await currentUser();

    try {
        if (userData) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    id: userData.id,
                },
            });

            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        id: userData.id,
                        email: userData.emailAddresses[0].emailAddress,
                        name: userData.firstName,
                    },
                });

                console.log("User data exported successfully");
            } else {
                console.log("Similar user already exists");
            }
        }
    } catch (error) {
        console.error("Error exporting user data:", error);
    }
}
