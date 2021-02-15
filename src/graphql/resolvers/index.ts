import { UserMutation, UserQueries } from "./user";

const rootValue = {
    ...UserQueries,
    ...UserMutation
};

export default rootValue;
