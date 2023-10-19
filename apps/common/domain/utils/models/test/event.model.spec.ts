import { ProductDomainEntity } from '@domain/entities';
import { ProductCategory } from '@enums';
import { EventModelDomain } from '../event.model';

describe('EventModel', () => {
  let eventModel: EventModelDomain;

  beforeEach(() => {
    eventModel = new EventModelDomain();
  });

  it('se crea una instancia', () => {
    expect(eventModel).toBeDefined();
  });
  it('se crea una instancia correctamente con valores validos', () => {
    // Arrange
    const aggregateRootId = '2fb10919-473d-4a0f-9a16-171e1f0b60c9';
    const eventBody = new ProductDomainEntity({
      branchId: 'f8e98b53-33d9-436a-80b9-825739c04a24',
      category: ProductCategory.ConstructionHardware,
      description: 'Martillo de 16oz',
      name: 'Martillo',
      price: 10000,
      quantity: 10,
    });
    const occurredOn = new Date();
    const typeName = 'ProductCreated';

    // Act
    const eventModel = new EventModelDomain();
    eventModel.aggregateRootId = aggregateRootId;
    eventModel.eventBody = eventBody;
    eventModel.occurredOn = occurredOn;
    eventModel.typeName = typeName;

    // Assert
    expect(eventModel.aggregateRootId).toBe(aggregateRootId);
    expect(eventModel.eventBody).toBe(eventBody);
    expect(eventModel.occurredOn).toBe(occurredOn);
    expect(eventModel.typeName).toBe(typeName);
  });
});
