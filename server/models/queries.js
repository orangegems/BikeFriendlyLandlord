queries = {}


//Landlords
queries.getCity = `SELECT DISTINCT city FROM addresses`;

queries.getLandlord = `SELECT * FROM landlords WHERE _id = $1`;

queries.getLandlordId = `SELECT _id FROM landlords WHERE user_id = $1`

queries.getAllLandlords = `SELECT * FROM landlords`;

queries.getTopFourLandlords = `SELECT landlords.*, addresses.city, addresses.state FROM landlords 
LEFT OUTER JOIN addresses on landlords._id = addresses.landlord_id 
WHERE landlords.overall_rating != 'NaN'
ORDER BY overall_rating DESC 
LIMIT 4;`;

queries.postLandlord = `INSERT INTO landlords (user_id) VALUES ($1)`;

queries.updateLandlordRating = `UPDATE landlords
SET overall_rating = $1, respect_rating = $2, responsiveness_rating = $3
WHERE _id = $4`;

queries.getBikeAndPetFriendlyLandlords = `SELECT landlords.*, addresses.street_num, addresses.street, addresses.city, addresses.state, addresses.zip_code FROM landlords 
INNER JOIN addresses ON landlords._id = addresses.landlord_id
WHERE addresses.city = $1`;

queries.getLandlordsAndAddresses = `SELECT l.*, a.city, a.street_num, a.street, a.state, a.zip_code, a.landlord_id FROM landlords l
INNER JOIN addresses a ON l._id = a.landlord_id`;

//Reviews
queries.addReview = `INSERT INTO reviews (title, username, overall_rating, respect_rating, responsiveness_rating, bike_friendly, pet_friendly, tlc, personalization, description, user_id, landlord_id, address_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;

queries.getReview = `SELECT * FROM reviews
WHERE user_id = $1`;

queries.getAllReviews = `SELECT * FROM reviews 
WHERE landlord_id = $1
ORDER BY created_at DESC`;

queries.getAddressReviews = `SELECT overall_rating, tlc, personalization FROM reviews
WHERE address_id = $1
ORDER BY created_at DESC`;

queries.updateAddressReviews = `UPDATE addresses
SET overall_rating = $1, tlc = $2, personalization = $3
WHERE _id = $4`;

queries.updateReview = `UPDATE reviews SET title = $2, description = $3 WHERE _id = $1`;

queries.deleteReview = `DELETE FROM reviews WHERE _id = $1`;

//Users
queries.createUser = `INSERT INTO users (first_name, last_name, full_name, username, email, password, is_company, company, is_landlord) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *`;

queries.getVerifiedUser = `SELECT * FROM users
WHERE users.username = $1`;

queries.deleteUser = `DELETE FROM users
WHERE users._id = $1`;

queries.getUserData = `SELECT * FROM users
WHERE users._id = $1`;

//Addresses
queries.postAddress = `INSERT INTO addresses (street_num, street, apt_num, city, state, zip_code, bike_friendly, pet_friendly, dog_friendly, dog_breed_restriction, dog_size_max_lbs, quiet_hours, overnight_guests, smoker_friendly, building_type, beds, baths, price, late_payments, landlord_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`;

queries.deleteAddress = `DELETE FROM addresses WHERE _id = $1`

queries.getAddress = `SELECT * FROM addresses WHERE _id = $1`;

queries.getAddresses = `SELECT * FROM addresses`;

queries.getAddressesByLandlord = `SELECT * FROM addresses WHERE landlord_id = $1`;

module.exports = queries;