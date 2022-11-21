const db = require("./DBModel").collection("Refinance_User");

const getUserRole = async (user_email) => {
	if (await db.count({ email: user_email, role: "admin" })) {
		return true;
	}
	return false;
};

const checkUserInDB = async (user_email) => {
	return (await db.count({ email: user_email })) === 0;
};

const getUserDataFromDB = async (user_email) => {
	try {
		return await db.findOne(
			{ email: user_email },
			{
				projection: {
					email: 1,
					firstname: 1,
					avatar: 1,
					role: 1,
					favourites: -1,
				},
			}
		);
	} catch (e) {
		return false;
	}
};

const addUserToDBND = async (userToAdd) => {
	try {
		return await db.insertOne({
			email: userToAdd.user_email,
			firstname: userToAdd.user_firstname,
			lastname: userToAdd.user_lastname,
			avatar: userToAdd.user_avatar,
			role: "user",
			favourites: [],
		});
	} catch (e) {
		console.error(e);
		return false;
	}
};

module.exports = {
	getUserRole,
	checkUserInDB,
	getUserDataFromDB,
	addUserToDBND,
};
