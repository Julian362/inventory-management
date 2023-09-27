import { ValueObjectBase } from '@sofka';
import {
  IsPasswordValid,
  StringMaxLength,
  StringMinLength,
} from '@validations';

export class UserPasswordValueObject extends ValueObjectBase<string> {
  validateData(): void {
    if (this.value) {
      this.minLength();
      this.maxLength();
      this.validateStructure();
    }
  }
  private minLength(): void {
    if (StringMinLength(this.value, 8)) {
      this.setError({
        field: 'contraseña del usuario',
        message: `La contraseña del usuario no puede tener menos de 8 caracteres`,
      });
    }
  }

  private maxLength(): void {
    if (StringMaxLength(this.value, 20)) {
      this.setError({
        field: 'contraseña del usuario',
        message: `La contraseña del usuario no puede tener más de 20 caracteres`,
      });
    }
  }

  private validateStructure(): void {
    if (!IsPasswordValid(this.value)) {
      this.setError({
        field: 'contraseña del usuario',
        message: `La contraseña del usuario no tiene un formato válido,
        La contraseña debe tener al entre 8 y 20 caracteres
        ,al menos un dígito
        ,al menos una minúscula
        ,al menos una mayúscula
        ,al menos un carácter no alfanumérico.
        Ejemplo:
        w3Unpo<code>t0d0`,
      });
    }
  }
}
