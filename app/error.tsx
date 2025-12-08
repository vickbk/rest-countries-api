"use client";

import { ErrorElement } from "./components/common/error-element";

export default function Error(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorElement {...props} />;
}
