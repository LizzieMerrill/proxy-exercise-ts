import { Array2D } from './Array2D';
import { Array2DImpl } from './Array2DImpl';

export class LazyArray2DProxy implements Array2D {
  private fileName: string;
  private realObject: Array2D | null = null;

  /**
   * Constructs a proxy with the file name from which the real 2D array object can be loaded.
   * @param fileName The file storing the 2D array data.
   */
  constructor(fileName: string) {
    this.fileName = fileName;
  }

  /**
   * Loads the real object from file if it hasn't been loaded yet.
   */
  private loadRealObject(): void {
    if (this.realObject === null) {
      // Note: The constructor of Array2DImpl uses the fileName to load the array.
      this.realObject = new Array2DImpl(undefined, undefined, this.fileName);
      console.log("Real object loaded from file.");
    }
  }

  public set(row: number, col: number, value: number): void {
    this.loadRealObject();
    this.realObject!.set(row, col, value);
  }

  public get(row: number, col: number): number {
    this.loadRealObject();
    return this.realObject!.get(row, col);
  }
}
