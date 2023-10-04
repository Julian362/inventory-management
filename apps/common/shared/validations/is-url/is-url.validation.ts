/**
 *  Valida si el valor es una url.
 *
 * @param {string} value  Valor a validar.
 * @return {boolean} Verdadero si el valor es una url.
 */
export const IsUrl = (value: string) => {
  const urlRegex = /^(https?:\/\/|\/)?(.+\.(png|jpg|jpeg|gif))$/i;
  return urlRegex.test(value);
};
