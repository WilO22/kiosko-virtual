/**
 * Configuración centralizada de la aplicación.
 * Lee de las variables de entorno (VITE_*) con fallbacks seguros.
 */
export const config = {
  /** URL base de la API. Si está vacía, la app usa MockData local. */
  apiUrl: import.meta.env.VITE_API_URL || '',

  /** Número de WhatsApp de la bodega (con código de país, sin +). */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '51910342822',

  /** Cantidad de productos por página en el catálogo. */
  itemsPerPage: 8,

  /** Retardo simulado de red para MockData en milisegundos. */
  mockNetworkDelayMs: 1000,
} as const;

/** Helper: ¿Estamos en modo API real o MockData? */
export const isApiMode = (): boolean => config.apiUrl.length > 0;
