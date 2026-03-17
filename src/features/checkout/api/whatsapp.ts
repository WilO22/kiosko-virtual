import type { CartItem } from '@/shared/types';
import { config } from '@/shared/config';


export function generateWhatsAppLink(
  items: CartItem[], 
  total: number, 
  paymentMethod: 'yape' | 'cash', 
  cashAmount: string
): string {
  if (items.length === 0) return '';

  const orderDetails = items.map((item) => {
    return `   🔸 ${item.quantity}x *${item.name}* (S/ ${(item.price * item.quantity).toFixed(2)})`;
  }).join('\n');

  let paymentInfo = '';
  if (paymentMethod === 'yape') {
    paymentInfo = `💳 *Forma de pago:* Yape / Plin`;
  } else {
    const amount = parseFloat(cashAmount) || 0;
    const change = amount > total ? amount - total : 0;
    paymentInfo = `💵 *Forma de pago:* Efectivo\n💰 *Pagaré con:* S/ ${amount.toFixed(2)}\n🪙 *Vuelto a entregar:* S/ ${change.toFixed(2)}`;
  }

  const mensaje = `👋 ¡Hola *Bodega El Caserito*! 🏪\n\nDeseo realizar un pedido para *RECOJO EN TIENDA*:\n\n*🛒 DETALLE DEL PEDIDO:*\n${orderDetails}\n\n───────────────\n🧾 *Total del pedido:* S/ ${total.toFixed(2)}\n───────────────\n\n${paymentInfo}\n\n🏃‍♂️ Me acerco en breves minutos a recogerlo.\n\n¡Muchas gracias! ✨`;

  const textoCodificado = encodeURIComponent(mensaje);
  // Según reportes comunitarios (~2026), wa.me corrompe emojis en Desktop/Web aleatoriamente. 
  // La API legacy de api.whatsapp.com renderiza correctamente los códigos UTF-8 de Emojis.
  return `https://api.whatsapp.com/send?phone=${config.whatsappNumber}&text=${textoCodificado}`;
}
