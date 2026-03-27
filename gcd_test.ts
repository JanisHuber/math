import { assertEquals } from "@std/assert";
import { gcdBruteForce, gcdEuclid } from "./gcd.ts";

const gcdTests = [
    { a: 1, b: 1, gcd: 1 },
    { a: 1, b: 2, gcd: 1 },
    { a: 2, b: 2, gcd: 2 },
    { a: 3, b: 4, gcd: 1 },
    { a: 6, b: 9, gcd: 3 },
    { a: 81, b: 36, gcd: 9 },
];

Deno.test("gcd of two numbers", () => {
    for (const { a, b, gcd } of gcdTests) {
        // Arrange & Act
        const result = gcdEuclid(a, b);

        // Assert
        assertEquals(result, gcd);
    }
});

Deno.test("gcd of two identical numbers is the number itself", () => {
    // Arrange & Act
    const result = gcdBruteForce(1, 1);

    // Assert
    assertEquals(result, 1);
});

Deno.test("gcd of 12 and 8 is 4", () => {
  // Arrange & Act
  const result = gcdBruteForce(12, 8);

  // Assert
  assertEquals(result, 4);
});

Deno.test("gcd when one number is a multiple of the other", () => {
  // Arrange & Act
  const result = gcdBruteForce(10, 5);

  // Assert
  assertEquals(result, 5);
});

Deno.test("gcd of coprime numbers is 1", () => {
  // Arrange & Act
  const result = gcdBruteForce(7, 13);

  // Assert
  assertEquals(result, 1);
});

Deno.test("gcd of 1 and any number is 1", () => {
  // Arrange & Act
  const result = gcdBruteForce(1, 100);

  // Assert
  assertEquals(result, 1);
});

Deno.test("edge case: negative numbers", () => {
    // Arrange & Act
    const result = gcdEuclid(-12, -8);

    // Assert
    assertEquals(result, 4);
})