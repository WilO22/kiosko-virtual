import type { CartItem } from '@/shared/types';

const STORE_PHONE_NUMBER = '51921401917'; // Reemplazar con el número real de la bodega

export function generateWhatsAppLink(items: CartItem[], total: number): string {
  if (items.length === 0) return '';

  // \uD83D\uDC4B = 👋 (Mano saludando)
  const header = '\uD83D\uDC4B Hola Bodega El Caserito, quiero hacer el siguiente pedido:\n\n';
  
  const orderDetails = items.map((item) => {
    return `- ${item.quantity}x *${item.name}* (S/ ${(item.price * item.quantity).toFixed(2)})`;
  }).join('\n');

  // \uD83D\uDCB0 = 💰 (Bolsa de dinero)
  // \uD83D\uDEED = 🛒 (Carrito flotante al final)
  const footer = `\n\n\uD83D\uDCB0 *Total a pagar: S/ ${total.toFixed(2)}*\n\nPor favor, confirmen mi pedido y el medio de pago. \u00A1Gracias! \uD83D\uDEED`;

  const message = `${header}${orderDetails}${footer}`;

  // Usamos la API universal de WhatsApp válida para Web y Móvil
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodedMessage}`;
}
