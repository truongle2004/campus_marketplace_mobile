import { useAuth } from "@clerk/expo";
import { type Href, Redirect } from "expo-router";
import type { ReactNode } from "react";

import { AuthLoading } from "@/components/auth/auth-loading";
import type { AuthCheck } from "@/types/auth";

type Props = {
  check: AuthCheck;
  children: ReactNode;
  fallbackHref?: Href;
};

export function RequirePermission({
  check,
  children,
  fallbackHref = "/",
}: Props) {
  const { isLoaded, has } = useAuth();

  if (!isLoaded) {
    return <AuthLoading />;
  }

  if (!has(check)) {
    return <Redirect href={fallbackHref} />;
  }

  return children;
}
