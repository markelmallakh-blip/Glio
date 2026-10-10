import { type EgyptianPlate } from "@/types/booking";

const ARABIC_INDIC = "٠١٢٣٤٥٦٧٨٩";

/** Keeps 0-9 (converting Arabic-Indic digits), max 4. */
export function normalizePlateNumbers(value: string) {
  return value
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_INDIC.indexOf(digit)))
    .replace(/\D/g, "")
    .slice(0, 4);
}

/** Keeps Arabic letters only, max 3, spaced like the physical plate ("ك ا ي"). */
export function normalizePlateLetters(value: string) {
  const letters = value.replace(/[^ء-ي]/g, "").slice(0, 3);
  return letters.split("").join(" ");
}

export function plateLetterCount(letters: string) {
  return letters.replace(/\s/g, "").length;
}

export function isPlateEmpty(plate: EgyptianPlate | null) {
  return !plate || (!plate.numbers && !plate.letters);
}

export function validatePlate(plate: EgyptianPlate | null): string | undefined {
  if (isPlateEmpty(plate) || !plate) return undefined;
  if (!plate.numbers || plate.numbers.length > 4) return "Add 1–4 plate numbers.";
  const count = plateLetterCount(plate.letters);
  if (count < 1 || count > 3) return "Add 1–3 Arabic plate letters.";
  return undefined;
}

/** "ك ا ي 239" or null when no plate was given. */
export function formatPlate(plate: EgyptianPlate | null) {
  if (isPlateEmpty(plate) || !plate) return null;
  return `${plate.letters} ${plate.numbers}`.trim();
}
