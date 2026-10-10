"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState, type DragEvent } from "react";
import { RECEIPT_ACCEPT, RECEIPT_MAX_BYTES } from "@/content/payment";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type ReceiptUploadProps = {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;

export function validateReceipt(file: File | null): string | undefined {
  if (!file) return "Upload your transfer receipt so we can confirm the payment.";
  if (!RECEIPT_ACCEPT.split(",").includes(file.type))
    return "Use an image (PNG, JPG, HEIC) or a PDF.";
  if (file.size > RECEIPT_MAX_BYTES) return "The file is larger than 10 MB.";
  return undefined;
}

export function ReceiptUpload({ file, onChange, error }: ReceiptUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const preview = useMemo(
    () => (file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null),
    [file],
  );

  // Release the object URL when the file changes or the component unmounts.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    const dropped = event.dataTransfer.files[0];
    if (dropped) onChange(dropped);
  }

  return (
    <div className="flex flex-col gap-2">
      <p id={`${id}-label`} className="text-base font-bold">
        Upload transfer receipt
      </p>
      {file ? (
        <div className="flex items-center gap-3 rounded-[1.25rem] border border-lime-strong bg-lime-tint p-3">
          {preview ? (
            <Image
              src={preview}
              alt="Receipt preview"
              width={56}
              height={56}
              unoptimized
              className="size-14 rounded-lg object-cover"
            />
          ) : (
            <span className="flex size-14 items-center justify-center rounded-lg bg-white">
              <Icon name="file" size={26} />
            </span>
          )}
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-sm font-semibold">{file.name}</p>
            <p className="text-xs text-grey">{formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-sm font-semibold underline underline-offset-4"
          >
            Remove
          </button>
        </div>
      ) : (
        <label
          htmlFor={`${id}-input`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-2 rounded-[1.25rem] border-2 border-dashed px-4 py-7 text-center transition-colors focus-within:ring-2 focus-within:ring-lime-strong",
            error
              ? "border-danger"
              : dragging
                ? "border-ink bg-lime-tint"
                : "border-line hover:border-ink",
          )}
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-surface">
            <Icon name="upload" />
          </span>
          <span className="text-sm font-semibold">Drop the receipt here or browse</span>
          <span className="text-xs text-grey">Screenshot or PDF · up to 10 MB</span>
        </label>
      )}
      <input
        ref={inputRef}
        id={`${id}-input`}
        type="file"
        accept={RECEIPT_ACCEPT}
        aria-labelledby={`${id}-label`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        className="sr-only"
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
