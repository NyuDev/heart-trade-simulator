import { onMounted, ref } from 'vue';
import { fetchLimits } from '../api/index.js';

/**
 * Input bounds for the fields.
 *
 * Fallback values keep the interface usable if the call fails, then they are
 * replaced by the ones the server publishes, so they only live in one
 * authoritative place.
 */
const FALLBACK = {
  amount: { min: 0, max: 10000 },
  advanceDays: { min: 0, max: 30 },
  capacityPerPlayDay: { min: 1, max: 1000 },
  playDaysPerWeek: { min: 1, max: 7 },
  vouches: { min: 0, max: 5 },
};

export function useLimits() {
  const limits = ref(FALLBACK);

  onMounted(async () => {
    try {
      limits.value = await fetchLimits();
    } catch {
      // The fallback is enough: the server revalidates anyway.
    }
  });

  return { limits };
}
