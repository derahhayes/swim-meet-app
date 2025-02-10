export default {
    name: 'coach',
    title: 'Coach',
    type: 'document',
    fields: [
      { name: "swimIrelandId", 
        type: "string", 
        title: "Swim Ireland ID" 
      },
      {
        name: 'firstName',
        title: 'First Name',
        type: 'string',
      },
      {
        name: 'lastName',
        title: 'Last Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'role',
        title: 'Role',
        type: 'string',
        options: {
          list: [
            { title: 'Swimmer', value: 'swimmer' },
            { title: 'Coach', value: 'coach' },
            { title: 'Parent', value: 'parent' },
          ],
          layout: 'radio',
        },
      },
      {
        name: 'swimmers', // Reference to swimmers coached by this coach
        title: 'Swimmers',
        type: 'array',
        of: [{
          type: 'reference',
          to: [{ type: 'swimmer' }]
        }],
      },
    ],
  };
  