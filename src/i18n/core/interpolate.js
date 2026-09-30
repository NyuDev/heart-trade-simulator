/** Walks down a dotted key without throwing when the path does not exist. */
export function lookup(tree, path) {
  return path.split('.').reduce((node, key) => (node == null ? undefined : node[key]), tree);
}

/** Replaces {tokens} with the given parameters, leaving unknown ones alone. */
export function interpolate(template, params) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    params[key] === undefined ? match : String(params[key]),
  );
}
