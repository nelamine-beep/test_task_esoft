function deepClone(obj, _visited = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (_visited.has(obj)) {
        return _visited.get(obj);
    }
    let clone;
    if (Array.isArray(obj)) {
        clone = [];
        _visited.set(obj, clone);
        for (let i = 0; i < obj.length; i++) {
            clone[i] = deepClone(obj[i], _visited);
        }
    } else if (obj instanceof Map) {
        clone = new Map();
        _visited.set(obj, clone);
        obj.forEach((value, key) => {
            clone.set(deepClone(key, _visited), deepClone(value, _visited));
        });
    } else if (obj instanceof Set) {
        clone = new Set();
        _visited.set(obj, clone);
        obj.forEach((value) => {
            clone.add(deepClone(value, _visited));
        });
    } else if (obj instanceof Date) {
        clone = new Date(obj.getTime());
        _visited.set(obj, clone);
    } else if (obj instanceof RegExp) {
        clone = new RegExp(obj.source, obj.flags);
        _visited.set(obj, clone);
    } else {
        clone = Object.create(Object.getPrototypeOf(obj));
        _visited.set(obj, clone);
        for (const key of Object.keys(obj)) {
            clone[key] = deepClone(obj[key], _visited);
        }
    }
    return clone;
}
