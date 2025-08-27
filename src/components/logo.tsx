import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className={cn("relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10", props.className)}>
        <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        className=""
        >
        <path
            d="M12 8L9.5 5.5L7 8L9.5 10.5L12 8Z"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
        />
        <path
            d="M8 12L5.5 9.5L3 12L5.5 14.5L8 12Z"
            stroke="hsl(var(--accent))"
            strokeWidth="1.5"
        />
        <path
            d="M16 12L18.5 9.5L21 12L18.5 14.5L16 12Z"
            stroke="hsl(var(--accent))"
            strokeWidth="1.5"
        />
        <path
            d="M12 16L14.5 18.5L17 16L14.5 13.5L12 16Z"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
        />
        </svg>
    </div>
  );
}
