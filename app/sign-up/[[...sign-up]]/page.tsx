import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadatra: Metadata = {
  title: "Sign Un | NoteAi",
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
