import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDefs from "./userTypeDefs.js";
import transactionTypeDef from "./transactionTypeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDefs, transactionTypeDef]);

export default mergedTypeDefs;