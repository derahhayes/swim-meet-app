export default {
    name: "user",
    title: "User",
    type: "document",
    fields: [
      {
        name: "swimIrelandId",
        title: "Swim Ireland ID",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "name",
        title: "Full Name",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "email",
        title: "Email",
        type: "string",
        validation: (Rule) => Rule.required().email(),
      },
      {
        name: "role",
        title: "Role",
        type: "string",
        options: {
          list: ["swimmer", "coach", "parent", "admin"],
        },
        validation: (Rule) => Rule.required(),
      },
    ],
    preview: {
      select: {
        title: "name",
        subtitle: "role",
      },
    },
  };
  