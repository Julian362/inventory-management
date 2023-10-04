import { UUIDValueObjectBase } from '@ValueObjectBase';
import { v4 as uuid } from 'uuid';

export class BranchIdValueObject extends UUIDValueObjectBase {
  constructor(value?: string) {
    super(value || uuid());
  }

  getFieldName(): string {
    return 'id de la sucursal';
  }
}
