import { Icon } from "@/components/ui/Icon";

type ItemActionsProps = { label: string; onEdit: () => void; onRemove: () => void };

/** Round edit / delete buttons used on saved car and address cards. */
export function ItemActions({ label, onEdit, onRemove }: ItemActionsProps) {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex size-10 items-center justify-center rounded-full bg-surface transition-colors hover:bg-line-soft"
      >
        <Icon name="edit" size={20} />
        <span className="sr-only">Edit {label}</span>
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="inline-flex size-10 items-center justify-center rounded-full bg-danger-soft text-danger transition-colors hover:bg-danger hover:text-white"
      >
        <Icon name="trash" size={20} />
        <span className="sr-only">Remove {label}</span>
      </button>
    </div>
  );
}
