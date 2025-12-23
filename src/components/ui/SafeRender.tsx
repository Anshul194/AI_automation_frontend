import React from "react";

/**
 * SafeRender: Prevents rendering objects as React children, avoiding React crash.
 * If the value is an object (not a valid React element), it stringifies it or renders a fallback.
 *
 * Usage: <SafeRender value={something} />
 */
export function SafeRender({ value, fallback = null }: { value: any; fallback?: React.ReactNode }) {
  if (
    value === null ||
    value === undefined ||
    typeof value === "boolean"
  ) {
    return <>{fallback}</>;
  }
  // Allow valid React elements
  if (React.isValidElement(value)) {
    return value;
  }
  // Allow string/number
  if (typeof value === "string" || typeof value === "number") {
    return <>{value}</>;
  }
  // If it's an object, render JSON or fallback
  if (typeof value === "object") {
    try {
      return <>{JSON.stringify(value)}</>;
    } catch {
      return <>{fallback}</>;
    }
  }
  // Fallback for other types
  return <>{fallback}</>;
}
