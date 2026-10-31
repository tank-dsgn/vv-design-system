/* Reads tokens.css itself, so the Foundations pages cannot drift from the
   file components actually consume. */
import css from "../styles/tokens.css?raw"

export type Token = { name: string; value: string }

function block(selector: RegExp): string {
  let out = ""
  for (const m of css.matchAll(selector)) out += m[1]
  return out
}

function parse(src: string): Token[] {
  const clean = src.replace(/\/\*[\s\S]*?\*\//g, "")
  const tokens: Token[] = []
  for (const m of clean.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    tokens.push({ name: m[1], value: m[2].replace(/\s+/g, " ").trim() })
  }
  return tokens
}

export const lightTokens = parse(block(/:root[^{]*\{([\s\S]*?)\n\}/g))
export const darkTokens = parse(block(/\.dark[^{]*\{([\s\S]*?)\n\}/g))

export const byPrefix = (prefix: string, list = lightTokens) => list.filter((t) => t.name.startsWith(prefix))

export const darkValue = (name: string) => darkTokens.find((t) => t.name === name)?.value

/** The primitive a semantic value points at, or null for a literal. */
export const primitiveOf = (value?: string) => value?.match(/^var\(--([a-z0-9-]+)\)$/)?.[1] ?? null

/** The Tailwind step a value rests on: `--brand-*` is only a pointer to one, so it is
 *  named by what it points at. */
export function tailwindStep(value?: string) {
  const step = primitiveOf(value)
  if (!step?.startsWith("brand-")) return step
  return primitiveOf(lightTokens.find((t) => t.name === `--${step}`)?.value) ?? step
}

/** Follows var() to the raw value at the bottom. */
export function rawValue(value?: string): string {
  const next = primitiveOf(value)
  if (!next) return value ?? ""
  return rawValue(lightTokens.find((t) => t.name === `--${next}`)?.value)
}

export const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
export const RAMPS = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]
