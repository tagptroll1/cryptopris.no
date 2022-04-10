export class Throttle {
    callback: (any) => any;
    timeout: NodeJS.Timeout;
    delay: number;
    constructor(callback, delay) {
      this.callback = callback;
      this.timeout = null;
      this.delay = delay;
    }
    exec(data) {
      if (this.timeout) {
          return;
      }
      this.timeout = setTimeout(() => {
          this.callback(data); 
          this.timeout=undefined
        }, this.delay);
      return this;
    }
    cancel() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      return this;
    }
  }