import { IUseCase } from '@applications/interface';
import {
  GetAllBranchUseCase,
  GetAllProductUseCase,
  GetAllUserUseCase,
  GetBranchUseCase,
  GetProductUseCase,
  GetUserUseCase,
  ModifyQuantityProductUseCase,
  RegisterBranchUseCase,
  RegisterCustomerSaleUseCase,
  RegisterProductUseCase,
  RegisterSellerSaleUseCase,
  RegisterUserUseCase,
} from '@applications/use-cases';
import {
  IBranchDomainService,
  IEventService,
  IProductDomainService,
  IUserDomainService,
} from '@domain/services';
import { Observable } from 'rxjs';

export class InventoryDelegate implements IUseCase {
  constructor(
    private readonly productService: IProductDomainService,
    private readonly branchService: IBranchDomainService,
    private readonly userService: IUserDomainService,
    private readonly eventService: IEventService,
  ) {}

  private delegate: IUseCase;
  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateProduct() {
    this.delegate = new RegisterProductUseCase(
      this.productService,
      this.eventService,
    );
  }

  toCreateBranch() {
    this.delegate = new RegisterBranchUseCase(
      this.branchService,
      this.eventService,
    );
  }

  toCreateUser() {
    this.delegate = new RegisterUserUseCase(
      this.userService,
      this.eventService,
    );
  }

  toModifyQuantity() {
    this.delegate = new ModifyQuantityProductUseCase(
      this.productService,
      this.eventService,
    );
  }

  toSellerSale() {
    this.delegate = new RegisterSellerSaleUseCase(
      this.productService,
      this.eventService,
    );
  }

  toCustomerSale() {
    this.delegate = new RegisterCustomerSaleUseCase(
      this.productService,
      this.eventService,
    );
  }

  toGetAllProduct() {
    this.delegate = new GetAllProductUseCase(this.productService);
  }

  toGetAllBranch() {
    this.delegate = new GetAllBranchUseCase(this.branchService);
  }

  toGetAllUser() {
    this.delegate = new GetAllUserUseCase(this.userService);
  }

  toGetUserById() {
    this.delegate = new GetUserUseCase(this.userService);
  }

  toGetProductById() {
    this.delegate = new GetProductUseCase(this.productService);
  }

  toGetBranchById() {
    this.delegate = new GetBranchUseCase(this.branchService);
  }
}
