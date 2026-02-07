/**
 * Formateo de moneda, DNI y teléfono para Argentina.
 */

const ARS_FORMATTER = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const ARS_FORMATTER_DECIMALS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatARS(value: number, withDecimals = false): string {
  if (typeof value !== "number" || Number.isNaN(value)) return ARS_FORMATTER.format(0);
  return withDecimals ? ARS_FORMATTER_DECIMALS.format(value) : ARS_FORMATTER.format(Math.round(value));
}

export function formatDNI(value: string): string {
  if (!value || typeof value !== "string") return "";
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatPhone(value: string): string {
  if (!value || typeof value !== "string") return "";
  return value.replace(/\D/g, "").slice(0, 10);
}

export function parseNumberFromARS(formatted: string): number {
  if (!formatted || typeof formatted !== "string") return 0;
  const parsed = formatted.replace(/[^\d,.-]/g, "").replace(",", ".");
  const num = parseFloat(parsed);
  return Number.isNaN(num) ? 0 : num;
}
