const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  
  // // options for cookie
  // const options = {
  //   expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
  //   httpOnly: true,
  // };
  // console.log(options,"token");

  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE);

  // Check if COOKIE_EXPIRE is a valid number
  if (isNaN(cookieExpireDays) || cookieExpireDays <= 0) {
    console.error("Invalid value for COOKIE_EXPIRE:", process.env.COOKIE_EXPIRE);
  }

  // Calculate the expiration time for the cookie
  const expirationDate = new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000);

  // Set the cookie with the specified options
  res.cookie("token", token, {
    expires: expirationDate,
    httpOnly: true,
  });
  // Send the response with success message, user data, and token
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
