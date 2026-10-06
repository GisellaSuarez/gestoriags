export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: '¿Qué tipo de vehículos gestionás?',
    answer:
      'Gestiono trámites para autos, motos, camiones, tractores y otros vehículos. Contame qué vehículo tenés y qué necesitás hacer.',
  },
  {
    question: '¿Cuánto cuesta un trámite?',
    answer:
      'Depende del trámite y de la situación del vehículo. Cuando me contás tu caso, te paso el detalle antes de empezar.',
  },
  {
    question: '¿Cuánto tarda?',
    answer:
      'Los plazos dependen de cada trámite y de los organismos que intervienen, por eso no prometo fechas. Lo que sí hago es mantenerte al tanto de cada avance.',
  },
  {
    question: '¿Qué documentación necesito?',
    answer:
      'Varía según el trámite y el vehículo. Cuando me escribís, te paso la lista para tu caso puntual, así no llevás papeles de más ni te falta ninguno.',
  },
  {
    question: 'Voy a comprar un usado. ¿Qué conviene revisar?',
    answer:
      'Antes de señar, pedí el informe de dominio para conocer la historia legal del vehículo. También conviene revisar que los papeles estén al día, la verificación policial y las multas.',
  },
  {
    question: '¿Tengo que ir a algún lugar?',
    answer:
      'Depende del trámite. Algunas instancias, como la verificación policial, requieren llevar el vehículo. Si es tu caso, te aviso con anticipación y te digo qué llevar.',
  },
  {
    question: '¿En qué zonas trabajás?',
    answer:
      'Trabajo en Córdoba. Si estás en otra localidad, escribime y vemos si puedo ayudarte.',
  },
];
