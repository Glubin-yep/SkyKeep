export type UserActivityType = {
  id: number;
  ipAddress: string;
  browser: string;
  platform: string;
  deviceType: string | null;
  location: string | null;
  userAgent: string | null;
  loginTime: Date;
};
