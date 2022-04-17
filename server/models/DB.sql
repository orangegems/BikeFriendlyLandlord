-- psql -d "postgres://qayxanvh:be-OLsDbQe_tt0lgKWlFTjRwjJv-yd-O@heffalump.db.elephantsql.com/qayxanvh" -f ./server/models/DB.sql

DROP TABLE reviews;
DROP TABLE landlordAddresses;
DROP TABLE addresses;
DROP TABLE landlords;
DROP TABLE users;


CREATE TABLE users (
  _id SERIAL PRIMARY KEY,
  first_name VARCHAR (50) NOT NULL,
  last_name VARCHAR (50) NOT NULL,
  full_name VARCHAR (100) NOT NULL,
  username VARCHAR (100) NOT NULL UNIQUE,
  email VARCHAR (50) NOT NULL UNIQUE,
  password VARCHAR (100) NOT NULL,
  profile_pic VARCHAR DEFAULT 'userProfile.png',	
  is_landlord BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE landlords(
  _id SERIAL PRIMARY KEY,
  overall_rating DECIMAL,
  respect_rating DECIMAL,
  responsiveness_rating DECIMAL,
  bike_friendly BOOLEAN,
  pet_friendly BOOLEAN,
  is_verified BOOLEAN DEFAULT false,
  user_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(_id)
);

CREATE TABLE addresses(
  _id SERIAL PRIMARY KEY,
  street_num INTEGER,
  street VARCHAR (25),
  city VARCHAR (50) NOT NULL,
  state VARCHAR (25) NOT NULL,
  zip_code INTEGER
);

CREATE TABLE landlordAddresses(
  _id SERIAL PRIMARY KEY,
  landlord_id INTEGER NOT NULL,
  address_id INTEGER NOT NULL,
  FOREIGN KEY(landlord_id) REFERENCES landlords(_id),
  FOREIGN KEY(address_id) REFERENCES addresses(_id)
);

CREATE TABLE reviews(
  _id SERIAL PRIMARY KEY,
  title VARCHAR (100) NOT NULL,
  username VARCHAR (100) NOT NULL,
  overall_rating DECIMAL,
  respect_rating DECIMAL,
  responsiveness_rating DECIMAL,
  bike_friendly BOOLEAN,
  pet_friendly BOOLEAN,
  description VARCHAR (1000) NOT NULL,
  user_id INTEGER NOT NULL, 
  landlord_id INTEGER NOT NULL, 
  FOREIGN KEY(user_id) REFERENCES users(_id),
  FOREIGN KEY(landlord_id) REFERENCES landlords(_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);