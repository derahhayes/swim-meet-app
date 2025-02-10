
export default {
    name: 'swimmer',
    title: 'Swimmer',
    type: 'document',
    fields: [
      { name: "swimIrelandId", 
        type: "string", 
        title: "Swim Ireland ID" 
      },
      {
        name: 'dob',
        title: 'Date of Birth',
        type: 'datetime',
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
        name: 'coach', // Reference to the coach assigned to the swimmer
        title: 'Coach',
        type: 'reference',
        to: [{ type: 'coach' }],
      },
      {
        name: "performanceCategory",
        title: "Performance Category",
        type: "string",
        options: {
          list: [
            { title: "Beginner", value: "beginner" },
            { title: "Intermediate", value: "intermediate" },
            { title: "Advanced", value: "advanced" },
            { title: "Elite", value: "elite" },
          ],
        },
      },
      {
        name: "personalBests",
        title: "Personal Bests",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "event", title: "Event", type: "string" },
              { name: "time", title: "Time (seconds)", type: "number" },
            ],
          },
        ],
      },
      {
        name: 'results', // Reference to results in previous meets
        title: 'Results',
        type: 'array',
        of: [{
          type: 'reference',
          to: [{ type: 'meetResult' }]
        }],
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
        name: 'guardian', // Reference to the guardian for swimmers under 18
        title: 'Guardian',
        type: 'reference',
        to: [{ type: 'guardian' }],
        hidden: ({ parent }) => {
          // Only show this field for swimmers under 18
          return !parent.dob || new Date() - new Date(parent.dob) >= 18 * 365 * 24 * 60 * 60 * 1000;
        },
      },
    ],
  };
  