import { Array2DImpl } from './Array2DImpl';
import { LazyArray2DProxy } from './LazyArray2DProxy';

// Create an instance of Array2DImpl with dimensions 3x3 and populate it with values.
const array = new Array2DImpl(3, 3);
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    array.set(i, j, i * 3 + j + 1); // Populating with numbers 1 to 9.
  }
}

// Save the array to a file.
const fileName = 'array2d.json';
array.save(fileName);
console.log(`Array saved to file: ${fileName}`);

// Create a proxy for lazy loading using the file.
const proxy = new LazyArray2DProxy(fileName);

// The first access via proxy will load the real object from the file.
console.log("Accessing value at (1,1) via proxy:", proxy.get(1, 1)); // Expected value: 5

// Update a value using the proxy.
proxy.set(1, 1, 999);
console.log("Updated value at (1,1) via proxy:", proxy.get(1, 1));

// Optional: Save the updated array back to file (if needed).
// Note: You can add a save method to the proxy if you want to delegate saving as well.
