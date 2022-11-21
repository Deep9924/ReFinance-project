const { countStock, addStockDataToDB } = require("../../model/StockDataModel");
const { getUserRole } = require("../../model/UserDataModel");

class addStock {
	constructor(stockToAdd) {
		this.stockToAdd = stockToAdd;
	}

	checkUserIsAdmin = async () => {
		return await getUserRole(this.stockToAdd.user_email);
	};

	addStockData = async () => {
		if ((await this.checkUserIsAdmin()) && (await countStock(this.stockToAdd.symbol)) === 0) {
			const result = await addStockDataToDB(this.stockToAdd);
			return result;
		}
		return error;
	};
}

const addPassedStockData = async (req, res) => {
	const reqBody = req.body;
	const addData = new addStock(reqBody);
	try {
		await addData.addStockData();
		return res.status(200).json({ status: "ok" });
	} catch {
		return res.status(400).json("Not Added to Home News");
	}
};

module.exports = addPassedStockData;