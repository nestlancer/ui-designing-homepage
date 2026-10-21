import { allCombos, totalCombos } from './combos.mjs';
import { SLOT_ORDER } from './traits.mjs';

/**
 * A single, deterministic manifest for all 21,600 combinations.
 * ~4 MB of JSON — small enough to ship as one file; the gallery never loads it
 * into the DOM at once (it filters + caps the visible rows).
 */
export function buildManifest(inventory) {
  const combos = [];
  for (const c of allCombos(inventory)) {
    const slots = {};
    for (const slot of SLOT_ORDER) slots[slot] = c.picks[slot].id;
    combos.push({ i: c.index, id: c.id, href: `pages/${c.id}/`, slots });
  }
  return {
    schema: 'nestlancer.homepage-compositor.manifest/1',
    total: combos.length,
    order: SLOT_ORDER,
    slots: inventory.slots.map((s) => ({
      slot: s.slot,
      lab: s.lab,
      count: s.count,
      samples: s.samples.map((x) => ({ id: x.id, folder: x.folder, name: x.name })),
    })),
    product: totalCombos(inventory),
    combos,
  };
}
