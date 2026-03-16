import type { CartItem } from '@/shared/types';

const STORE_PHONE_NUMBER = '51921401917'; // Reemplazar con el número real de la bodega

export function generateWhatsAppLink(items: CartItem[], total: number): string {
  if (items.length === 0) return '';

  const orderDetails = items.map((item) => {
    return `   🔸 ${item.quantity}x *${item.name}* (S/ ${(item.price * item.quantity).toFixed(2)})`;
  }).join('\n');

  const mensaje = `👋 ¡Hola *Bodega El Caserito*! 🏪\n\nDeseo realizar un pedido con los siguientes productos:\n\n*🛒 DETALLE DEL PEDIDO:*\n${orderDetails}\n\n───────────────\n💰 *Total a pagar:* S/ ${total.toFixed(2)}\n───────────────\n\n🛵 Quedo a la espera de su confirmación y los métodos de pago (Yape/Plin/Efectivo).\n\n¡Muchas gracias! ✨`;

  const textoCodificado = encodeURIComponent(mensaje);
  // Según reportes comunitarios (~2026), wa.me corrompe emojis en Desktop/Web aleatoriamente. 
  // La API legacy de api.whatsapp.com renderiza correctamente los códigos UTF-8 de Emojis.
  return `https://api.whatsapp.com/send?phone=${STORE_PHONE_NUMBER}&text=${textoCodificado}`;
}
