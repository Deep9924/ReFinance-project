const { findStockToRemove, removeStockDataFromDB } = require("../../model/StockDataModel");
const { getUserRole } = require("../../model/UserDataModel");

class removeStock {
	constructor(stockToRemove) {
		this.stockToRemove = stockToRemove;
	}

	checkUserIsAdmin = async () => {
		return await getUserRole(this.stockToRemove.user_email);
	};

	removeStockData = async () => {
		if (
			(await this.checkUserIsAdmin()) &&
			(await findStockToRemove(this.stockToRemove.symbol, this.stockToRemove.type, this.stockToRemove.currency))
		) {
			const result = await removeStockDataFromDB(this.stockToRemove);
			console.log(result)
			return result;
		}
		return error;
	};
}

const removeStockData = async (req, res) => {
	const reqBody = req.body;
	const removeData = new removeStock(reqBody);
	try {
		await removeData.removeStockData();
		return res.status(200).json({ status: "ok" });
	} catch {
		return res.status(400).json("Error Occured, Stock has not been removed from database");
	}
};

module.exports = removeStockData;