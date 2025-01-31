const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

export const connectionStr =`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.3ajd1.mongodb.net/shortenUrl?retryWrites=true&w=majority&appName=Cluster0`;
