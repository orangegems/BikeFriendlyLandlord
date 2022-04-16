

CREATE TABLE users (
  _id SERIAL PRIMARY KEY,
  first_name varchar (50) NOT NULL,
  last_name varchar (50) NOT NULL,
  full_name varchar (100) NOT NULL,
  username varchar (100) NOT NULL UNIQUE,
  email varchar (50) NOT NULL UNIQUE,
  password varchar (100) NOT NULL,
  is_landlord boolean DEFAULT false,
  landlord_id integer,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE landlords(
  _id SERIAL PRIMARY KEY,
  first_name varchar (50) NOT NULL,
  last_name varchar (50) NOT NULL,
  full_name varchar (100) NOT NULL,
  profile_pic VARCHAR DEFAULT 'userProfile.png',	
  overall_rating decimal,
  respect_rating decimal,
  responsiveness_rating decimal,
  bike_friendly boolean,
  pet_friendly boolean,
  is_verified boolean DEFAULT false,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE addresses(
  _id SERIAL PRIMARY KEY,
  street_num integer,
  street varchar (25),
  city varchar (50) NOT NULL,
  state varchar (25) NOT NULL,
  zip_code integer,
  landlord_id integer
);