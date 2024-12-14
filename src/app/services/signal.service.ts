import { computed, Signal, signal } from '@angular/core';

export class SignalService<T> {
  readonly #state = signal({} as T);

  constructor(initialState: T) {
    this.#state.set(initialState);
  }

  /**
   * This is used to set a new value for a property.
   *
   * @param key - the key of the property to be set
   * @param data - the new data to be saved
   */
  public set<K extends keyof T>(key: K, data: T[K]) {
    this.#state.update((currentValue) => ({ ...currentValue, [key]: data }));
  }

  /**
   * Sets values for multiple properties on the store.
   * This is used when there is a need to update multiple
   * properties in the store
   *
   * @param partialState - the partial state that includes
   *                      the new value to be saved
   */
  public setState(partitialState: Partial<T>) {
    this.#state.update((currentValue) => ({
      ...currentValue,
      ...partitialState,
    }));
  }

  /**
   * This is used to get the value of a property
   *
   * @param key - the key of the property to be retrieved
   */
  public get<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.#state()[key]);
  }
}
