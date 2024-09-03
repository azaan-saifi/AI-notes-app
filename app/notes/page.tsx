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

  return <div>{JSON.stringify(allnotes)}</div>;
};

export default NotesPage;
