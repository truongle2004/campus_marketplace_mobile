import { apiPost } from "@/lib/api/client";
import type { PaymentSheetParams } from "@/types/payment";

export function fetchPaymentSheetParams(
  customerId: string,
  amount: number,
  currency: string,
): Promise<PaymentSheetParams> {
  return apiPost<PaymentSheetParams>("api/v1/payments/sheet", {
    customerId,
    amount,
    currency,
  });
}
