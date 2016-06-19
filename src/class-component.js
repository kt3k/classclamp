/**
 * class-component.js v9.2.0
 * author: Yoshiya Hinosawa ( http://github.com/kt3k )
 * license: MIT
 */
const $ = jQuery

const reSpaces = / +/

const ClassComponentManager = require('./class-component-manager')
const decorators = require('./decorators')

/**
 * Initializes the module object.
 *
 * @return {Object}
 */
function initializeModule () {
  require('./fn.cc')

  const __manager__ = new ClassComponentManager()

  /**
   * The main namespace for class component module.
   * Registers a class component of the given name using the given defining function.
   * @param {String} name The class name
   * @param {Function} Constructor The class definition
   */
  const cc = (name, Constructor) => {
    if (typeof name !== 'string') {
      throw new Error('`name` of a class component has to be a string')
    }

    if (typeof Constructor !== 'function') {
      throw new Error('`Constructor` of a class component has to be a function')
    }

    __manager__.register(name, Constructor)

    $(document).ready(() => { __manager__.init(name) })
  }

  /**
   * Initialized the all class components of the given names and returns of the promise of all initialization.
   *
   * @param {String[]|String} arguments
   * @return {Object<HTMLElement[]>}
   */
  cc.init = (classNames, elem) => {
    if (classNames == null) {
      __manager__.initAll(elem)

      return
    }

    if (typeof classNames === 'string') {
      classNames = classNames.split(reSpaces)
    }

    return classNames.map(className => __manager__.init(className, elem))
  }

  /**
   * The decorator for class assignment.
   *
   * @example
   *   @$.cc.component('foo')
   *   class Foo extends Bar {
   *     ...
   *   }
   *
   * The above is the same as `$.cc.assign('foo', Foo)`
   *
   * @param {String} className The class name
   * @return {Function}
   */
  cc.component = className => Cls => cc(className, Cls)

  // Exports __manager__
  cc.__manager__ = __manager__

  // Exports decorators
  cc.on = decorators.on
  cc.emit = decorators.emit
  cc.event = decorators.event
  cc.trigger = decorators.trigger

  return cc
}

// If the cc is not set, then create one.
if ($.cc == null) {
  $.cc = initializeModule()
}

module.exports = $.cc
