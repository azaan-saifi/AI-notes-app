import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadatra: Metadata = {
  title: "Sign Un | NoteAI",
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
