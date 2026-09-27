export function calculateSupply(
  annual: number,
  months: number,
  packaging: string,
) {
  const valid =
    Number.isFinite(annual) &&
    annual > 0 &&
    annual <= 1e12 &&
    [3, 6, 12].includes(months) &&
    ['IBC', 'Drum', 'Bulk'].includes(packaging);
  if (!valid) return null;
  const monthly = annual / 12,
    contract = (annual * months) / 12;
  const capacity =
    packaging === 'IBC' ? 1000 : packaging === 'Drum' ? 200 : null;
  return {
    monthly,
    contract,
    packages: capacity ? Math.ceil(contract / capacity) : null,
    capacity,
  };
}
