/**
 *  valida si un valor es menor a un valor mínimo
 *
 * @param {string} value  Valor a validar.
 * @param {number} min  Valor mínimo.
 * @return {boolean}   Verdadero si el valor es menor al mínimo.
 */
export const StringMinLength = (value: string, min: number): boolean => {
  return value.length < min;
};
