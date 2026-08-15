"use client";

import { useActionState } from "react";
import { Field, TextInput } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/ui";
import { changePassword, type ChangePasswordState } from "./actions";

const initialState: ChangePasswordState = {};

export default function ChangePasswordForm() {
  const [state, action] = useActionState(changePassword, initialState);

  return (
    <form action={action} className="max-w-sm space-y-4">
      <Field label="Current password">
        <TextInput type="password" name="currentPassword" required />
      </Field>
      <Field label="New password">
        <TextInput type="password" name="newPassword" required />
      </Field>
      <Field label="Confirm new password">
        <TextInput type="password" name="confirmPassword" required />
      </Field>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && <p className="text-sm text-emerald-600">{state.success}</p>}
      <SubmitButton>Change password</SubmitButton>
    </form>
  );
}
