export default {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Event Name',
        type: 'string',
      },
      {
        name: 'distance',
        title: 'Distance (meters)',
        type: 'number',
      },
      {
        name: 'stroke',
        title: 'Stroke',
        type: 'string',
        options: {
          list: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'],
        },
      },
      {
        name: 'ageGroup',
        title: 'Age Group',
        type: 'string',
      },
      {
        name: 'gender',
        title: 'Gender',
        type: 'string',
        options: {
          list: ['Male', 'Female', 'Mixed'],
        },
      },
    ],
  };
  