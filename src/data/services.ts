export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  featured: boolean;
  highlightNote?: string;
  waParam: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'transferencia',
    number: '01',
    title: 'Transferencia',
    description:
      'Comprás o vendés un auto o una moto y querés que el cambio de titular quede bien hecho. Revisamos juntos la documentación y te acompaño en la gestión hasta el final.',
    featured: true,
    waParam: 'Transferencia',
  },
  {
    id: 'informe-dominio',
    number: '02',
    title: 'Informe de dominio',
    description:
      'Antes de comprar un usado conviene conocer su historia legal. Te ayudo a pedir el informe y a entender qué dice.',
    featured: true,
    highlightNote:
      'Si vas a comprar un auto usado, no señes ni compres sin esta información.',
    waParam: 'Informe de dominio',
  },
  {
    id: 'verificacion-policial',
    number: '03',
    title: 'Verificación policial',
    description:
      'La piden varios trámites de autos y motos. Te oriento sobre cuándo corresponde y qué preparar antes de ir.',
    featured: false,
    waParam: 'Verificación policial',
  },
  {
    id: 'denuncia-venta',
    number: '04',
    title: 'Denuncia de venta',
    description:
      'Vendiste y el comprador todavía no hizo la transferencia. La denuncia de venta deja asentado que el vehículo ya no está en tus manos.',
    featured: false,
    waParam: 'Denuncia de venta',
  },
  {
    id: 'cambio-radicacion',
    number: '05',
    title: 'Cambio de radicación',
    description:
      'Te mudaste y el vehículo tiene que pasar a otro registro. Te acompaño en el pase para que los papeles reflejen tu nuevo domicilio.',
    featured: false,
    waParam: 'Cambio de radicación',
  },
  {
    id: 'cancelacion-prenda',
    number: '06',
    title: 'Cancelación de prenda',
    description:
      'Terminaste de pagar el crédito y querés que el vehículo figure libre de prenda. Te guío con la documentación y la presentación en el registro.',
    featured: false,
    waParam: 'Cancelación de prenda',
  },
  {
    id: 'extravio-patente',
    number: '07',
    title: 'Extravío de patente',
    description:
      'Perdiste una chapa patente o te la robaron. Te explico los pasos para tramitar la reposición y volver a circular en regla.',
    featured: false,
    waParam: 'Extravío de patente',
  },
  {
    id: 'documentacion-vehicular',
    number: '08',
    title: 'Documentación de autos y motos',
    description:
      'Cédulas, duplicados y otros papeles del vehículo. Si no sabés por dónde empezar, contame y vemos qué te falta.',
    featured: false,
    waParam: 'Documentación de mi vehículo',
  },
];
