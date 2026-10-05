/**
 * The look of the generated pages.
 *
 * Only what these pages add: the design tokens and the reset are read from
 * src/styles/ at build time and inlined ahead of this, so the colours and the
 * typography can never drift from the application they sit beside.
 *
 * Inlined rather than linked because the whole page is one document with no
 * bundle behind it, and because a stylesheet resolved relatively from two
 * different depths is one more thing to get wrong on a static host.
 *
 * The language pill is the application's own control, so its stylesheet is
 * inlined ahead of this too and only the open state is restated: there the
 * trigger is a button driven by aria-expanded, here it is a summary driven by
 * the open attribute.
 *
 * The breakpoint is the house one: a single column below 62rem, the contents
 * list beside the prose above it.
 *
 * Several colours here are a step brighter than the matching ones in the
 * application. The tokens were chosen against panels and chips; at the sizes
 * this page sets body copy and labels they fall under the 4.5:1 the text needs,
 * and the language link has nothing but its border to say it is a control.
 */
export const FAQ_CSS = `
:root { interpolate-size: allow-keywords; }
body { background: var(--bg); color: var(--text); font-family: var(--font-sans); }

.page { max-width: 64rem; margin: 0 auto; padding: 2rem 1rem 3rem; }

/* Every rule below is scoped to its own landmark. Unscoped, the header's
   .identity and the footer's collided: the footer's svg size won for both, so
   the masthead star shrank to the footer's, and the header's flex: 1 1 0 made
   the footer's identity stretch down its column.

   The identity takes the width that is left rather than the width it wants,
   so the language control stays beside the title on a phone instead of
   wrapping to a line of its own under it. Mirrors the application header. */
.masthead { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: 0.75rem; margin-bottom: 1.5rem; }
.masthead .identity { display: flex; flex: 1 1 0; align-items: center; gap: 0.75rem; min-width: 0; }
.masthead .identity > svg { width: 1.6rem; height: 1.6rem; flex: none; }
.masthead h1 { margin: 0; min-width: 0; font-size: clamp(1.5rem, 4vw, 1.875rem); line-height: 1.2; }

.switch { padding: 0.4rem 0.8rem; border: 1px solid var(--text-faint); border-radius: var(--radius);
  color: var(--text-dim); font-size: 0.8rem; }
.switch:hover { border-color: var(--accent); color: var(--accent); }

.intro { margin: 0 0 2rem; color: var(--text-dim); font-size: 1rem; line-height: 1.6; max-width: 46rem; }

.columns { display: grid; gap: 2rem; grid-template-columns: 1fr; align-items: start; }
@media (min-width: 62rem) { .columns { grid-template-columns: 15rem 1fr; } .toc { position: sticky; top: 1.5rem; } }

.toc { padding: 1rem 1.25rem; border: 1px solid var(--line); border-radius: var(--radius-lg); background: var(--surface); }
.toc h2 { margin: 0 0 0.6rem; color: var(--text-dim); font-size: 0.72rem; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase; }
.toc ol { margin: 0; padding: 0; list-style: none; }
.toc li + li { margin-top: 0.35rem; }
.toc a { color: var(--text-dim); font-size: 0.85rem; text-decoration: none; }
.toc a:hover { color: var(--accent); }

section { margin: 0 0 2.5rem; }
section h2 { margin: 0 0 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--line); font-size: 1.15rem; }

/* One row per question, closed by default: nineteen open answers is a page
   nobody scans. The answers are in the document either way. */
.qa { border-bottom: 1px solid var(--line); scroll-margin-top: 1rem; }
.qa > summary { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.8rem 0;
  cursor: pointer; list-style: none;
  /* A question is a control, not a passage: double-clicking one to open it
     used to select its words instead. The answer stays selectable. */
  -webkit-user-select: none; user-select: none; }
.qa > summary::-webkit-details-marker { display: none; }
.qa > summary::before { content: ''; flex: none; width: 0.4rem; height: 0.4rem; margin-top: 0.42rem;
  border-right: 2px solid var(--text-faint); border-bottom: 2px solid var(--text-faint);
  transform: rotate(-45deg); transition: transform 0.15s, border-color 0.15s; }
.qa[open] > summary::before { transform: rotate(45deg); border-color: var(--accent); }
.qa > summary:hover::before { border-color: var(--accent); }
.qa h3 { margin: 0; color: var(--text); font-size: 0.95rem; font-weight: 600; line-height: 1.45; }
.qa > summary:hover h3, .qa[open] > summary h3 { color: var(--accent); }
.qa > summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
/* The open and shut of it, where the browser can animate a closed element's
   intrinsic height. Everything below degrades to the instant toggle, which is
   what these pages did before, so nothing depends on it. */
@media (prefers-reduced-motion: no-preference) {
  .qa::details-content { block-size: 0; overflow: hidden;
    transition: block-size 0.22s ease, content-visibility 0.22s ease;
    transition-behavior: allow-discrete; }
  .qa[open]::details-content { block-size: auto; }
}

.answer { padding: 0 0 1rem 1rem; }
.answer p { margin: 0 0 0.7rem; max-width: 42rem; color: var(--text-dim); font-size: 0.925rem; line-height: 1.65; }
.answer p:last-child { margin-bottom: 0; }
.answer a { color: var(--accent); }

/* The way back sits at the end of the questions rather than in the footer:
   it is where a reader finishes, not a piece of site furniture. */
.cta { margin: 2rem 0 0; text-align: right; }

/* The pill is the application's; only the open state differs, because a
   summary has no aria-expanded. */
.dropdown > summary { list-style: none; }
.dropdown > summary::-webkit-details-marker { display: none; }
.dropdown[open] > .dropdown-trigger { border-color: var(--accent); color: var(--text); }
.dropdown[open] .dropdown-chevron { transform: rotate(180deg); }
.dropdown-list li { margin: 0; }
.dropdown-option { text-decoration: none; }
.dropdown-option[aria-current='page'] { color: var(--accent); }

/* The application's footer, rule for rule: same two columns, same breakpoint,
   same link row. One column until 62rem, two after it — sized in percent so
   the split happens exactly where the alignment switches. */
.foot { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
.foot .row { display: flex; flex-wrap: wrap; align-items: stretch; justify-content: space-between;
  gap: 1.25rem 2.5rem; }
.prose { flex: 1 1 100%; max-width: 48rem; min-width: 0; }
.prose > :first-child { margin-top: 0; }
.meta { display: flex; flex-direction: column; gap: 0.85rem; }
@media (min-width: 62rem) {
  .prose { flex: 1 1 26rem; }
  .meta { align-items: flex-end; }
  .foot .links { justify-content: flex-end; }
}

.foot p { margin: 0; color: var(--text-dim); font-size: 0.8125rem; line-height: 1.6; }
.foot .notice { margin-top: 1rem; }
/* Inline flow, not flex, and the badges ride with the licence name: see
   LicenceNotice.vue. Flex orphaned them, and so did a plain wrap. */
.foot .licence { margin: 0; }
.deed { white-space: nowrap; }
.foot .licence a { color: var(--text-dim); text-decoration: underline; text-underline-offset: 2px; }
.foot .licence a:hover { color: var(--accent); }
/* The badges are black line art meant for light pages. */
.badge { width: 1em; height: 1em; margin-left: 0.2em; vertical-align: -0.15em;
  /* The badges are black line art meant for light pages. */
  filter: invert(1) opacity(0.55); }
.foot .identity > svg { width: 1.05rem; height: 1.05rem; flex: none; }
/* line-height normal, like the application's: the footer paragraph rule sets
   1.6 for the prose, which made this row four pixels taller than the one it is
   meant to match. */
.foot .identity { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem;
  line-height: normal; }
.foot .links { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.8125rem; }
.foot .links a { color: var(--text-dim); text-decoration: none; border-bottom: 1px solid transparent;
  transition: color 0.15s, border-color 0.15s; }
.foot .links a:hover { color: var(--accent); border-bottom-color: var(--accent); }
.foot .links a.contribute { color: var(--accent); }

.badges img { height: 1.1em; width: auto; }
`;
