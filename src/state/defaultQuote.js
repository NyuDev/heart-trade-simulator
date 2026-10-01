/**
 * The reply for the opening settings, computed once when the site is deployed.
 *
 * Every first visit asks the same question, and the answer only changes when
 * the pricing model does. Baking it in means the page paints a real price
 * immediately and the server hears nothing at all until the visitor moves
 * something.
 *
 * The trade is that a price change now needs the interface redeployed as well
 * as the API, otherwise this value keeps describing the previous model.
 */

const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

/**
 * Enough of a shape check to know the panel can render it. This value is
 * written by our own deploy rather than by a visitor, so the point is to catch
 * a failed or half-written bake, not to defend against a forgery.
 */
function usable(quote) {
  if (!quote || typeof quote !== 'object') return false;
  if (!isNumber(quote.hearts)) return false;

  const { advance, delivery, factors, hints } = quote;
  if (!delivery || !isNumber(delivery.calendarDays) || !isNumber(delivery.ratePerPlayDay)) {
    return false;
  }
  if (!advance || !isNumber(advance.applied)) return false;

  return Array.isArray(factors) && Boolean(hints) && typeof hints === 'object';
}

/** The baked reply, or null when there is none to trust. */
export function bakedQuote() {
  const quote = globalThis.__SIMULATOR_CONFIG__?.defaultQuote;
  return usable(quote) ? quote : null;
}
