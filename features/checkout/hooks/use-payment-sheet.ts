import { useStripe } from "@stripe/stripe-react-native";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { fetchPaymentSheetParams } from "@/lib/api/payment-sheet";

const DEFAULT_CUSTOMER_ID = "cus_UeeLcNdL6n06r7";

export function usePaymentSheet(customerId = DEFAULT_CUSTOMER_ID) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [ready, setReady] = useState(false);

  const initializePaymentSheet = useCallback(async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams(customerId, 19000, "eur");

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });

    if (!error) {
      setReady(true);
    }
  }, [customerId, initPaymentSheet]);

  const openPaymentSheet = useCallback(async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  }, [presentPaymentSheet]);

  useEffect(() => {
    initializePaymentSheet();
  }, [initializePaymentSheet]);

  return { ready, openPaymentSheet };
}
