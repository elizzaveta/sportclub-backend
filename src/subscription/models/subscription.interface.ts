export interface SubscriptionInterface {
  name: string;
  description: string;
  price: number;
  duration: number;
  entry_time: Date;
  exit_time: Date;
  isAvailable: boolean;
}
