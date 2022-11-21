const { countNews, addHomeNewsDataToDB } = require("../../model/HomeNewsDataModel");
const { getUserRole } = require("../../model/UserDataModel");

class addHomeNews {
	constructor(newsToAdd) {
		this.newsToAdd = newsToAdd;
	}

	checkUserIsAdmin = async () => {
		return await getUserRole(this.newsToAdd.user_email);
	};

	checkNewsDoesNotExist = async () => {
		return await countNews(this.newsToAdd.news_title, this.newsToAdd.news_link);
	};

	addHomeNewsData = async () => {
		if ((await this.checkUserIsAdmin()) && (await this.checkNewsDoesNotExist())) {
			const result = await addHomeNewsDataToDB(this.newsToAdd);
			return result;
		}
		return error;
	};
}

const addPassedHomeNewsData = async (req, res) => {
	const reqBody = req.body;
	const addData = new addHomeNews(reqBody);
	try {
		await addData.addHomeNewsData();
		return res.status(200).json({ status: "ok" });
	} catch {
		return res.status(400).json("Not Added to Home News");
	}
};

module.exports = addPassedHomeNewsData;
