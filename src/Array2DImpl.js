"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array2DImpl = void 0;
const fs = __importStar(require("fs"));
class Array2DImpl {
    /**
     * Constructs a new 2D array.
     * - If a fileName is provided, the array is loaded from the file.
     * - Otherwise, if rows and cols are provided, a new 2D array is created and initialized to 0.
     * - If neither is provided, an empty array is created.
     */
    constructor(rows, cols, fileName) {
        // Initialize with an empty array to satisfy TypeScript.
        this.array = [];
        if (fileName) {
            this.load(fileName);
        }
        else if (rows !== undefined && cols !== undefined) {
            this.array = Array.from({ length: rows }, () => new Array(cols).fill(0));
        }
    }
    set(row, col, value) {
        if (!this.array[row] || col < 0 || col >= this.array[row].length) {
            throw new Error("Index out of bounds");
        }
        this.array[row][col] = value;
    }
    get(row, col) {
        if (!this.array[row] || col < 0 || col >= this.array[row].length) {
            throw new Error("Index out of bounds");
        }
        return this.array[row][col];
    }
    /**
     * Saves the current state of the 2D array to a file as JSON.
     * @param fileName The file to save the array to.
     */
    save(fileName) {
        const data = JSON.stringify(this.array);
        fs.writeFileSync(fileName, data, 'utf-8');
    }
    /**
     * Loads the state of the 2D array from a file.
     * @param fileName The file to load the array from.
     */
    load(fileName) {
        const data = fs.readFileSync(fileName, 'utf-8');
        this.array = JSON.parse(data);
    }
}
exports.Array2DImpl = Array2DImpl;
