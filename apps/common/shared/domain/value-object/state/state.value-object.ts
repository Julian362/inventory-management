import { IErrorValueObject } from '@sofka';
import { IsBoolean, IsEmpty } from '@validations';
import { ValueObjectBase } from '@sofka';
/**
 *  clase abstracta que representa un valor booleano estado en el dominio
 *
 * @export
 * @abstract
 * @class StateValueObjectBase
 * @extends {ValueObjectBase<boolean>}
 */
export abstract class StateValueObjectBase extends ValueObjectBase<boolean> {
  /**
   * valida los valores del objeto
   *
   * @memberof StateValueObjectBase
   */
  validateData(): void {
    if (this.value) {
      this.validateContent();
      this.isEmpty();
    }
  }

  /**
   *  valida si el valor es un booleano
   *
   * @private
   * @memberof StateValueObjectBase
   */
  private validateContent(): void {
    if (!IsBoolean(this.value)) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} debe ser un booleano`,
      } as IErrorValueObject);
    }
  }

  /**
   * valida si el valor es vacío
   *
   * @private
   * @return {boolean} retorna true si el valor es vacío
   * @memberof StateValueObjectBase
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
   *  método abstracto que retorna el nombre del campo
   *
   * @private
   * @abstract
   * @return {string} retorna el nombre del campo
   * @memberof StateValueObjectBase
   */
  abstract getFieldName(): string;
}
