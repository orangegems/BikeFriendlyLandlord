const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    first_name: String!
    last_name: String!
    full_name: String
    username: String!
    email: String!
    password: String!
    profile_pic: String
    is_company: Boolean!
    company: String
    is_landlord: Boolean!
  }

  type Landlord {
    _id: ID!
    overall_rating: Float
    responsiveness_rating: Float
    respect_rating: Float
    user_id: Int
    addresses: [Address]
  }

  type Address {
    _id: ID!
    street_num: Int!
    street: String!
    apt_num: String
    city: String!
    state: State!
    zip_code: Int!
    bike_friendly: Boolean
    pet_friendly: Boolean
    dog_friendly: Boolean
    dog_breed_restriction: String
    dog_size_max_lbs: Int
    overall_rating: Float
    tlc: Float
    personalization: Float
    quiet_hours: String
    overnight_guests: Boolean
    smoker_friendly: Boolean
    building_type: String!
    beds: Int!
    baths: Int!
    price: Int!
    late_payments: String
    listing_link: String
    landlord_id: Int!
  }

  type Review {
    _id: ID!
    title: String!
    username: String!
    overall_rating: Float!
    respect_rating: Float!
    responsiveness_rating: Float!
    bike_friendly: Boolean!
    pet_friendly: Boolean!
    tlc: Float
    personalization: Float
    description: String!
    user_id: Int!
    landlord_id: Int!
    address_id: Int
    created_at: String!
  }

  input CreateUserInput {
    first_name: String!
    last_name: String!
    full_name: String
    username: String!
    email: String!
    password: String!
    profile_pic: String = 'userProfile.png'
    is_company: Boolean!
    company: String = ''
    is_landlord: Boolean!
  }

  input UpdateUsernameInput {
    _id: ID!
    newUsername: String!
  }

  input CreateAddressInput {
    street_num: Int!
    street: String!
    apt_num: String
    city: String!
    state: State!
    zip_code: Int!
    building_type: String!
    beds: Int!
    baths: Int!
    price: Int!
    landlord_id: Int!
  }

  input UpdateAddressInput {
  
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User

    createAddress(input: CreateAddressInput!): Address
    updateAddress(input: UpdateAddressInput!): Address
    deleteAddress(id: ID!): Address
  }

  enum State {
    CA
    NY
    TX
    FL
    HI
    WA
    MA
    MD
    IL
  }
`;

module.exports = typeDefs;
