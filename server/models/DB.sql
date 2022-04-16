

CREATE TABLE users (
  _id SERIAL PRIMARY KEY,
  first_name varchar (50) NOT NULL,
  last_name varchar (50) NOT NULL,
  full_name varchar (100) NOT NULL,
  username varchar (100) NOT NULL UNIQUE,
  email varchar (50) NOT NULL UNIQUE,
  password varchar (100) NOT NULL,
  profile_pic VARCHAR DEFAULT 'userProfile.png',	
  is_landlord boolean DEFAULT false NOT NULL,
);

CREATE TABLE landlords(
  _id SERIAL PRIMARY KEY,
  overall_rating decimal,
  respect_rating decimal,
  responsiveness_rating decimal,
  bike_friendly boolean,
  pet_friendly boolean,
  is_verified boolean DEFAULT false,
  FOREIGN KEY (_id) REFERENCES users(_id),
);

CREATE TABLE addresses(
  _id SERIAL PRIMARY KEY,
  street_num integer,
  street varchar (25),
  city varchar (50) NOT NULL,
  state varchar (25) NOT NULL,
  zip_code integer,
);

CREATE TABLE landlordAddresses(
  _id SERIAL PRIMARY KEY,
  FOREIGN KEY (_id) REFERENCES landlords(_id),
  FOREIGN KEY (_id) REFERENCES addresses(_id)
)

CREATE TABLE reviews(
  _id SERIAL PRIMARY KEY,
  title varchar (100) NOT NULL,
  username varchar (100) NOT NULL,
  overall_rating decimal,
  respect_rating decimal,
  responsiveness_rating decimal,
  bike_friendly boolean,
  pet_friendly boolean,
  description varchar (1000) NOT NULL,
  user_id integer NOT NULL,
  landlord_id integer NOT NULL, 
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);