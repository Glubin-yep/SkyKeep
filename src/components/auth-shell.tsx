import type { ReactNode } from "react";

import logo from "@/assets/logo.svg";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-muted/40 p-6 md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(148,163,184,0.16),_transparent_40%)]" />
      <div className="relative flex w-full max-w-md flex-col gap-6">
        <div className="flex items-center justify-center gap-3">
          <div className="bg-card flex size-12 items-center justify-center rounded-2xl border shadow-sm">
            <img src={logo} alt="SkyKeep" className="size-7" />
          </div>
          <div className="text-left">
            <p className="text-lg font-semibold tracking-tight">SkyKeep</p>
            <p className="text-muted-foreground text-sm">
              Secure cloud file workspace
            </p>
          </div>
        </div>
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
