import { ActivityIndicator, Button, View } from "react-native";
import { usePaymentSheet } from "@/features/checkout/hooks/use-payment-sheet";

export function CheckoutScreen() {
  const { ready, openPaymentSheet } = usePaymentSheet();

  if (!ready) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <Button title="Checkout" onPress={openPaymentSheet} />
    </View>
  );
}
