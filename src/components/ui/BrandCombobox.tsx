"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const VEHICLE_BRANDS = [
  "Tata",
  "Mahindra",
  "Maruti Suzuki",
  "Hyundai",
  "Honda",
  "Toyota",
  "Ford",
  "Volkswagen",
  "Renault",
  "Nissan",
  "Kia",
  "MG",
  "Isuzu",
  "Ashok Leyland",
  "Force Motors",
  "Bajaj",
  "TVS",
  "Hero",
  "Yamaha",
  "Suzuki",
  "Royal Enfield",
  "BMW",
  "Mercedes-Benz",
  "Volvo",
  "Audi",
  "Skoda",
  "Jeep",
];

export function BrandCombobox({
  value,
  onChange,
  theme = "dark",
  hasError = false,
  onBlur,
  name,
}: {
  value: string;
  onChange: (value: string) => void;
  theme?: "dark" | "light";
  hasError?: boolean;
  onBlur?: () => void;
  name?: string;
}) {
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suppressReopenRef = useRef(false);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const listItems = useMemo(() => {
    const query = value.trim().toLowerCase();
    const matches = query ? VEHICLE_BRANDS.filter((brand) => brand.toLowerCase().includes(query)) : VEHICLE_BRANDS;
    return ["Select Vehicle Brand", ...matches, "Others"];
  }, [value]);

  function selectItem(item: string) {
    if (item === "Others") {
      setCustomMode(true);
      onChange("");
    } else if (item === "Select Vehicle Brand") {
      setCustomMode(false);
      onChange("");
    } else {
      setCustomMode(false);
      onChange(item);
    }
    setOpen(false);
    suppressReopenRef.current = true;
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <div ref={ref} className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (suppressReopenRef.current) {
              suppressReopenRef.current = false;
              return;
            }
            setOpen(true);
          }}
          onBlur={onBlur}
          placeholder={customMode ? "Enter your vehicle brand" : "Select Vehicle Brand"}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            "h-12 w-full rounded-xl border pl-4 pr-10 text-sm outline-none transition-colors",
            isDark ? "bg-white/5 text-white placeholder:text-ink-400" : "bg-white text-ink-900 placeholder:text-ink-400",
            hasError
              ? "border-amber-500 focus:border-amber-500"
              : isDark
                ? "border-white/10 focus:border-accent-500"
                : "border-ink-200 focus:border-primary-500"
          )}
        />
        <button
          type="button"
          aria-label="Toggle brand list"
          onClick={() => setOpen((v) => !v)}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center"
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              open && "rotate-180",
              "text-ink-400"
            )}
          />
        </button>
      </div>

      {open && (
        <div
          role="listbox"
          className={cn(
            "absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border shadow-[var(--shadow-premium-lg)]",
            isDark ? "border-white/10 bg-ink-900" : "border-border bg-white"
          )}
        >
          <ul className="thin-scrollbar max-h-52 overflow-auto overscroll-contain p-1.5">
            {listItems.map((item) => {
              const isPlaceholder = item === "Select Vehicle Brand";
              const isOthers = item === "Others";
              const isSelected = isPlaceholder ? value === "" && !customMode : isOthers ? customMode : value === item;
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => selectItem(item)}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      isDark ? "text-ink-200 hover:bg-white/10" : "text-ink-700 hover:bg-ink-100",
                      isPlaceholder && (isDark ? "text-ink-400" : "text-ink-400"),
                      isSelected && (isDark ? "bg-white/10 text-white" : "bg-primary-50 text-primary-700")
                    )}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
