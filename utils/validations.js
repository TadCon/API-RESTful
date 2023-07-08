/**
 * This function validates that the object is not empty.
 * @param {Object} object - Object to validate.
 * @throws {Error} Throws an error if the object is empty.
 */
export function validateObjectKeys(object) {
  if (Object.keys(object).length < 1) {
    throw new Error("Error: invalid object, missing keys");
  }
}

/**
 * This function validates that the object is not null.
 * @param {Object} object - Object to validate.
 * @throws {Error} Throws an error if the object is null.
 */
export function validateObject(object) {
    if (!object) {
      throw new Error("Error: null object");
    }
  }