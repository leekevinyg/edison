/**
 * This file handles registering and executing content scripts associated with intents
 */
this.communicate = (function () {
  const exports = {};
  const HANDLERS = {};

  exports.register = function (action, handler) {
    if (HANDLERS[action]) {
      throw new Error(`There is already a handler registerd for ${action}`);
    }
    HANDLERS[action] = handler;
  };

  /**
   * @param {string} action.name the name of the command to execute
   * @param {string} action.param the parameter (usually a query) that should be passed to the
   * command handler.
   */
  exports.handle = function (action) {
    const { name, param } = action;
    HANDLERS[name](param);
  };
  return exports;
}());
