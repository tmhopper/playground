"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function createContact(formData: FormData) {
  const userId = await requireUserId();
  const name = ((formData.get("name") as string) || "").trim();
  if (!name) return;

  const companyId = (formData.get("companyId") as string) || null;

  const contact = await prisma.contact.create({
    data: {
      userId,
      name,
      role: (formData.get("role") as string) || null,
      email: (formData.get("email") as string) || null,
      phone: (formData.get("phone") as string) || null,
      linkedinUrl: (formData.get("linkedinUrl") as string) || null,
      address: (formData.get("address") as string) || null,
      notes: (formData.get("notes") as string) || "",
    },
  });

  if (companyId) {
    await prisma.contactLink.create({
      data: { contactId: contact.id, companyId },
    });
  }

  revalidatePath("/contacts");
}

export async function deleteContact(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const contact = await prisma.contact.findFirst({ where: { id, userId } });
  if (!contact) return;
  await prisma.contact.delete({ where: { id } });
  revalidatePath("/contacts");
}
