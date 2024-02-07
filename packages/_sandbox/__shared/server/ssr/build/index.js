"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-comment */
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
let App;
const startApp = () => {
    App = express_1.default();
    App.listen(3000, () => {
        console.log('[Info: Listen 3000 to requests');
    });
};
startApp();
//@ts-ignore
App.use('/', express_1.default.static(path_1.default.join(__dirname, '../../../../../build')));
//# sourceMappingURL=index.js.map