#!/usr/bin/env bash
# The grep checks from .claude/skills/unslop/SKILL.md, as a gate: prints every
# hit and exits 1 if there is any. Kept-on-purpose exceptions are filtered here
# with the reason beside them.
cd "$(dirname "$0")/../src" || exit 2
fail=0
report() { # title, hits
  if [ -n "$2" ]; then echo "✗ $1"; echo "$2"; echo; fail=1; else echo "✓ $1"; fi
}

report "No raw hex outside tokens.css" "$(
  grep -rnE '#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?([0-9a-fA-F]{2})?\b' . --include=*.css | grep -v 'styles/tokens.css'
  grep -rnE 'style=.*#[0-9a-fA-F]{3,8}\b' . --include=*.tsx
)"
# receivables.css: the dot grid on the workflow canvas is a pattern, not decoration.
# Skeleton.css: the running band of light is the loading signal itself.
report "No gradients, blur or text effects" "$(
  grep -rnE 'gradient\(|backdrop-filter|filter:\s*blur|text-shadow|background-clip:\s*text' . --include=*.css --include=*.tsx | grep -vE 'receivables/receivables.css|components/Skeleton.css'
)"
report "No transition: all, no durations outside --duration-*" "$(
  grep -rnE 'transition(-property)?:\s*all' . --include=*.css
  grep -rnE '(transition|animation)[a-z-]*:[^;]*[0-9]m?s\b' . --include=*.css | grep -v 'var(--duration'
)"
report "Motion has a reduced-motion block in the same file" "$(
  for f in $(grep -rlE '@keyframes|transition:|animation:' . --include=*.css); do grep -q 'prefers-reduced-motion' "$f" || echo "$f"; done
)"
report "No raw radius, shadow, font family or size" "$(
  grep -rnE '(border-radius|box-shadow|font-family|font-size|letter-spacing):' . --include=*.css | grep -v 'styles/tokens.css' | grep -vE 'var\(--|:\s*(0|none|inherit|50%)(\s*!important)?\s*;'
)"
report "No emoji or text glyphs as icons" "$(
  find . -name '*.tsx' -exec perl -CSD -ne 'print "$ARGV:$.: $_" if /[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]/; close ARGV if eof' {} +
)"
# WorkflowsPage: "Unlock" is a literal action on the canvas lock.
report "No marketing register in copy" "$(
  grep -rniE '\b(elevate|unlock|empower|seamless|effortless|supercharge|get started|learn more)\b|[a-z]!\s*["<]' . --include=*.tsx --include=*.mdx | grep -v 'WorkflowsPage.tsx'
)"
# Every component page has usage text, and its [links] lead somewhere.
report "Every component has usage, every link resolves" "$(
  for f in components/*.stories.tsx; do n=$(basename "$f" .stories.tsx); grep -q "^  $n: {" docs/usage.ts || echo "no usage: $n"; done
  grep -oE '\[[A-Z][A-Za-z]+\]' docs/usage.ts | tr -d '[]' | sort -u | while read -r n; do [ -f "components/$n.stories.tsx" ] || echo "broken link: $n"; done
)"
# A space token is named by its value: --space-40 is 40px.
report "Space tokens are named by their value" "$(
  sed -n 's/^ *--space-\([0-9]*\): \([0-9]*\)px;.*/\1 \2/p' styles/tokens.css | while read -r a b; do [ "$a" = "$b" ] || echo "--space-$a is ${b}px"; done
)"
# Every component is filed in docs/groups.ts under the group its title names.
report "Every component sits in its group" "$(
  for f in components/*.stories.tsx; do n=$(basename "$f" .stories.tsx); g=$(sed -n 's/.*title: "Components\/\([A-Za-z]*\)\/'"$n"'".*/\1/p' "$f"); grep -q "^  $g: \[.*\"$n\"" docs/groups.ts || echo "not filed: $n"; done
)"
exit $fail
