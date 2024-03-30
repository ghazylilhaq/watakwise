import { auth, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();

  console.log(user);

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Nextjs Main page</h1>
    </main>
  );
}
