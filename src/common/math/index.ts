/**
 * Returns the absolute value of a number (the value without regard to whether it is positive or negative).
 * For example, the absolute value of -5 is the same as the absolute value of 5.
 * @param x A numeric expression for which the absolute value is needed.
 */
export const abs = Math.abs

/**
 * Returns the arc cosine (or inverse cosine) of a number.
 * @param x A numeric expression.
 */
export const acos = Math.acos

/**
 * Returns the arcsine of a number.
 * @param x A numeric expression.
 */
export const asin = Math.asin

/**
 * Returns the arctangent of a number.
 * @param x A numeric expression for which the arctangent is needed.
 */
export const atan = Math.atan

/**
 * Returns the angle (in radians) between the X axis and the line going through both the origin and the given point.
 * @param y A numeric expression representing the cartesian y-coordinate.
 * @param x A numeric expression representing the cartesian x-coordinate.
 */
export const atan2 = Math.atan2

/**
 * Returns the smallest integer greater than or equal to its numeric argument.
 * @param x A numeric expression.
 */
export const ceil = Math.ceil

/**
 * Returns the cosine of a number.
 * @param x A numeric expression that contains an angle measured in radians.
 */
export const cos = Math.cos

/**
 * Returns e (the base of natural logarithms) raised to a power.
 * @param x A numeric expression representing the power of e.
 */
export const exp = Math.exp

/**
 * Returns the greatest integer less than or equal to its numeric argument.
 * @param x A numeric expression.
 */
export const floor = Math.floor

/**
 * Returns the natural logarithm (base e) of a number.
 * @param x A numeric expression.
 */
export const log = Math.log

/**
 * Returns the larger of a set of supplied numeric expressions.
 * @param values Numeric expressions to be evaluated.
 */
export const max = Math.max

/**
 * Returns the smaller of a set of supplied numeric expressions.
 * @param values Numeric expressions to be evaluated.
 */
export const min = Math.min

/**
 * Returns the value of a base expression taken to a specified power.
 * @param x The base value of the expression.
 * @param y The exponent value of the expression.
 */
export const pow = Math.pow

/** Returns a pseudorandom number between 0 and 1. */
export const random = Math.random

/**
 * Returns a supplied numeric expression rounded to the nearest integer.
 * @param x The value to be rounded to the nearest integer.
 */
export const round = Math.round

/**
 * Returns the sine of a number.
 * @param x A numeric expression that contains an angle measured in radians.
 */
export const sin = Math.sin

/**
 * Returns the square root of a number.
 * @param x A numeric expression.
 */
export const sqrt = Math.sqrt

/**
 * Returns the tangent of a number.
 * @param x A numeric expression that contains an angle measured in radians.
 */
export const tan = Math.tan

/**
 * Returns the number of leading zero bits in the 32-bit binary representation of a number.
 * @param x A numeric expression.
 */
export const clz32 = Math.clz32

/**
 * Returns the result of 32-bit multiplication of two numbers.
 * @param x First number
 * @param y Second number
 */
export const imul = Math.imul

/**
 * Returns the sign of the x, indicating whether x is positive, negative or zero.
 * @param x The numeric expression to test
 */
export const sign = Math.sign

/**
 * Returns the base 10 logarithm of a number.
 * @param x A numeric expression.
 */
export const log10 = Math.log10

/**
 * Returns the base 2 logarithm of a number.
 * @param x A numeric expression.
 */
export const log2 = Math.log2

/**
 * Returns the natural logarithm of 1 + x.
 * @param x A numeric expression.
 */
export const log1p = Math.log1p

/**
 * Returns the result of (e^x - 1), which is an implementation-dependent approximation to
 * subtracting 1 from the exponential function of x (e raised to the power of x, where e
 * is the base of the natural logarithms).
 * @param x A numeric expression.
 */
export const expm1 = Math.expm1

/**
 * Returns the hyperbolic cosine of a number.
 * @param x A numeric expression that contains an angle measured in radians.
 */
export const cosh = Math.cosh

/**
 * Returns the hyperbolic sine of a number.
 * @param x A numeric expression that contains an angle measured in radians.
 */
export const sinh = Math.sinh

/**
 * Returns the hyperbolic tangent of a number.
 * @param x A numeric expression that contains an angle measured in radians.
 */
export const tanh = Math.tanh

/**
 * Returns the inverse hyperbolic cosine of a number.
 * @param x A numeric expression that contains an angle measured in radians.
 */
export const acosh = Math.acosh

/**
 * Returns the inverse hyperbolic sine of a number.
 * @param x A numeric expression that contains an angle measured in radians.
 */
export const asinh = Math.asinh

/**
 * Returns the inverse hyperbolic tangent of a number.
 * @param x A numeric expression that contains an angle measured in radians.
 */
export const atanh = Math.atanh

/**
 * Returns the square root of the sum of squares of its arguments.
 * @param values Values to compute the square root for.
 *     If no arguments are passed, the result is +0.
 *     If there is only one argument, the result is the absolute value.
 *     If any argument is +Infinity or -Infinity, the result is +Infinity.
 *     If any argument is NaN, the result is NaN.
 *     If all arguments are either +0 or −0, the result is +0.
 */
export const hypot = Math.hypot

/**
 * Returns the integral part of the a numeric expression, x, removing any fractional digits.
 * If x is already an integer, the result is x.
 * @param x A numeric expression.
 */
export const trunc = Math.trunc

/**
 * Returns the nearest single precision float representation of a number.
 * @param x A numeric expression.
 */
export const fround = Math.fround

/**
 * Returns an implementation-dependent approximation to the cube root of number.
 * @param x A numeric expression.
 */
export const cbrt = Math.cbrt

export function clamp(value: number, min: number, max: number): number {
  // if (min > max) {
  //   throw new RangeError('The minimum value must be less than or equal to the maximum value.')
  // }
  return Math.min(Math.max(value, min), max)
}
