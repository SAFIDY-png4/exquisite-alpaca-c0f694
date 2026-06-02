/**
 * Formate un prix en Ariary malgache
 * Ex: 135000 → "135 000 Ar"
 * Utilise un espace classique pour WhatsApp
 */
export function formatPrice(price: number): string {
  const rounded = Math.round(price);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ar';
}

/**
 * Formate un prix court sans "Ar"
 * Ex: 135000 → "135 000"
 */
export function formatPriceShort(price: number): string {
  const rounded = Math.round(price);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
