import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("api/auth/signin")
  }
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <iframe
          src="https://iframe.mediadelivery.net/embed/340348/7ccb80ee-5931-43e5-aa2e-1098ef6c8f34?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
          loading="lazy"
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowFullScreen={true}
        ></iframe>
    </main>
  );
}
