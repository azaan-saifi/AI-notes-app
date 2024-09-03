import Note from "@/components/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Notes | NoteAi",
};

const NotesPage = async () => {
  const { userId } = auth();

  if (!userId) throw new Error("user not defined");

  const allnotes = await prisma.note.findMany({ where: { userId } });

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allnotes.length > 0 ? (
        allnotes.map((note) => <Note key={note.id} note={note} />)
      ) : (
        <div className="col-span-full flex h-[550px] items-center justify-center">
          <p>{`You don't have any notes yet.`}</p>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
