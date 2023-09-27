import {
  IBranchDomainService,
  IProductDomainService,
  IUserDomainService,
} from '@domain/services';
import { Observable } from 'rxjs';
import { IUseCase } from '../interface/use-case.interface';
import { RegisterBranchUseCase } from '../use-cases/branch/register.branch.use-case';
import { ModifyQuantityProductUseCase } from '../use-cases/product/register-quantity.product.use-case';
import { RegisterSellerSaleUseCase } from '../use-cases/product/register-seller-sale.product.use-case';
import { RegisterProductUseCase } from '../use-cases/product/register.product.use-case';
import { RegisterUserUseCase } from '../use-cases/user/register.user.use-case';

export class InventoryDelegate implements IUseCase {
  constructor(
    private readonly productService: IProductDomainService,
    private readonly branchService: IBranchDomainService,
    private readonly userService: IUserDomainService,
  ) {}

  private delegate: IUseCase;
  execute<Response>(...args: any[]): Observable<Response> {
    return this.delegate.execute(...args);
  }

  toCreateProduct() {
    this.delegate = new RegisterProductUseCase(this.productService);
  }

  toCreateBranch() {
    this.delegate = new RegisterBranchUseCase(this.branchService);
  }

  toCreateUser() {
    this.delegate = new RegisterUserUseCase(this.userService);
  }

  toModifyQuantity() {
    this.delegate = new ModifyQuantityProductUseCase(this.productService);
  }

  toSellerSale() {
    this.delegate = new RegisterSellerSaleUseCase(this.productService);
  }
}
