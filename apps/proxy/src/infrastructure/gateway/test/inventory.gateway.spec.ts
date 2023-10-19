import { Test, TestingModule } from '@nestjs/testing';
import { InventoryGateway } from '../inventory.gateway';

describe('InventoryGateway', () => {
  let inventoryGateway: InventoryGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryGateway],
    }).compile();

    inventoryGateway = module.get<InventoryGateway>(InventoryGateway);
    inventoryGateway.server = {
      to: jest.fn(),
    } as any;
  });

  it('should be defined', () => {
    expect(inventoryGateway).toBeDefined();
  });

  it('afterInit', () => {
    // Arrange
    const server = {};
    const consoleSpy = jest.spyOn(console, 'log');
    // Act
    inventoryGateway.afterInit(server);
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('socket.io server initialized');
  });

  it('handleConnection', () => {
    // Arrange
    const client = {};
    const args = [];
    const consoleSpy = jest.spyOn(console, 'log');
    // Act
    inventoryGateway.handleConnection(client, args);
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('client connected');
  });

  it('handleDisconnect', () => {
    // Arrange
    const client = {};
    const consoleSpy = jest.spyOn(console, 'log');
    // Act
    inventoryGateway.handleDisconnect(client);
    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('client disconnected');
  });

  it('handleJoinInventory', () => {
    // Arrange
    const client = {
      join: jest.fn(),
    } as any;
    const branch = 'branch';
    // Act
    inventoryGateway.handleJoinInventory(client, branch);
    // Assert
    expect(client.join).toHaveBeenCalledWith(`branch.${branch}`);
  });

  it('handleJoinSale', () => {
    // Arrange
    const client = {
      join: jest.fn(),
    } as any;
    const branch = 'branch';
    // Act
    inventoryGateway.handleJoinSale(client, branch);
    // Assert
    expect(client.join).toHaveBeenCalledWith(`branch.sale.${branch}`);
  });

  it('handleRoomLeave', () => {
    // Arrange
    const client = {
      leave: jest.fn(),
    } as any;
    const id = 'id';
    // Act
    inventoryGateway.handleRoomLeave(client, id);
    // Assert
    expect(client.leave).toHaveBeenCalledWith(`branch.${id}`);
  });
});
