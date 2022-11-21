const db = require("./DBModel").collection("Refinance_News");

const getHomeNews = async () => {
	return await db.find().sort({ uploaded_datetime: -1 }).limit(15).toArray();
};

const countNews = async (news_title, news_link) => {
	return (await db.count({ title: news_title, link: news_link })) === 0;
};

const addHomeNewsDataToDB = async (newsToAdd) => {
	try {
		await db.insertOne({
			title: newsToAdd.news_title,
			description: newsToAdd.news_description,
			image: newsToAdd.news_image,
			link: newsToAdd.news_link,
			uploaded_datetime: Date.now(),
		});
	} catch (e) {
		console.error(e);
		return false, e;
	}
	return true;
};

const removeHomeNewsDataFromDB = async (newsToRemove) => {
	try {
		await db.deleteOne({
			title: newsToRemove.news_title,
			link: newsToRemove.news_link,
		});
	} catch (e) {
		console.error(e);
		return false;
	}
	return true;
};

module.exports = {
	getHomeNews,
	countNews,
	addHomeNewsDataToDB,
	removeHomeNewsDataFromDB,
};
