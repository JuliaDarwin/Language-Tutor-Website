import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthCallback() {
    const { sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role;

    if (role === "admin") {
        redirect("/admin");
    } else {
        redirect("/dashboard");
    }
}
