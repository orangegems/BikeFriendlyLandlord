

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
<<<<<<< Updated upstream
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
=======
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
  overall_rating DECIMAL,
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
  listing_link VARCHAR (100),
  landlord_id INTEGER NOT NULL
>>>>>>> Stashed changes
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