import { useAuth } from "@clerk/expo";
import { Redirect, type Href } from "expo-router";
import type { ReactNode } from "react";

import { AuthLoading } from "@/components/auth/auth-loading";

type Props = {
  children: ReactNode;
  redirectTo?: Href;
};

export function RequireAuth({
  children,
  redirectTo = "/(auth)/sign-in",
}: Props) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <AuthLoading />;
  }

  if (!isSignedIn) {
    return <Redirect href={redirectTo} />;
  }

  return children;
}
