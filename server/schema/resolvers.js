const db = require("../models/BFLL.js");
const queries = require("../models/queries");
const { GraphQLError } = require("graphql");

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
    landlords: async (parent, args, context) => {
      return await db
        .query(queries.getAllLandlords)
        .then((res) => {
          if (!res.rows[0]) {
            context.response.status(404);
            throw new GraphQLError(`Query Error: No landlords found.`);
          }
          return res.rows;
        })
        .catch((err) => err);
    },
    landlord: async (parent, args, context) => {
      const id = Number(args.id);
      return await db
        .query(queries.getLandlord, [id])
        .then((res) => {
          if (!res.rows[0]) {
            context.response.status(404);
            throw new GraphQLError(
              `Query Error: Landlord with id ${args.id} not found.`
            );
          }
          return res.rows[0];
        })
        .catch((err) => err);
    },
  },
  //   Landlord: {
  //     addresses: () => {
  //       // db query here, return all address rows with specified landlord id
  //       // how is landlord ID specified?
  //     },
  //   },
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
