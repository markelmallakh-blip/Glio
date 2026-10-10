import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type FieldShellProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  trailingIcon?: IconName;
  prefix?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

/** Label-inside-box input style from the GLIO booking forms. */
function FieldShell({
  id,
  label,
  error,
  hint,
  trailingIcon,
  prefix,
  disabled,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div
        className={cn(
          "flex items-center gap-3 rounded-[0.625rem] border bg-white px-3.5 py-2 transition-colors",
          "focus-within:border-ink focus-within:ring-2 focus-within:ring-lime/70",
          error ? "border-danger" : "border-line",
          disabled && "bg-surface",
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <label htmlFor={id} className="text-sm text-grey">
            {label}
          </label>
          <div className="flex items-center gap-2">
            {prefix ? <span className="shrink-0 whitespace-nowrap">{prefix}</span> : null}
            {children}
          </div>
        </div>
        {trailingIcon ? <Icon name={trailingIcon} className="text-ink" /> : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-grey">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const controlClasses =
  "w-full min-w-0 bg-transparent text-base font-semibold text-ink placeholder:font-normal placeholder:text-grey-light focus:outline-none disabled:text-grey";

type TextFieldProps = Omit<ComponentPropsWithoutRef<"input">, "prefix"> & {
  label: string;
  error?: string;
  hint?: string;
  trailingIcon?: IconName;
  prefix?: ReactNode;
  containerClassName?: string;
};

export function TextField({
  label,
  error,
  hint,
  trailingIcon,
  prefix,
  containerClassName,
  id,
  disabled,
  ...props
}: TextFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell
      id={fieldId}
      label={label}
      error={error}
      hint={hint}
      trailingIcon={trailingIcon}
      prefix={prefix}
      disabled={disabled}
      className={containerClassName}
    >
      <input
        id={fieldId}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={controlClasses}
        {...props}
      />
    </FieldShell>
  );
}

type SelectFieldProps = ComponentPropsWithoutRef<"select"> & {
  label: string;
  error?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function SelectField({
  label,
  error,
  containerClassName,
  id,
  children,
  ...props
}: SelectFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell
      id={fieldId}
      label={label}
      error={error}
      trailingIcon="chevron-down"
      className={containerClassName}
    >
      <select
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(controlClasses, "-mr-9 cursor-pointer appearance-none pr-9")}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
}

type TextAreaFieldProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  error?: string;
  containerClassName?: string;
};

export function TextAreaField({
  label,
  error,
  containerClassName,
  id,
  rows = 3,
  ...props
}: TextAreaFieldProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell id={fieldId} label={label} error={error} className={containerClassName}>
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(controlClasses, "resize-none")}
        {...props}
      />
    </FieldShell>
  );
}
