/**
 *  valida si un valor es mayor a un valor máximo
 *
 * @param {string} value Valor a validar.
 * @param {number} max Valor máximo.
 * @return {boolean} Verdadero si el valor es mayor al máximo.
 */
export const StringMaxLength = (value: string, max: number): boolean => {
  return value.length > max ? true : false;
};
