import type { CartItem } from '@/shared/types';

const STORE_PHONE_NUMBER = '51921401917'; // Reemplazar con el número real de la bodega

export function generateWhatsAppLink(items: CartItem[], total: number): string {
  if (items.length === 0) return '';

  // Emojis pre-codificados en formato URL (%hex) para evadir la corrupción de archivos Windows/ANSI
  const EMOJI_WAVE = '%F0%9F%91%8B';      // 👋
  const EMOJI_MONEY = '%F0%9F%92%B0';     // 💰
  const EMOJI_CART = '%F0%9F%9B%92';      // 🛒
  const SPACE = '%20';

  const headerRaw = 'Hola Bodega El Caserito, quiero hacer el siguiente pedido:\n\n';
  const header = `${EMOJI_WAVE}${SPACE}${encodeURIComponent(headerRaw)}`;
  
  const orderDetailsRaw = items.map((item) => {
    return `- ${item.quantity}x *${item.name}* (S/ ${(item.price * item.quantity).toFixed(2)})`;
  }).join('\n');
  const orderDetails = encodeURIComponent(orderDetailsRaw);

  const footerLine1Raw = `\n\n`;
  const footerLine2Raw = ` *Total a pagar: S/ ${total.toFixed(2)}*\n\nPor favor, confirmen mi pedido y el medio de pago. \u00A1Gracias! `;
  const footer = `${encodeURIComponent(footerLine1Raw)}${EMOJI_MONEY}${encodeURIComponent(footerLine2Raw)}${EMOJI_CART}`;

  const fullURI = `${header}${orderDetails}${footer}`;

  return `https://wa.me/${STORE_PHONE_NUMBER}?text=${fullURI}`;
}
