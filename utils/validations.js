/**
 * This function validates that the object is not empty.
 * @param {Object} req - Request from the server
 * @param {Object} res - Response from the server
 */
export function validateObjectKeys(req, res) {
  if (Object.keys(req.body).length < 1) {
    return res.status(400).send("Empty object", req.body);
  }
}

// TODO - Test function
