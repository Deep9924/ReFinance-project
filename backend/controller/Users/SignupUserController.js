const { addUserToDBND, checkUserInDB } = require("../../model/UserDataModel");

class SignupUser {
	constructor(UserData) {
		this.UserData = UserData;
		this.user_email = UserData.user_email;
		this.user_firstname = UserData.user_firstname;
		this.user_lastname = UserData.user_lastname;
		this.user_avatar = UserData.user_avatar;
	}

	checkUserExist = async () => {
		return await checkUserInDB(this.user_email);
	};

	addUserData = async () => {
			return await addUserToDBND(this.UserData);
	};
}

const getUserDatas = async (req, res) => {
	const reqBody = req.body;
	const getData = new SignupUser(reqBody);
	
	return res.json(await getData.addUserData());
};

module.exports = getUserDatas;