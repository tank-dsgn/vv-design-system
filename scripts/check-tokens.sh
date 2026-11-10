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
# Checked per declaration, not per line: a line that also holds a var(--) must not hide a raw value.
# An inset 0 0 0 Npx ring is a border drawn with a shadow; z-index up to 3 and auto order siblings locally (a focused button over its neighbours).
report "No raw radius, shadow, font family, size or stacking" "$(
  find . -name '*.css' ! -path './styles/tokens.css' -exec perl -ne '
    while (/\b(border-radius|box-shadow|font-family|font-size|letter-spacing|z-index)\s*:\s*([^;{}]+)/g) {
      my ($p, $v) = ($1, $2); (my $t = $v) =~ s/var\([^()]*(\([^()]*\))?[^()]*\)//g; $t =~ s/!important//; $t =~ s/^\s+|\s+$//g;
      next if $t eq "" || $t =~ /^(0|none|inherit|50%)$/ || $t =~ /^[0\s]+$/ || ($v =~ /var\(/ && $t =~ /^calc\(\s*[-+]\s*\d+\s*\)$/);
      next if $p eq "box-shadow" && $t =~ /^(inset\s+)?0\s+0\s+0\s+\d+px$/;
      next if $p eq "z-index" && $t =~ /^(-?[0-3]|auto)$/;
      print "$ARGV:$.: $p: $v\n";
    }
    close ARGV if eof' {} +
)"
report "No emoji or text glyphs as icons" "$(
  find . -name '*.tsx' -exec perl -CSD -ne 'print "$ARGV:$.: $_" if /[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]/; close ARGV if eof' {} +
)"
# WorkflowsPage: "Unlock" is a literal action on the canvas lock.
report "No marketing register in copy" "$(
  grep -rniE '\b(elevate|unlock|empower|seamless|effortless|supercharge|get started|learn more)\b|[a-z]!\s*["<]' . --include=*.tsx --include=*.mdx | grep -v 'WorkflowsPage.tsx'
)"
# Components read type roles: the scale behind them is for tokens.css and the docs.
report "Components read type roles, not the scale" "$(
  grep -nE -- '--(font-size|line-height|font-weight)-' components/*.css
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
# Spacing reads the scale: padding, margin and gap take --space-* or 0, never raw px.
# The -1px margins are the visually-hidden pattern and the shared border of grouped controls.
# SeverityPill: the 1px between its bars is part of the glyph, not spacing.
report "Spacing reads --space-*, not raw values" "$(
  find . -name '*.css' ! -path './styles/tokens.css' ! -path './components/SeverityPill.css' -exec perl -ne '
    (my $t = $_) =~ s/var\([^)]*\)//g;
    print "$ARGV:$.: $_" if $t =~ /(padding|margin|gap)[a-z-]*:[^;]*\d(px|rem|em)\b/ && $t !~ /margin(-left)?:\s*-1px;/;
    close ARGV if eof' {} +
)"
# A component's height is a token or a hairline. 1px is the visually-hidden
# pattern and the dividers. BarChart, DonutChart and Checkbox are exempt: their
# 5 and 10px are glyph shapes — a swatch, a tick — drawn rather than laid out.
report "Component heights read the scale" "$(
  find components -name '*.css' ! -name 'BarChart.css' ! -name 'DonutChart.css' ! -name 'Checkbox.css' -exec perl -ne '
    while (/(?<![-a-z])((?:min-)?height)\s*:\s*([^;,]+)/g) {
      my ($p, $v) = ($1, $2); (my $t = $v) =~ s/var\([^()]*(\([^()]*\))?[^()]*\)//g; $t =~ s/!important//; $t =~ s/^\s+|\s+$//g;
      next unless $t =~ /^(\d+)px$/;
      next if $1 =~ /^(0|1|2|4|6|8|12|16|20|24|32|40|48|56|64|80|96|120)$/;
      print "$ARGV:$.: $p: $v\n";
    }
    close ARGV if eof' {} +
)"
# The sidebar lists a component once: its examples live on its page, so they carry !dev.
report "Every component's examples stay out of the sidebar" "$(
  grep -L '"!dev"' components/*.stories.tsx
)"
# Every component is filed in docs/groups.ts under the group its title names.
report "Every component sits in its group" "$(
  for f in components/*.stories.tsx; do n=$(basename "$f" .stories.tsx); g=$(sed -n 's/.*title: "Components\/\([A-Za-z]*\)\/'"$n"'".*/\1/p' "$f"); grep -q "^  $g: \[.*\"$n\"" docs/groups.ts || echo "not filed: $n"; done
)"
exit $fail
