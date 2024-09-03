"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { notesSchema } from "@/lib/validation/note";
import { Textarea } from "./ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";

interface AddEditNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
}

const AddEditNoteDialog = ({
  open,
  setOpen,
  noteToEdit,
}: AddEditNoteDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof notesSchema>>({
    resolver: zodResolver(notesSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  async function onSubmit(values: z.infer<typeof notesSchema>) {
    setIsLoading(true);
    try {
      if (noteToEdit) {
        const response = await fetch("/api/notes", {
          method: "PUT",
          body: JSON.stringify({
            id: noteToEdit.id,
            ...values,
          }),
        });
        if (!response.ok) throw new Error(`Status code: ${response.status}`);
      } else {
        const response = await fetch("/api/notes", {
          method: "POST",
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error(`Status code: ${response.status}`);
        form.reset();
      }
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteNote() {
    if (!noteToEdit) return;
    setIsDeleting(true);

    try {
      const response = await fetch("/api/notes", {
        method: "DELETE",
        body: JSON.stringify({ id: noteToEdit.id }),
      });

      if (!response.ok) throw new Error(`Status code: ${response.status}`);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      alert("Something went wrong please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{noteToEdit ? "Edit Note" : "Add Note"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} className="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="content"
                      className="outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                noteToEdit ? (
                  <>
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                    Adding...
                  </>
                )
              ) : noteToEdit ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
            {noteToEdit && (
              <Button
                onClick={deleteNote}
                disabled={isDeleting}
                className="ml-2"
                type="submit"
                variant="destructive"
              >
                {isDeleting ? (
                  <>
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditNoteDialog;
