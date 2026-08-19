/** Número oficial de WhatsApp del taller (formato internacional, sin signos). */
export const WHATSAPP_NUMERO = '51987654321';

/** Construye la URL de wa.me con el mensaje ya codificado. */
export const construirUrlWhatsApp = (mensaje) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
