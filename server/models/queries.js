queries = {}


//Landlords
queries.getCity = `SELECT DISTINCT city FROM addresses`;

queries.getLandlord = `SELECT * FROM landlords WHERE _id = $1`;

queries.getAllLandlords = `SELECT * FROM landlords`;

queries.getTopFourLandlords = `SELECT landlords.*, addresses.city, addresses.state FROM landlords 
LEFT OUTER JOIN addresses on landlords._id = addresses.landlord_id 
WHERE landlords.overall_rating != 'NaN'
ORDER BY overall_rating DESC 
LIMIT 4;`;

queries.updateLandlordRating = `UPDATE landlords
SET overall_rating = $1, respect_rating = $2, responsiveness_rating = $3, bike_friendly = $4, pet_friendly = $5
WHERE _id = $6`;

queries.getBikeAndPetFriendlyLandlords = `SELECT landlords.*, addresses.street_num, addresses.street, addresses.city, addresses.state, addresses.zip_code FROM landlords 
INNER JOIN addresses ON landlords._id = addresses.landlord_id
WHERE addresses.city = $1`;

queries.getLandlordsAndAddresses = `SELECT l.*, a.city, a.street_num, a.street, a.state, a.zip_code, a.landlord_id FROM landlords l
INNER JOIN addresses a ON l._id = a.landlord_id`;

//Reviews
queries.addReview =`INSERT INTO reviews (title, username, overall_rating, respect_rating, responsiveness_rating, bike_friendly, pet_friendly, description, user_id, landlord_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

queries.getReview = `SELECT * FROM reviews
WHERE user_id = $1`;

queries.getAllReviews = `SELECT * FROM reviews 
WHERE landlord_id = $1
ORDER BY created_at DESC`;

queries.updateReview = `UPDATE reviews SET title = $2, description = $3 WHERE _id = $1`;

queries.deleteReview = `DELETE FROM reviews WHERE _id = $1`;

//Users
queries.createUser =`INSERT INTO users (first_name, last_name, full_name, username, email, password, is_landlord, landlord_id) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *`;

queries.getVerifiedUser = `SELECT * FROM users
WHERE users.username = $1`;

queries.deleteUser = `DELETE FROM users
WHERE users._id = $1`;

queries.getUserData = `SELECT * FROM users
WHERE users._id = $1`;

module.exports = queries;