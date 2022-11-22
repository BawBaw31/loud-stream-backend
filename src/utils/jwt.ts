import * as jwt from "jsonwebtoken";
import * as jose from "jose";

export const createToken = (user: {
  id: number;
  email: string;
  role: string;
}): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  // return await new jose.SignJWT(payload)
  //   .setProtectedHeader({ alg: "PS256" })
  //   .setExpirationTime("2h")
  //   .sign(Buffer.from("shhhhh"));
  // return new jose.UnsecuredJWT(payload).setExpirationTime("2h").encode();

  // return new jose.SignJWT(payload)
  //   .setProtectedHeader({ alg: "HS256" })
  //   .setExpirationTime("2h")
  //   .sign(new Uint8Array(32));

  let token = jwt.sign(payload, "secret", { expiresIn: "2h" });
  console.log("toto", token);
  jwt.verify(Buffer.from(token).toString("utf-8"), {
    key: "secret",
    passphrase: "secret",
  });

  return token;
};

export const verifyToken = async (token: string): Promise<jwt.JwtPayload> => {
  const { payload } = await jose.jwtVerify(token, Buffer.from("shhhhh"));
  return payload;
};
