export default {
    name: 'meetResult',
    title: 'Meet Result',
    type: 'document',
    fields: [
      {
        name: 'swimmer',
        title: 'Swimmer',
        type: 'reference',
        to: [{ type: 'swimmer' }],
      },
      {
        name: 'event',
        title: 'Event',
        type: 'reference',
        to: [{ type: 'event' }],
      },
      {
        name: 'time',
        title: 'Time (in seconds)',
        type: 'number',
      },
      {
        name: 'placement',
        title: 'Placement',
        type: 'number',
      },
      {
        name: 'meet',
        title: 'Meet',
        type: 'reference',
        to: [{ type: 'swimMeet' }],
      },
    ],
  };
  