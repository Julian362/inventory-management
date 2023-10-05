import { Observable } from 'rxjs';

/**
 * interface for base repository
 *
 * @export
 * @interface IBaseRepository
 * @typedef {IBaseRepository}
 * @template Entity
 */
export interface IBaseRepository<Entity> {
  /**
   * create entity
   *
   * @param {Entity} entity - entity to create
   * @returns {Observable<Entity>} - entity created
   */
  create(entity: Entity): Observable<Entity>;

  /**
   * find entity by id
   *
   * @param {string} document - id of entity
   * @returns {Observable<Entity>} - entity found
   */
  findById(document: string): Observable<Entity>;
}
