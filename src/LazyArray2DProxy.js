"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyArray2DProxy = void 0;
const Array2DImpl_1 = require("./Array2DImpl");
class LazyArray2DProxy {
    /**
     * Constructs a proxy with the file name from which the real 2D array object can be loaded.
     * @param fileName The file storing the 2D array data.
     */
    constructor(fileName) {
        this.realObject = null;
        this.fileName = fileName;
    }
    /**
     * Loads the real object from file if it hasn't been loaded yet.
     */
    loadRealObject() {
        if (this.realObject === null) {
            // Note: The constructor of Array2DImpl uses the fileName to load the array.
            this.realObject = new Array2DImpl_1.Array2DImpl(undefined, undefined, this.fileName);
            console.log("Real object loaded from file.");
        }
    }
    set(row, col, value) {
        this.loadRealObject();
        this.realObject.set(row, col, value);
    }
    get(row, col) {
        this.loadRealObject();
        return this.realObject.get(row, col);
    }
}
exports.LazyArray2DProxy = LazyArray2DProxy;
