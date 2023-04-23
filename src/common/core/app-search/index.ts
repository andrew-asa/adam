import commonConst from "../../utils/common_const";

let appSearch;

if (commonConst.macOS()) {
    appSearch = import("./darwin");
} else if (commonConst.windows()) {
    appSearch = require("./win");
} else if (commonConst.linux()) {
    appSearch = require("./linux");
}

export default appSearch;

