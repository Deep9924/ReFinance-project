const { getFavNotAdded, countUser, addFavStockDataToDB } = require("../../model/FavouritesDataModel");

class addFavourites {
	constructor({ user_email, user_favstock }) {
		this.user_email = user_email;
		this.user_favstock = user_favstock;
	}

	checkFavStockIsAdded = async () => {
		return await getFavNotAdded(this.user_email, this.user_favstock);
	};

	checkUserExist = async () => {
		return await countUser(this.user_email);
	};

	addFavouritesData = async () => {
		if ((await this.checkFavStockIsAdded()) && (await this.checkUserExist())) {
			const result = await addFavStockDataToDB(this.user_email, this.user_favstock);
			return result;
		}
		return console.log("false in add here");
	};
}

const addPassedFavouritesData = async (req, res) => {
	const reqBody = req.body;
	const addData = new addFavourites(reqBody);
	const result = await addData.addFavouritesData();
	return res.json(result);
};

module.exports = addPassedFavouritesData;
