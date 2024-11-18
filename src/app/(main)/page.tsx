import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("api/auth/signin")
  }
  return (
    <main className="flex justify-between min-h-screen items-center flex-col p-24">
        <VideoPlayer/>
    </main>
  );
}
