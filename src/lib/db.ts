import "server-only";

const MOCK_USERS = [
  { id: 1, name: "Артем", email: "artem@gmail.com" },
  { id: 2, name: "Артем2", email: "artem2@gmail.com" },
  { id: 3, name: "Артем3", email: "artem3@gmail.com" },
  { id: 4, name: "Артем4", email: "artem4@gmail.com" },
];

export const db = {
  query: {
    users: {
      findMany: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return MOCK_USERS;
      },
    },
  },
};
