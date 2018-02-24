/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 ${ORGANIZATION}.
 * @license    __LICENSE__
 */

export default class Greeter {
  element: HTMLElement;
  span: HTMLElement;
  timerToken: number;

  constructor (element: HTMLElement) {
    this.element = element;
    this.element.innerHTML += "The time is: ";
    this.span = document.createElement('span');
    this.element.appendChild(this.span);
    this.span.innerHTML = new Date().toUTCString();
  }

  start() {
    this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
  }

  stop() {
    clearInterval(this.timerToken);
  }
}
