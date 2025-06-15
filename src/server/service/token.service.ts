import jwt from "jsonwebtoken";
import moment from "moment";
import config from "../config/config";
import { tokenTypes } from "../config/tokens";

interface JwtCustomPayload extends jwt.JwtPayload {
  sub: string;
  type: string;
}

export const generateToken = (
  userId: string,
  expires: moment.Moment,
  type: string,
  secret: string = config.jwt.secret
) => {
  const payload: JwtCustomPayload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload as object, secret);
};

export const verifyToken = (token: string, type: string) => {
  try {
    const payload = jwt.verify(
      token,
      config.jwt.secret as string
    ) as JwtCustomPayload; //

    if (payload.type !== type) {
      throw new Error("Invalid token type");
    }
    return payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Token tidak valid atau kedaluwarsa.");
  }
};

export const generateAuthTokens = (user: { id: string }) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};
