"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const MAX_TITLE = 140;
const MAX_DESCRIPTION = 2000;
const MAX_SHORT_FIELD = 300;

export async function submitProblem(formData: FormData) {
  // Honeypot: real users never fill this hidden field.
  if (String(formData.get("website") ?? "").trim() !== "") {
    redirect("/submit?submitted=1");
  }

  const title = String(formData.get("title") ?? "").trim().slice(0, MAX_TITLE);
  const category = String(formData.get("category") ?? "")
    .trim()
    .slice(0, MAX_SHORT_FIELD);
  const description = String(formData.get("description") ?? "")
    .trim()
    .slice(0, MAX_DESCRIPTION);
  const scale = String(formData.get("scale") ?? "").trim().slice(0, MAX_SHORT_FIELD);
  const source = String(formData.get("source") ?? "").trim().slice(0, MAX_SHORT_FIELD);

  if (!title || !category || !description) {
    redirect("/submit?error=missing");
  }

  await prisma.problem.create({
    data: {
      title,
      category,
      description,
      scale: scale || null,
      source: source || null,
      approved: false,
    },
  });

  redirect("/submit?submitted=1");
}

function checkAdminKey(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  if (!process.env.ADMIN_SECRET || key !== process.env.ADMIN_SECRET) {
    throw new Error("Unauthorized");
  }
}

export async function approveProblem(formData: FormData) {
  checkAdminKey(formData);
  const id = Number(formData.get("id"));
  await prisma.problem.update({ where: { id }, data: { approved: true } });
  revalidatePath("/moderate");
  revalidatePath("/problems");
  revalidatePath("/");
}

export async function rejectProblem(formData: FormData) {
  checkAdminKey(formData);
  const id = Number(formData.get("id"));
  await prisma.problem.delete({ where: { id } });
  revalidatePath("/moderate");
}
