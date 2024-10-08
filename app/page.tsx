import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Home = () => {
  const { userId } = auth();

  if (userId) redirect("/notes");

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image
          src={"/assets/logo.png"}
          alt="NoteAI Logo"
          width={100}
          height={100}
        />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          NoteAi
        </span>
      </div>
      <p className="max-w-prose text-center">
        An intelligent note taking app with AI integration, built with OpenAI,
        Pinecone, Next.js, Shadcn UI, Clerk, and more.
      </p>
      <Button size={"lg"} asChild>
        <Link href={"/notes"}>Let&apos;s Start</Link>
      </Button>
    </main>
  );
};

export default Home;
