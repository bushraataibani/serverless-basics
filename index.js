const AWS = require("aws-sdk");
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const { getUserRoleFromToken } = require("./authHelper");

const { USERPOOL, SUPERADMINGROUP, ADMINGROUP, STUDENTGROUP } = process.env;

module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      0
    ),
  };
};

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify("Hello World"),
  };
};

module.exports.createUser = async (event) => {
  try {
    const { username } = JSON.parse(event.body);

    console.log(
      "eventttttttttttttttttt",
      JSON.stringify(event),
      SUPERADMINGROUP
    );
    const userRole = await getUserRoleFromToken(event.headers.authorization);

    console.log("userRoleeee", userRole);

    if (username && (userRole === SUPERADMINGROUP || userRole === ADMINGROUP)) {
      const adminCreateUserParams = {
        UserPoolId: USERPOOL,
        Username: username,
      };

      await cognitoIdentityServiceProvider
        .adminCreateUser(adminCreateUserParams)
        .promise();

      await cognitoIdentityServiceProvider
        .adminSetUserPassword({
          UserPoolId: USERPOOL,
          Username: username,
          Password: "Temp@123",
          Permanent: false,
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify(`${userRole} has created user successfully.`),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(`${userRole} cannot create user.`),
      };
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

module.exports.transferUser = async (event) => {
  try {
    const { username, groupname } = JSON.parse(event.body);

    const userRole = await getUserRoleFromToken(event.headers.authorization);

    if (
      (groupname && userRole === SUPERADMINGROUP && groupname === ADMINGROUP) ||
      (userRole === ADMINGROUP && groupname === STUDENTGROUP)
    ) {
      const addUserToGroupParams = {
        UserPoolId: USERPOOL,
        Username: username,
        GroupName: groupname,
      };

      await cognitoIdentityServiceProvider
        .adminAddUserToGroup(addUserToGroupParams)
        .promise();
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        `${userRole} has transfered user and added to group successfully.`
      ),
    };
  } catch (error) {
    console.error("Error transfering user to group:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
