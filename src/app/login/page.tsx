import { AuthShell } from "@/components/auth-shell";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Sign in to SkyKeep"
      description="Access your files, activity history, and storage insights."
    >
      <LoginForm />
    </AuthShell>
  );
}
