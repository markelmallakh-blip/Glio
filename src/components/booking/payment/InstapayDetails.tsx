import { instapayAccount } from "@/content/payment";
import { CopyButton } from "@/components/ui/CopyButton";
import { formatEGP } from "@/lib/utils";

/** Beneficiary details the customer copies into their banking app. */
export function InstapayDetails({ amount }: { amount: number }) {
  const rows = [
    { label: "Amount to transfer", value: formatEGP(amount), copy: String(amount) },
    { label: "Beneficiary name", value: instapayAccount.beneficiary },
    { label: "Bank", value: instapayAccount.bank },
    { label: "Account number", value: instapayAccount.accountNumber, mono: true },
    { label: "InstaPay address", value: instapayAccount.instapayAddress, mono: true },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-grey">
        Transfer the amount below from any bank app using InstaPay, then upload the receipt so our
        team can confirm your booking.
      </p>
      <dl className="divide-y divide-line-soft rounded-[1.25rem] border border-line">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex min-w-0 flex-col gap-0.5">
              <dt className="text-xs text-grey">{row.label}</dt>
              <dd
                className={
                  row.mono
                    ? "font-mono text-base font-semibold tracking-wide break-all"
                    : "text-base font-semibold"
                }
              >
                {row.value}
              </dd>
            </div>
            <CopyButton value={row.copy ?? row.value} label={row.label} />
          </div>
        ))}
      </dl>
      <p className="text-xs text-grey">
        Demo account details. Replace them with GLIO’s real InstaPay account before launch.
      </p>
    </div>
  );
}
