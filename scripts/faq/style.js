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
body { background: var(--bg); color: var(--text); font-family: var(--font-sans); }

.page { max-width: 64rem; margin: 0 auto; padding: 2rem 1rem 3rem; }

.masthead { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
/* The logo only: a bare .masthead svg also caught the flag and the chevron
   inside the language pill, and outranked the rules that size them. */
.masthead > svg { width: 1.75rem; height: 1.75rem; flex: none; }
.masthead h1 { margin: 0; font-size: clamp(1.5rem, 4vw, 1.875rem); line-height: 1.2; }
.masthead .spacer { flex: 1 1 auto; }

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
  cursor: pointer; list-style: none; }
.qa > summary::-webkit-details-marker { display: none; }
.qa > summary::before { content: ''; flex: none; width: 0.4rem; height: 0.4rem; margin-top: 0.42rem;
  border-right: 2px solid var(--text-faint); border-bottom: 2px solid var(--text-faint);
  transform: rotate(-45deg); transition: transform 0.15s, border-color 0.15s; }
.qa[open] > summary::before { transform: rotate(45deg); border-color: var(--accent); }
.qa > summary:hover::before { border-color: var(--accent); }
.qa h3 { margin: 0; color: var(--text); font-size: 0.95rem; font-weight: 600; line-height: 1.45; }
.qa > summary:hover h3, .qa[open] > summary h3 { color: var(--accent); }
.qa > summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
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

.foot { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--line); }
.back { display: inline-block; margin-bottom: 1.25rem; padding: 0.6rem 1rem; border-radius: var(--radius);
  background: #0369a1; color: #fff; font-size: 0.85rem; font-weight: 600; text-decoration: none; }
.back:hover { background: var(--accent); color: #05202e; }
.foot p { margin: 0 0 0.5rem; color: var(--text-dim); font-size: 0.75rem; line-height: 1.6; }
/* Scoped to the paragraphs: a bare .foot a also caught the button and
   repainted its white label grey on blue. */
.foot p a { color: var(--text-dim); }
.badges { display: inline-flex; gap: 0.2rem; vertical-align: middle; margin-left: 0.3rem; }
.badges img { height: 1.1em; width: auto; }
`;
