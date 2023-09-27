import { Observable } from 'rxjs';

/**
 * interface for update repository
 *
 * @export
 * @interface IUpdateRepository
 * @typedef {IUpdateRepository}
 * @template Entity
 */
export interface IUpdateRepository<Entity> {
  /**
   * update entity
   *
   * @param {string} _id - id of entity
   * @param {Entity} entity - entity to update
   * @returns {Observable<Entity>} - entity updated
   */
  update(_id: string, entity: Entity): Observable<Entity>;
}
