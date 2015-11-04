export default class Cache {
  constructor(prefix) {
    this.prefix = prefix;
  }
  read() {
    var item = localStorage.getItem(this.prefix);
    return item === null ? {} : JSON.parse(item);
  }
  write(data) {
    localStorage.setItem(this.prefix, JSON.stringify(data));
  }
  has(key) {
    var data = this.read();
    return key in data;
  }
  set(key, value) {
    var data = this.read()
    data[key] = value;
    this.write(data);
  }
  get(key, _default) {
    var data = this.read();
    if (key in data) {
      return data[key];
    } else {
      return _default;
    }
  }
}
