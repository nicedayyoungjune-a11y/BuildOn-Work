export const PAYMENT_OPTIONS = ["same_day", "weekly"] as const;

export type PaymentOption = (typeof PAYMENT_OPTIONS)[number];

export const PAYMENT_OPTION_LABELS: Record<PaymentOption, string> = {
  same_day: "당일 지급",
  weekly: "주급"
};
