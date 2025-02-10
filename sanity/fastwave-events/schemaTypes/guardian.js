export default {
    name: 'guardian',
    title: 'Guardian',
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
        name: 'relationship',
        title: 'Relationship to Swimmer',
        type: 'string',
      },
      {
        name: 'phone',
        title: 'Phone Number',
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
        name: "assignedSwimmer",
        title: "Assigned Swimmer",
        type: "array",
        of: [{ type: "reference", to: [{ type: "swimmer" }] }],
      },
      {
        name: 'email',
        title: 'Email Address',
        type: 'string',
      },
    ],
  };
  