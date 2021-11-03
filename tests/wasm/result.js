const wasm = require('wasm-bindgen-test.js');
const assert = require('assert');

exports.error_new = function(message) {
    return new Error(message)
}

exports.call_ok = function() {
    assert.doesNotThrow(() => {
        let five = wasm.return_my_ok();
        assert.strictEqual(five, 5);
    })
}

exports.call_err = function() {
    assert.throws(() => wasm.return_my_err(), {
        message: "MyError::Variant"
    });
}

function check_inflight(struct) {
    assert.strictEqual(struct.is_inflight(), false);
}

exports.all_struct_methods = function() {
    let struct;
    assert.throws(() => wasm.Struct.new_err(), {
        message: "MyError::Variant"
    });
    assert.doesNotThrow(() => {
        struct = wasm.Struct.new();
    });
    check_inflight(struct);
    assert.doesNotThrow(() => {
        let five = struct.return_ok();
        assert.strictEqual(five, 5);
    });
    check_inflight(struct);
    assert.throws(() => struct.return_err(), {
        message: "MyError::Variant"
    });
    check_inflight(struct);
}

exports.call_return_string = function() {
    assert.doesNotThrow(() => {
        let ok = wasm.return_string();
        assert.strictEqual(ok, "string here");
    })
}

exports.call_jsvalue_ok = function() {
    assert.doesNotThrow(() => {
        let five = wasm.return_jsvalue_ok();
        assert.strictEqual(five, 5);
    })
}

exports.call_jsvalue_err = function() {
    try {
        wasm.return_jsvalue_err();
        assert.fail("should have thrown");
    } catch (e) {
        assert.strictEqual(e, -1);
    }
}

exports.call_enum_ok = function() {
    assert.doesNotThrow(() => {
        let ok = wasm.return_enum_ok();
        assert.strictEqual(ok, 2);
    })
}

exports.call_enum_err = function() {
    assert.throws(() => {
        wasm.return_enum_err();
    }, {
        message: "MyError::Variant"
    })
}

