export /**
 * valida si el valor es un booleano
 *
 * @param value valor a validar
 * @return {boolean} true si es un booleano, false si no lo es
 */
const IsBoolean = (value: any): boolean => {
  if (typeof value !== 'boolean') {
    return false;
  }
  return true;
};
