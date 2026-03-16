import type { CartItem } from '@/shared/types';

const STORE_PHONE_NUMBER = '51921401917'; // Reemplazar con el número real de la bodega

export function generateWhatsAppLink(items: CartItem[], total: number): string {
  if (items.length === 0) return '';

  const orderDetails = items.map((item) => {
    return `• ${item.quantity}x ${item.name} (S/ ${(item.price * item.quantity).toFixed(2)})`;
  }).join('\n');

  const mensaje = `📦 Hola Bodega El Caserito, quiero hacer el siguiente pedido:\n\n${orderDetails}\n\n💳 Total a pagar: S/ ${total.toFixed(2)}\n\nPor favor, confirmen mi pedido y el medio de pago. ¡Gracias! ✨`;

  const textoCodificado = encodeURIComponent(mensaje);
  // Según reportes comunitarios (~2026), wa.me corrompe emojis en Desktop/Web aleatoriamente. 
  // La API legacy de api.whatsapp.com renderiza correctamente los códigos UTF-8 de Emojis.
  return `https://api.whatsapp.com/send?phone=${STORE_PHONE_NUMBER}&text=${textoCodificado}`;
}
