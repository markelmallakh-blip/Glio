export type CardInput = { number: string; name: string; expiry: string; cvv: string };
export type CardErrors = Partial<Record<keyof CardInput, string>>;

export const emptyCard: CardInput = { number: "", name: "", expiry: "", cvv: "" };

function passesLuhn(digits: string) {
  let sum = 0;
  for (let i = 0; i < digits.length; i += 1) {
    let digit = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function validateCard(card: CardInput, now: Date): CardErrors {
  const errors: CardErrors = {};
  const digits = card.number.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19 || !passesLuhn(digits))
    errors.number = "Enter a valid card number.";
  if (card.name.trim().length < 3) errors.name = "Enter the name shown on the card.";
  const match = card.expiry.match(/^(\d{2})\/(\d{2})$/);
  const month = match ? Number(match[1]) : 0;
  const year = match ? 2000 + Number(match[2]) : 0;
  if (!match || month < 1 || month > 12 || new Date(year, month, 1) <= now)
    errors.expiry = "Use a future MM/YY date.";
  if (!/^\d{3,4}$/.test(card.cvv)) errors.cvv = "3 or 4 digits.";
  return errors;
}

export const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

export const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};
