import { validate as uuidValidate, version as uuidVersion } from 'uuid';

/**
 *  valida si un valor es un uuid
 *
 * @param {string} value  Valor a validar.
 * @return {boolean}  Verdadero si el valor es un uuid.
 */
export const IsUUID = (value: string): boolean => {
  return uuidValidate(value) && uuidVersion(value) === 4;
};
