/**
 * Convert an environment variable from a string to a number. If the variable
 * is not defined or does not encode a number then return `undefined`.
 */
export const castNumber = (envVar: string | undefined): number | undefined => {
  const num = Number(envVar);
  return isNaN(num) ? undefined : num;
};
