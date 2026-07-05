import type { PaymentOption } from "@/types/paymentOption";

export type MockPaymentOption = {
  id: PaymentOption;
  label: string;
  description: string;
};

export const mockPaymentOptions: MockPaymentOption[] = [
  {
    id: "same_day",
    label: "당일 지급",
    description: "근무 완료 후 당일 지급을 선호하는 방식입니다."
  },
  {
    id: "weekly",
    label: "주급",
    description: "한 주 단위로 지급 일정을 확인하는 방식입니다."
  }
];
