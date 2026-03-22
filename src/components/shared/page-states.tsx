import type { ReactNode } from "react";

import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StateCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  action?: ReactNode;
};

function StateCard({ title, description, icon, action }: StateCardProps) {
  return (
    <Card className="border-dashed">
      <CardHeader className="items-center text-center">
        <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground max-w-md text-sm">{description}</p>
        {action}
      </CardContent>
    </Card>
  );
}

export function LoadingState({
  title = "Loading data",
  description = "Please wait while SkyKeep prepares this view.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <StateCard
      title={title}
      description={description}
      icon={<LoaderCircle className="size-5 animate-spin" />}
    />
  );
}

export function ErrorState({
  title = "Unable to load data",
  description,
  action,
}: {
  title?: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <StateCard
      title={title}
      description={description}
      icon={<AlertCircle className="size-5" />}
      action={action}
    />
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <StateCard
      title={title}
      description={description}
      icon={<Inbox className="size-5" />}
      action={action}
    />
  );
}
