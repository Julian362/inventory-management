import { StringValueObjectBase } from '@ValueObjectBase';
import { ValueObjectBase } from '@sofka';
import { LocationType } from '@types';

export class BranchLocationValueObject extends ValueObjectBase<LocationType> {
  city: City;
  country: Country;
  constructor(value: LocationType) {
    super(value);
    this.value = value;
    this.validateData();
  }
  validateData(): void {
    this.city = new City(this.value.city);
    this.country = new Country(this.value.country);
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
