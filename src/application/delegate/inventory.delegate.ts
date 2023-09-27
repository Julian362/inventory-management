import {
  IBranchDomainService,
  IProductDomainService,
  IUserDomainService,
} from '@domain/services';
import { IEventService } from '@domain/services/event.service';
import { Observable } from 'rxjs';
import { IUseCase } from '../interface/use-case.interface';
import { GetAllBranchUseCase } from '../use-cases/branch/get-all.branch.use-case';
import { GetBranchUseCase } from '../use-cases/branch/get.branch.use-case';
import { RegisterBranchUseCase } from '../use-cases/branch/register.branch.use-case';
import { GetAllProductUseCase } from '../use-cases/product/get-all.product.use-case';
import { GetProductUseCase } from '../use-cases/product/get.product.use-case';
import { ModifyQuantityProductUseCase } from '../use-cases/product/register-quantity.product.use-case';
import { RegisterSellerSaleUseCase } from '../use-cases/product/register-seller-sale.product.use-case';
import { RegisterProductUseCase } from '../use-cases/product/register.product.use-case';
import { GetAllUserUseCase } from '../use-cases/user/get-all.user.use-case';
import { GetUserUseCase } from '../use-cases/user/get.user.use-case';
import { RegisterUserUseCase } from '../use-cases/user/register.user.use-case';

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
