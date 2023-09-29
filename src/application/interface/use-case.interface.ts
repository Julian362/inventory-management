import { Observable } from 'rxjs';

/**
 * Interfaz que define el contrato de un caso de uso
 *
 * @export
 * @interface IUseCase
 * @typedef {IUseCase}
 */
export interface IUseCase {
  /**
   * ejecuta el caso de uso
   *
   * @param {...any[]} args
   * @returns {Observable<any>}
   */
  execute(...args: any[]): Observable<any>;
}
