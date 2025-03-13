import * as fs from 'fs';
import { Array2D } from './Array2D';

export class Array2DImpl implements Array2D {
  // Initialize with an empty array to satisfy TypeScript.
  private array: number[][] = [];

  /**
   * Constructs a new 2D array.
   * - If a fileName is provided, the array is loaded from the file.
   * - Otherwise, if rows and cols are provided, a new 2D array is created and initialized to 0.
   * - If neither is provided, an empty array is created.
   */
  constructor(rows?: number, cols?: number, fileName?: string) {
    if (fileName) {
      this.load(fileName);
    } else if (rows !== undefined && cols !== undefined) {
      this.array = Array.from({ length: rows }, () => new Array(cols).fill(0));
    }
  }

  public set(row: number, col: number, value: number): void {
    if (!this.array[row] || col < 0 || col >= this.array[row].length) {
      throw new Error("Index out of bounds");
    }
    this.array[row][col] = value;
  }

  public get(row: number, col: number): number {
    if (!this.array[row] || col < 0 || col >= this.array[row].length) {
      throw new Error("Index out of bounds");
    }
    return this.array[row][col];
  }

  /**
   * Saves the current state of the 2D array to a file as JSON.
   * @param fileName The file to save the array to.
   */
  public save(fileName: string): void {
    const data = JSON.stringify(this.array);
    fs.writeFileSync(fileName, data, 'utf-8');
  }

  /**
   * Loads the state of the 2D array from a file.
   * @param fileName The file to load the array from.
   */
  public load(fileName: string): void {
    const data = fs.readFileSync(fileName, 'utf-8');
    this.array = JSON.parse(data);
  }
}
