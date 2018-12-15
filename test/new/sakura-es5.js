(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./test"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./test"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.test);
    global.sakura = mod.exports;
  }
})(this, function (_test) {
  "use strict";

  _test = _interopRequireDefault(_test);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver).value; }

  (function ($) {
    "use strict";

    var sakura = 'flower';

    function test() {//
    }

    sakura += 123;

    if (sakura) {
      console.log('Test');
    }

    console.log(sakura, $('rose'));

    var Hello =
    /*#__PURE__*/
    function () {
      function Hello() {
        _classCallCheck(this, Hello);

        _defineProperty(this, "foo", 'hello');

        _bar.set(this, {
          writable: true,
          value: 'bar'
        });
      }

      _createClass(Hello, [{
        key: "show",
        value: function show() {
          console.log(this.foo, _classPrivateFieldGet(this, _bar));
        }
      }]);

      return Hello;
    }();

    var _bar = new WeakMap();
  })(jQuery);
});
//# sourceMappingURL=sakura-es5.js.map
