/**
 * Check if the input position is inside of provided position and dimension.
 * @function
 * @param {number} inputPosition 
 * @param {number} position 
 * @param {number} dimension 
 * @returns {boolean}
 */
export const betweenRange = (inputPosition, position, dimension) => 
    inputPosition >= position && inputPosition <= position + dimension;