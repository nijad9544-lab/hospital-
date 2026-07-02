"use client";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  title: string;
  key: string;
  options: FilterOption[];
}

export function FilterBar({
  groups,
  selected,
  onChange,
}: {
  groups: FilterGroup[];
  selected: Record<string, string[]>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <aside className="w-full space-y-6 rounded-card bg-white p-5 shadow-soft lg:w-64">
      {groups.map((group) => (
        <div key={group.key}>
          <h3 className="mb-3 text-sm font-semibold text-darktext">{group.title}</h3>
          <div className="space-y-2">
            {group.options.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-2 text-sm text-muted"
              >
                <input
                  type="checkbox"
                  checked={selected[group.key]?.includes(opt.value) ?? false}
                  onChange={() => onChange(group.key, opt.value)}
                  className="h-4 w-4 rounded accent-primary"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
