import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Fraction } from "./fraction.ts";

Deno.test("fraction of 1/1 is 1.0", () => {
  // Arrange
  const fraction = new Fraction(1, 1);

  // Act
  const float = fraction.toFloat(0.1);

  // Assert
  assertEquals(float, 1.0);
});

Deno.test("fraction of 2/3 is roughly 0.67", () => {
  // Arrange
  const fraction = new Fraction(2, 3);

  // Act
  const float = fraction.toFloat(0.01);

  // Assert
  assertAlmostEquals(float, 0.67);
});

Deno.test("1/3 + 2/6 = 2/3 is roughly 0.67", () => {
  // Arrange
  const left = new Fraction(1, 3);
  const right = new Fraction(2, 6);

  // Act
  left.add(right);

  // Assert
  assertAlmostEquals(left.toFloat(0.01), 0.67);
});

Deno.test("2/2 = 1/1 after canceling", () => {
    // Arrange
    const fraction = new Fraction(2, 2);

    // Act
    fraction.cancel();

    // Assert
    assertEquals(fraction.toString(), "1/1");
});

Deno.test("2/4 is automatically reduced to 1/2 in constructor", () => {
    // Arrange & Act
    const fraction = new Fraction(2, 4);

    // Assert
    assertEquals(fraction.toString(), "1/2");
});

Deno.test("6/9 is automatically reduced to 2/3 in parse", () => {
    // Arrange & Act
    const fraction = Fraction.parse("6/9");

    // Assert
    assertEquals(fraction.toString(), "2/3");
});

Deno.test("1/3 + 1/6 is automatically reduced to 1/2", () => {
    // Arrange
    const left = new Fraction(1, 3);
    const right = new Fraction(1, 6);

    // Act
    left.add(right);

    // Assert
    assertEquals(left.toString(), "1/2");
});

Deno.test("2/3 * 3/4 is automatically reduced to 1/2", () => {
    // Arrange
    const left = new Fraction(2, 3);
    const right = new Fraction(3, 4);

    // Act
    left.multiply(right);

    // Assert
    assertEquals(left.toString(), "1/2");
});