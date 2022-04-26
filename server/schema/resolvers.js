const resolvers = {
  Query: {
    users: () => {
      // db query here
      return;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = null; // database query goes here

      return user;
    },
  },
  Landlord: {
    addresses: () => {
      // db query here, return all address rows with specified landlord id
      // how is landlord ID specified?
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      // add this user object to SQL DB here

      // also handle conditional landlord creation
      return;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input.id;
      // update sql db here
      return;
    },
    deleteUser: (parent, args) => {
      const id = args.id;
      // remove from sql db here
      return;
    },
  },
};

module.exports = resolvers;
