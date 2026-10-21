/**
 * Shared combo identity + iteration order.
 *
 * The cartesian product is generated in the fixed slot order
 * Header → Hero → Delivery → Financial → Why → Work → CTA → Footer and each
 * slot follows the lab's canonical sample order from lib/traits.mjs. That makes
 * the combo index stable: index 0 is always
 * hdr-P01__hero-H01__del-D01__fin-M01__why-W04__work-S01__cta-C01__ftr-P01
 * and index 21,599 the last footer of the last CTA of the last work sample.
 */
import { SLOT_ORDER, LABS } from './traits.mjs';

export const SLOT_PREFIX = {
  header: 'hdr',
  hero: 'hero',
  delivery: 'del',
  financial: 'fin',
  why: 'why',
  work: 'work',
  cta: 'cta',
  footer: 'ftr',
};

export function comboId(picks) {
  return SLOT_ORDER.map((slot) => `${SLOT_PREFIX[slot]}-${picks[slot].id}`).join('__');
}

export function comboLabel(picks) {
  return [
    picks.header.id,
    picks.hero.id,
    picks.delivery.id,
    picks.financial.id,
    picks.why.id,
    picks.work.id,
    picks.cta.id,
    `Ftr-${picks.footer.id}`,
  ].join(' · ');
}

/** Yield every combination in the canonical order. */
export function* allCombos(inventory) {
  const slots = SLOT_ORDER.map((slot) => {
    const lab = LABS.find((l) => l.slot === slot);
    const entry = inventory.slots.find((s) => s.slot === slot);
    return { slot, order: lab.ids, samples: entry.samples };
  });
  const idx = new Array(slots.length).fill(0);
  let index = 0;
  while (true) {
    const picks = {};
    for (let i = 0; i < slots.length; i++) picks[slots[i].slot] = slots[i].samples[idx[i]];
    yield { index: index++, picks, id: comboId(picks), label: comboLabel(picks) };
    let carry = slots.length - 1;
    for (; carry >= 0; carry--) {
      const s = slots[carry];
      if (idx[carry] < s.order.length - 1) { idx[carry]++; break; }
      idx[carry] = 0;
    }
    if (carry < 0) break;
  }
}

export function totalCombos(inventory) {
  return inventory.slots.reduce((n, s) => n * s.count, 1);
}
