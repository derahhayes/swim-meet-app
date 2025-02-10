export default {
    name: 'eventAssignment',
    title: 'Event Assignment',
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
        name: 'assignedBy', // The coach who assigned the swimmer to the event
        title: 'Assigned By',
        type: 'reference',
        to: [{ type: 'coach' }],
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: ['Assigned', 'Confirmed', 'Withdrawn'],
        },
      },
    ],
  };
  