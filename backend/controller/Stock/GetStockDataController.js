const { countStock, checkFieldExist, findData, updateData, findStockInfo } = require("../../model/StockDataModel");
const axios = require("axios");

class getStock {
	constructor(stock_name, field_name) {
		this.stock_name = stock_name;
		this.field_name = field_name;
	}

	getDataApi = async (link) => {
		return await axios
			.get(link)
			.then((response) => {
				return response.data;
			})
			.catch((err) => console.log(err));
	};

	checkStockExist = async () => {
		const res = await countStock(this.stock_name);
		return res === 1;
	};

	checkFieldNotExist = async () => {
		const res = await checkFieldExist(this.stock_name, this.field_name);
		return res === 0;
	};

	searchData = async () => {
		const res = await findData(this.stock_name, this.field_name);
		return res; 
	};

	getNewCompanyData = async () => {
		const dataLink = `https://finnhub.io/api/v1/stock/metric?symbol=${this.stock_name}&metric=all&token=${process.env.FINHUB_API_KEY}`;
		return await this.getDataApi(dataLink);
	};

	getNewNewsData = async () => {
		const startDate = new Date(Date.now() - 604800).toISOString().slice(0, 10);
		const endDate = new Date().toISOString().slice(0, 10);
		const dataLink = `https://finnhub.io/api/v1/company-news?symbol=${this.stock_name}&from=${startDate}&to=${endDate}&token=${process.env.FINHUB_API_KEY}`;
		return await this.getDataApi(dataLink);
	};

	getNewGraphData = async () => {
		const startDate = Math.floor(Date.now() / 1000 - 2678400); 
		const endDate = Math.floor(Date.now() / 1000);
		const dataLink = `https://finnhub.io/api/v1/stock/candle?symbol=${this.stock_name}&resolution=D&from=${startDate}&to=${endDate}&token=${process.env.FINHUB_API_KEY}`;
		return await this.getDataApi(dataLink);
	};

	getStockInfo = async () => {
		return await findStockInfo(this.stock_name);
	}

	addCurrentStockData = async () => {
		let result;
		switch (this.field_name) {
			case "data":
				result = await this.getNewCompanyData();
				break;
			case "news":
				result = await this.getNewNewsData();
				break;
			case "candle":
				result = await this.getNewGraphData();
				break;
			case "stock":
				return await this.getStockInfo();
			default:
				console.log("Error Occured getting new data, Try Again!");
				break;
		}

		if (!result) {
			return await this.searchData();
		}
		await updateData(this.stock_name, this.field_name, result);
		return await this.searchData();
	};

	findStockData = async () => {
		if ((await this.checkStockExist()) && (await this.checkFieldNotExist())) {
			return await this.addCurrentStockData();
		} else if (!this.checkStockExist()) {
			return console.error("error, stock doesn't exist", error);
		}

		const result = await this.searchData();
		const FIVE_MINUTE_DELAY = 300000;
		const LastUpdatedUnix = Math.floor(new Date(result[this.field_name].LastUpdated).getTime());
		const fiveMinuteDelayUnix = Math.floor(Date.now() - FIVE_MINUTE_DELAY);

		if (LastUpdatedUnix <= fiveMinuteDelayUnix) {
			return await this.addCurrentStockData();
		}

		return result;
	};
}

const getStockData = async (req, res) => {
	const stock_name = req.query.id;
	const field_name = req.query.field;
	if (stock_name !== "" && stock_name !== undefined && field_name !== "" && field_name !== undefined) {
		const result = new getStock(stock_name, field_name);
		return res.json(await result.findStockData());
	}
	return res.status(400).json({ 400: "Cannot fetch the request check the parameters in the URL" });
};

module.exports = getStockData;
