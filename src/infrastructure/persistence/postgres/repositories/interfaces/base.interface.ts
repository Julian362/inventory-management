import { Observable } from 'rxjs';

export interface IBase<Entity> {
  create(entity: Entity): Observable<Entity>;

  findById(id: string): Observable<Entity>;

  findAll(): Observable<Entity[]>;
}
