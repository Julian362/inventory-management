import { StringValueObjectBase } from '@ValueObjectBase';
import { ValueObjectBase } from '@sofka';
import { location } from '@types';

export class BranchLocationValueObject extends ValueObjectBase<location> {
  city: City;
  country: Country;

  constructor(value: location) {
    super(value);
    this.city = new City(value.city);
    this.country = new Country(value.country);
  }

  validateData(): void {
    if (this.value) {
      this.city.validateData();
      this.country.validateData();
    }
  }
}

class City extends StringValueObjectBase {
  getFieldName(): string {
    return 'ciudad de la sucursal';
  }

  getMaxLength(): number {
    return 100;
  }

  getMinLength(): number {
    return 3;
  }
}

class Country extends StringValueObjectBase {
  getFieldName(): string {
    return 'país de la sucursal';
  }

  getMaxLength(): number {
    return 100;
  }

  getMinLength(): number {
    return 3;
  }
}
