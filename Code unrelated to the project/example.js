class Timer {
  constructor() {
    this.seconds = 0;
  }

  start() {
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
}

const timer = new Timer();
timer.start();
