const db = require("../models/BFLL.js");
const queries = require("../models/queries");
const { GraphQLError } = require("graphql");

// publish/subscribe
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

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
            return { message: `Query Error: No landlords found.` }
          }
          return { landlords: res.rows };
        })
        .catch((err) => { message: err });
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
    createReview: async (parent, args, context) => {
      const {
        title,
        username,
        overall_rating,
        respect_rating,
        responsiveness_rating,
        bike_friendly,
        pet_friendly,
        tlc,
        personalization,
        description,
        user_id,
        landlord_id,
        address_id
      } = args.input;


      // in order to avoid error and return the new review, 
      // change SQL query to include RETURNING statement
      return await db.query(queries.addReview,
        [title,
          username,
          overall_rating,
          respect_rating,
          responsiveness_rating,
          bike_friendly,
          pet_friendly,
          tlc,
          personalization,
          description,
          user_id,
          landlord_id,
          address_id]).catch((err) => err);
    },

    updateReview: (parent, args, context) => {
      const review = args.input;
    },

    deleteReview: (parent, args, context) => {
      const id = args.id;
    },
  },
  LandlordsResult: {
    __resolveType(obj) {
      if (obj.landlords) return "LandlordsSuccess";
      if (obj.message) return "LandlordsError";
      return null;
    }
  },

  Subscription: {
    messagePosted: {
      subscribe: () => pubsub.asyncIterator('MESSAGE_POSTED')
      
    }
  },

};

module.exports = resolvers;
