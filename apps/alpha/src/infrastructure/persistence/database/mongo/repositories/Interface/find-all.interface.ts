import { Observable } from 'rxjs';

/**
 * interface for find all repository
 *
 * @export
 * @interface IFindAll
 * @typedef {IFindAll}
 * @template Entity
 */
export interface IFindAll<Entity> {
  /**
   * find all entities
   *
   * @returns {Observable<Entity[]>} - entities found
   */
  findAll(): Observable<Entity[]>;
}
