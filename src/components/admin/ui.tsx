"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

/**
 * Submit button that shows a pending state — for use inside a
 * <form action={...}>. Pass `formAction` to target a different action from
 * the same form (e.g. a "Delete" button inside a "Save" form), and
 * `confirm` to ask for confirmation before that alternate action submits.
 */
export function SubmitButton({
  children,
  pendingLabel,
  variant = "default",
  size = "sm",
  className,
  formAction,
  confirm,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
  formAction?: (formData: FormData) => void;
  confirm?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      variant={variant}
      size={size}
      className={className}
      formAction={formAction}
      onClick={
        confirm
          ? (e) => {
              if (!window.confirm(confirm)) e.preventDefault();
            }
          : undefined
      }
    >
      {pending ? (pendingLabel ?? "Saving…") : children}
    </Button>
  );
}
