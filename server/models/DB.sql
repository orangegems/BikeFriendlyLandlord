DROP TABLE reviews;
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
  company VARCHAR (50) DEFAULT '',	
  is_landlord BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE landlords(
  _id SERIAL PRIMARY KEY,
  overall_rating DECIMAL DEFAULT 0,
  respect_rating DECIMAL DEFAULT 0,
  responsiveness_rating DECIMAL DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  is_company BOOLEAN DEFAULT false NOT NULL,
  user_id INTEGER NOT NULL
);

CREATE TABLE addresses(
  _id SERIAL PRIMARY KEY,
  street_num INTEGER,
  street VARCHAR (25),
  apt_num VARCHAR (10),
  city VARCHAR (50) NOT NULL,
  state VARCHAR (25) NOT NULL,
  zip_code INTEGER,
  bike_friendly BOOLEAN DEFAULT false,
  pet_friendly BOOLEAN DEFAULT false,
  dog_friendly BOOLEAN DEFAULT false,
  dog_breed_restriction VARCHAR (100),
  dog_size_max_lbs INTEGER,
  tlc DECIMAL,
  personalization DECIMAL,
  quiet_hours VARCHAR (50),
  overnight_guests BOOLEAN DEFAULT false,
  smoker_friendly BOOLEAN DEFAULT false,
  building_type VARCHAR (50),
  beds INTEGER,
  baths INTEGER,
  price INTEGER,
  late_payments VARCHAR (100),
  landlord_id INTEGER NOT NULL
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
  tlc DECIMAL,
  personalization DECIMAL,
  description VARCHAR (1000) NOT NULL,
  user_id INTEGER NOT NULL, 
  landlord_id INTEGER NOT NULL, 
  address_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);