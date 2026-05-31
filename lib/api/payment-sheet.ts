import { apiPost } from "@/lib/api/client";
import type { PaymentSheetParams } from "@/types/payment";

export function fetchPaymentSheetParams(
  customerId: string,
): Promise<PaymentSheetParams> {
  return apiPost<PaymentSheetParams>("/payment-sheet", { customerId });
}
