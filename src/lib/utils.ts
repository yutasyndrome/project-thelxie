import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function excerptFromMarkdown(markdown: string): string {
  const cleaned = markdown.replace(/[#*\-`_~\[\]\(\)!>\r\n]/g, ' ');
  const normalized = cleaned.replace(/\s+/g, ' ').trim();
  return normalized;
}

export function firstChars(
  input: string | undefined | null,
  count = 2,
): string {
  if (!input) return '';
  return Array.from(String(input).trim()).slice(0, count).join('');
}

export function getCssVarPx(varName: string, fallbackPx = 0): number {
  if (typeof window === 'undefined') return fallbackPx;

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();

  if (!raw) return fallbackPx;

  if (raw.endsWith('rem')) {
    const rem = Number.parseFloat(raw);
    const rootFontSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    const value = rem * rootFontSize;
    return Number.isFinite(value) ? value : fallbackPx;
  }

  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : fallbackPx;
}

export function normalizeTagPathSegment(tag: string): string {
  return tag.toLowerCase();
}

export function isTagPathSegment(tag: string, pathSegment: string): boolean {
  return normalizeTagPathSegment(tag) === normalizeTagPathSegment(pathSegment);
}
