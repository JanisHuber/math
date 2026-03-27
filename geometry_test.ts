import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Circle, Point2D, Rectangle } from "./geometry.ts";

Deno.test("circumference of a circle with radius 5 is roughtly 31.416", () => {
  // Given
  const circle = new Circle(new Point2D(3, 4), 5);

  // When
  const actual = circle.circumference();

  // Then
  assertAlmostEquals(actual, 31.416, 0.01);
});

Deno.test("rectangle does not encompass a circle that is completely outside", () => {
  // Given
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(5, 5));
  const circle = new Circle(new Point2D(20, 20), 3);

  // When & Then
  assertEquals(rect.encompasses(circle), false);
});

Deno.test("circle encompasses a smaller concentric circle", () => {
  // Given
  const outer = new Circle(new Point2D(0, 0), 10);
  const inner = new Circle(new Point2D(0, 0), 5);

  // When & Then
  assertEquals(outer.encompasses(inner), true);
});

Deno.test("circle does not encompass a circle that sticks out", () => {
  // Given
  const outer = new Circle(new Point2D(0, 0), 10);
  const inner = new Circle(new Point2D(8, 0), 5);

  // When & Then
  assertEquals(outer.encompasses(inner), false);
});

Deno.test("circle encompasses a rectangle whose corners all lie within it", () => {
  // Given
  const circle = new Circle(new Point2D(0, 0), 10);
  const rect = new Rectangle(new Point2D(-5, -5), new Point2D(5, 5));

  // When & Then
  assertEquals(circle.encompasses(rect), true);
});

Deno.test("circle does not encompass a rectangle whose corners lie outside it", () => {
  // Given
  const circle = new Circle(new Point2D(0, 0), 5);
  const rect = new Rectangle(new Point2D(-5, -5), new Point2D(5, 5));

  // When & Then
  assertEquals(circle.encompasses(rect), false);
});

Deno.test("rectangle encompasses a smaller rectangle inside it", () => {
  // Given
  const outer = new Rectangle(new Point2D(-10, -10), new Point2D(10, 10));
  const inner = new Rectangle(new Point2D(-5, -5), new Point2D(5, 5));

  // When & Then
  assertEquals(outer.encompasses(inner), true);
});

Deno.test("rectangle does not encompass a rectangle that sticks out", () => {
  // Given
  const outer = new Rectangle(new Point2D(-5, -5), new Point2D(5, 5));
  const inner = new Rectangle(new Point2D(-3, -3), new Point2D(6, 3));

  // When & Then
  assertEquals(outer.encompasses(inner), false);
});

Deno.test("rectangle encompasses a circle that fits within its bounds", () => {
  // Given
  const rect = new Rectangle(new Point2D(-10, -10), new Point2D(10, 10));
  const circle = new Circle(new Point2D(0, 0), 5);

  // When & Then
  assertEquals(rect.encompasses(circle), true);
});

Deno.test("rectangle does not encompass a circle that sticks out", () => {
  // Given
  const rect = new Rectangle(new Point2D(-4, -4), new Point2D(4, 4));
  const circle = new Circle(new Point2D(0, 0), 5);

  // When & Then
  assertEquals(rect.encompasses(circle), false);
});

// --- Point2D.isBetweenX / isBetweenY ---

Deno.test("center M lies between W and E on x-axis", () => {
  const circle = new Circle(new Point2D(3, 4), 5);
  const m = circle.center;
  assertEquals(m.isBetweenX(circle.west(), circle.east()), true);
});

Deno.test("center M does not lie strictly between N and S on x-axis (same x)", () => {
  const circle = new Circle(new Point2D(3, 4), 5);
  const m = circle.center;
  assertEquals(m.isBetweenX(circle.north(), circle.south()), false);
});

Deno.test("center M lies between S and N on y-axis", () => {
  const circle = new Circle(new Point2D(3, 4), 5);
  const m = circle.center;
  assertEquals(m.isBetweenY(circle.south(), circle.north()), true);
});

Deno.test("center M does not lie strictly between W and E on y-axis (same y)", () => {
  const circle = new Circle(new Point2D(3, 4), 5);
  const m = circle.center;
  assertEquals(m.isBetweenY(circle.west(), circle.east()), false);
});

// --- Circle cardinal points ---

Deno.test("north of circle(3,4) with radius 5 is (3,9)", () => {
  const circle = new Circle(new Point2D(3, 4), 5);
  const n = circle.north();
  assertEquals(n.x, 3);
  assertEquals(n.y, 9);
});

Deno.test("south of circle(3,4) with radius 5 is (3,-1)", () => {
  const circle = new Circle(new Point2D(3, 4), 5);
  const s = circle.south();
  assertEquals(s.x, 3);
  assertEquals(s.y, -1);
});

Deno.test("east of circle(3,4) with radius 5 is (8,4)", () => {
  const circle = new Circle(new Point2D(3, 4), 5);
  const e = circle.east();
  assertEquals(e.x, 8);
  assertEquals(e.y, 4);
});

Deno.test("west of circle(3,4) with radius 5 is (-2,4)", () => {
  const circle = new Circle(new Point2D(3, 4), 5);
  const w = circle.west();
  assertEquals(w.x, -2);
  assertEquals(w.y, 4);
});
