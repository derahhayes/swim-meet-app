export default {
    name: 'swimMeet',
    title: 'Swim Meet',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
      },
      {
        name: 'time',
        title: 'Time',
        type: 'datetime',
      },
      {
        name: 'level',
        title: 'Level',
        type: 'string',
        options: {
          list: ['Beginner', 'Intermediate', 'Advanced'], // Or any other level you need
        },
      },
      {
        name: 'ageUpDate',
        title: 'Age Up Date',
        type: 'datetime',
      },
      {
        name: 'events', // Reference to event schema
        title: 'Events',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'event' }] }],
      },
    ],
  };
  