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
    updateUser: (parent, args) => {
      const newUser = args.input;
      const { _id } = args.input;
      // update sql db here
      // go through args.input and see which values aren't undefined
      // then plug those in
      return;
    },
    deleteUser: (parent, args) => {
      const _id = args.id;
      // remove from sql db here
      return;
    },

    createAddress: (parent, args) => {
      const address = args.input;
      const { landlord_id } = args.input;
      // add to SQL here
      return;
    },

    updateAddress: (parents, args) => {
      const newAddress = args.input;
      const { _id } = args.input;
      // update sql db here
      // go through args.input and see which values aren't undefined
      // then plug those in
      return;
    },

    deleteAddress: (parents, args) => {
      const _id = args.id;
      //remove from sql here
      return;
    },
  },
};

module.exports = resolvers;
