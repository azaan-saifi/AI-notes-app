import { SignIn } from "@clerk/nextjs";

import { Metadata } from "next";

export const metadatra: Metadata = {
  title: "Sign In | NoteAI",
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
