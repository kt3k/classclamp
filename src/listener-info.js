import {KEY_EVENT_LISTENERS} from './const'

/**
 * The event listener's information model.
 * @param {string} event The event name to bind
 * @param {string} selector The selector to bind the listener
 * @param {string} key The handler name
 */
export default function ListenerInfo (event, selector, key) {
  /**
   * Binds the listener to the given element with the given coelement.
   * @param {jQuery} elem The jquery element
   * @param {object} coelem The coelement which is bound to the element
   */
  this.bindTo = (elem, coelem) => {
    elem.on(event, selector, function () {
      coelem[key].apply(coelem, arguments)
    })
  }
}


/**
 * Gets the listers from the prototype.
 * @param {object} prototype The prototype object
 * @return {ListenerInfo[]}
 */
export const getListeners = prototype => {
  let listeners
  do {
    listeners = prototype.constructor && prototype.constructor[KEY_EVENT_LISTENERS]
  } while (!listeners && (prototype = Object.getPrototypeOf(prototype)))

  return listeners || []
}
