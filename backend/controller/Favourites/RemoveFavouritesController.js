const { getFavNotAdded, countUser, removeFavStockDataFromDB } = require("../../model/FavouritesDataModel");

class removeFavourites {
	constructor({ user_email, user_favstock }) {
		this.user_email = user_email;
		this.user_favstock = user_favstock;
	}

	checkFavStockIsAdded = async () => {
		return await getFavNotAdded(this.user_email, this.user_favstock);
	};

	checkUserExist = async () => {
		return await countUser(this.user_email, this.user_favstock);
	};

	removeFavouritesData = async () => {
		if ((await this.checkUserExist()) && !(await this.checkFavStockIsAdded())) {
			const result = await removeFavStockDataFromDB(this.user_email, this.user_favstock);
			return result;
		}
		return console.log("false in remove here");
	};
}

const removePassedFavouritesData = async (req, res) => {
	const reqBody = req.body;
	const removeData = new removeFavourites(reqBody);
	const result = await removeData.removeFavouritesData();

	return res.json(result);
};

module.exports = removePassedFavouritesData;
