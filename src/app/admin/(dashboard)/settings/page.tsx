import { verifyAdminSession } from "@/lib/auth/dal";
import { PageHeader, Card } from "@/components/admin/fields";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function SettingsPage() {
  const session = await verifyAdminSession();

  return (
    <div>
      <PageHeader title="Account settings" description={`Signed in as ${session.username}.`} />
      <Card title="Change password">
        <ChangePasswordForm />
      </Card>
    </div>
  );
}
