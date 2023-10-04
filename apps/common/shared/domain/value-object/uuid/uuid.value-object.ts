import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { IsEmpty, IsUUID } from '@validations';

/**
 *  clase abstracta que representa un valor uuid
 *
 * @export
 * @abstract
 * @class UUIDValueObjectBase
 * @extends {ValueObjectBase<string>}
 */
export abstract class UUIDValueObjectBase extends ValueObjectBase<string> {
  /**
   *  valida los valores del objeto
   *
   * @memberof UUIDValueObjectBase
   */
  validateData(): void {
    if (this.value) {
      this.isEmpty();
      this.validateUUID();
    }
  }

  /**
   * valida si el valor es vacío
   *
   * @private
   * @return {boolean} retorna true si el valor es vacío
   * @memberof UUIDValueObjectBase
   */
  private isEmpty(): boolean {
    if (IsEmpty(this.value)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} no puede estar vacío`,
      } as IErrorValueObject);
      return true;
    }
    return false;
  }

  /**
   *  valida si el valor es un uuid
   *
   * @private
   * @memberof UUIDValueObjectBase
   */
  private validateUUID(): void {
    if (!IsUUID(this.value)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} debe ser un uuid válido`,
      } as IErrorValueObject);
    }
  }
  /**
   *  método abstracto que retorna el nombre del campo
   *
   * @private
   * @abstract
   * @return {string} retorna el nombre del campo
   * @memberof UUIDValueObjectBase
   */
  abstract getFieldName(): string;
}
