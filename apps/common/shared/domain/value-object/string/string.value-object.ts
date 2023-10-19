import { IErrorValueObject, ValueObjectBase } from '@sofka';
import { IsEmpty, StringMaxLength, StringMinLength } from '@validations';

/**
 *  clase abstracta que representa un valor string en el dominio
 *
 * @export
 * @abstract
 * @class StringValueObjectBase
 * @extends {ValueObjectBase<string>}
 */
export abstract class StringValueObjectBase extends ValueObjectBase<string> {
  /**
   *  valida los valores del objeto
   *
   * @memberof StringValueObjectBase
   */
  validateData(): void {
    this.isEmpty();
    if (this.value) {
      this.MaxLength();
      this.MinLength();
    }
  }

  /**
   *  valida si el valor es menor al máximo de caracteres
   *
   * @private
   * @memberof StringValueObjectBase
   */
  private MaxLength(): void {
    if (StringMaxLength(this.value, this.getMaxLength())) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} no puede superar ${this.getMaxLength()} de caracteres`,
      } as IErrorValueObject);
    }
  }

  /**
   * valida si el valor es vacío
   *
   * @private
   * @return {boolean} retorna true si el valor es vacío
   * @memberof StringValueObjectBase
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
   *  valida si el valor es mayor al mínimo de caracteres
   *
   * @private
   * @memberof StringValueObjectBase
   */
  private MinLength(): void {
    if (StringMinLength(this.value, this.getMinLength())) {
      this.setError({
        field: this.getFieldName(),
        message: `El campo ${this.getFieldName()} debe tener al menos ${this.getMinLength()} caracteres`,
      } as IErrorValueObject);
    }
  }

  /**
   *  método abstracto que retorna el nombre del campo
   *
   * @private
   * @abstract
   * @return {string} retorna el nombre del campo
   * @memberof StringValueObjectBase
   */
  abstract getFieldName(): string;
  abstract getMinLength(): number;
  abstract getMaxLength(): number;
}
