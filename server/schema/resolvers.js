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
      console.log("entered landlord query");
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
  Landlord: {
    addresses: async (parent, args, context) => {
      const id = Number(parent._id);
      return await db
        .query(queries.getAddressesByLandlord, [id])
        .then((res) => {
          if (!res.rows[0]) {
            context.response.status(404);
            throw new GraphQLError(
              `Query Error: Address with id ${parent._id} not found.`
            );
          }
          return res.rows;
        })
        .catch((err) => err);
    },
    reviews: async (parent, args, context) => {
      const id = Number(parent._id);
      return await db
        .query(queries.getAllReviews, [id])
        .then((res) => {
          if (!res.rows[0]) {
            context.response.status(404);
            throw new GraphQLError(
              `Query Error: Review with id ${parent._id} not found.`
            );
          }
          return res.rows;
        })
        .catch((err) => err);
    },
  },
  Review: {
    user: async (parent, args, context) => {
      const userId = parent.user_id;
      return await db
        .query(queries.getUserData, [userId])
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
  Mutation: {
    createReview: (parent, args, context) => {
      const review = args.input;
    },
    updateReview: (parent, args, context) => {
      const review = args.input;
    },
    deleteReview: (parent, args, context) => {
      const id = args.id;
    },
  },
};

module.exports = resolvers;
