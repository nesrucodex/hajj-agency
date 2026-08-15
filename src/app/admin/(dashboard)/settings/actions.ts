"use server";

import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/auth/dal";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { str } from "@/lib/admin/form";

export interface ChangePasswordState {
  error?: string;
  success?: string;
}

export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const session = await verifyAdminSession();
  const currentPassword = str(formData, "currentPassword");
  const newPassword = str(formData, "newPassword");
  const confirmPassword = str(formData, "confirmPassword");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "Fill in every field." };
  }
  if (newPassword.length < 4) {
    return { error: "New password must be at least 4 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "New password and confirmation don't match." };
  }

  const user = await prisma.adminUser.findUnique({ where: { id: session.userId } });
  if (!user || !(await verifyPassword(currentPassword, user.passwordHash))) {
    return { error: "Current password is incorrect." };
  }

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(newPassword) },
  });

  return { success: "Password updated." };
}
