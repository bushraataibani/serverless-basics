const { CognitoJwtVerifier } = require("aws-jwt-verify");
const { USERPOOL, CLIENTID, SUPERADMINGROUP } = process.env;

const getUserRoleFromToken = async (tokenClaims) => {
  const authorizationHeader = tokenClaims || "";
  if (!authorizationHeader) {
    return null;
  } else {
    const tokenVerified = authorizationHeader.replace("Bearer", "").trim();

    const verifier = CognitoJwtVerifier.create({
      userPoolId: USERPOOL,
      tokenUse: "access",
      clientId: CLIENTID,
    });

    try {
      const payload = await verifier.verify(tokenVerified);
      console.log("payloadddddddd", payload);

      if (
        payload &&
        payload["cognito:groups"] &&
        payload["cognito:groups"].includes(SUPERADMINGROUP)
      ) {
        return SUPERADMINGROUP;
      } else {
        return null;
      }
    } catch (error) {
      console.log("ERROR", error);
      return null;
    }
  }
};

module.exports = {
  getUserRoleFromToken,
};
