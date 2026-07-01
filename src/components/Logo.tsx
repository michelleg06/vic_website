import { cn } from "@/lib/utils";

// Official VIC circular emblem. `icon` = mark only, `text` = emblem with the
// curved "Verano Internacional de la Ciencia" ring. JPEGs are cream-square, so
// `rounded-full` crops them to a clean circular badge on any background.
export function Logo({
  variant = "icon",
  className,
}: {
  variant?: "icon" | "text";
  className?: string;
}) {
  const src = variant === "text" ? "/logos/Logo-VIC-texto.jpeg" : "/logos/Logo-VIC.jpeg";
  return (
    <img
      src={src}
      alt="Verano Internacional de la Ciencia"
      className={cn("rounded-full object-cover", className)}
    />
  );
}
