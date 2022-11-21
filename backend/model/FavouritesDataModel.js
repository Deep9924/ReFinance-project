const db = require("./DBModel").collection("Refinance_User");

const getFavNotAdded = async (user_email, user_favstock) => {
	return (await db.countDocuments({ email: user_email, favourites: user_favstock })) === 0;
};

const countUser = async (user_email) => {
	return (await db.countDocuments({ email: user_email })) === 1;
};

const addFavStockDataToDB = async (user_email, user_favstock) => {
	try {
		await db.updateOne(
			{ email: user_email }, 
			{ $push: {favourites: user_favstock}}
			);
	} catch (e) {
		console.error(e);
		return e;
	}
	return true;
};

const removeFavStockDataFromDB = async (user_email, user_favstock) => {
	try {
		await db.updateOne(
			{ email: user_email }, 
			{ $pull: {favourites: user_favstock}}
			);
	} catch (e) {
		console.error(e);
		return e; //false
	}
	return true;
};

module.exports = {
	getFavNotAdded,
	countUser,
	addFavStockDataToDB,
	removeFavStockDataFromDB,
};
