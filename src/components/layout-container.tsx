import type { ReactNode } from "react";

type LayoutContainerProps = {
  children: ReactNode;
};

export function LayoutContainer({ children }: LayoutContainerProps) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>;
}
