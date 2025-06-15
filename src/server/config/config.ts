const config = {
  jwt: {
    secret: process.env.JWT_SECRET || "dev_default_secret",
    accessExpirationMinutes: 15,
    refreshExpirationDays: 30,
  },
};

export default config;
