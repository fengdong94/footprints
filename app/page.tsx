import prisma from "@/lib/prisma";
import { Map } from "@/components/index";

export default async function Home() {
  const users = await prisma.users.findMany();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        user list:
        {users.map((user) => (
          <div key={user.id}>
            id: {user.id}, name: {user.name}
          </div>
        ))}
        <Map />
      </main>
    </div>
  );
}
