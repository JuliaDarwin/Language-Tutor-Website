"use server";
/* el que fa aquesta funcio es primer mirar si l'usuari existeix, despres agafar dades de lusuari a traves de clientclerk, 
dp recull el num de classes que la persona vol comprar a traves del form, valida que sigui un num correcte, llavors mria el num de unschedyled lessns a traves de publicmetadata, 
afegeix el num de classes q la persona vol comprar als current unscheduled, i demana que faci un refresh del dashboard pq s0actualitzi i redirigeix alla dp de la compra*/
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
//form data is an object reresenting the data gathered in a form, in this case is gatherig the info of the form in payment
export async function purchaseLessons(formData: FormData) {
    const { userId } = await auth();
    //1- check if user exists
    if (!userId) {
        throw new Error("Not authorized");
    }
    //2- recollir info del user. auth nomes et dona el id del user, pero l'obj de clerkclient et dona mlta mes info: nom, email ,metadata..per aixo treu "user" d'alla
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    //3- recollir el input del form de /payment com un string i ho passem a num
    const lessonsToBuyStr = formData.get("lessons") as string;
    const lessonsToBuy = parseInt(lessonsToBuyStr, 10);
    //4- validar q el num sigui normal
    if (isNaN(lessonsToBuy) || lessonsToBuy <= 0 || !Number.isInteger(lessonsToBuy)) {
        throw new Error("Invalid lessons amount");
    }

    /* 5- Read current unscheduled lessons. public metadata is a place where you can store custom data about the user. aqui
    agafem el num de unscheduled lessons si ja existia, i sino li diem que es undefined.*/

    const currentUnscheduledValues = user.publicMetadata.unscheduled_lessons as number | undefined;
    const currentCount = currentUnscheduledValues ?? 0; //nullish coalescing operator, if the value is undefined it gives 0 as the value

    const newTotal = currentCount + lessonsToBuy;
    //6- aqui afegim el parametre unscheduled lessons al publicmetadata
    try {
        await client.users.updateUser(userId, {
            publicMetadata: {
                ...user.publicMetadata,
                unscheduled_lessons: newTotal
            },
        });
    } catch (error) {
        console.error("Failed to update unscheduled lessons:", error);
        throw new Error("Failed to process purchase");
    }
    //7- refresh dashboard amb el nou num de unscheduled lessons i redirigir alla 
    revalidatePath("/dashboard");
    redirect("/dashboard");
}
