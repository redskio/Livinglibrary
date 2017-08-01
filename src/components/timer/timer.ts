import { Component, Input } from '@angular/core';
import {PTimer} from "./ptimer";
/**
 * Generated class for the TimerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
 selector: 'timer',
 templateUrl: 'timer.html'
})
export class TimerComponent {
@Input() endTime: number;
private timeInSeconds: number;
 public timer: PTimer;
 constructor() {
 }

ngOnInit() {
 this.initTimer();
 this.startTimer() ;
 }

hasFinished() {
 return this.timer.hasFinished;
 }
 pauseTimer() {
 this.timer.runTimer = false;
 }
resumeTimer() {
 this.startTimer();
 }
 initTimer() {
 if (!this.timeInSeconds) { 
   this.timeInSeconds =  this.endTime- new Date().getTime(); 
}

this.timer = <PTimer>{
 time: this.timeInSeconds,
 runTimer: false,
 hasStarted: false,
 hasFinished: false,
 timeRemaining: this.timeInSeconds
 };
 this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
 }

getSecondsAsDigitalClock(inputSeconds: number) {
 inputSeconds=inputSeconds/1000;
 var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
 var days = Math.floor(sec_num / 86400);
 var hours = Math.floor((sec_num - (days* 86400)) / 3600);
 var minutes = Math.floor((sec_num - (days* 86400) - (hours * 3600)) / 60);
 var seconds = sec_num - (days* 86400) - (hours * 3600) - (minutes * 60);
 var dayString = '';
 var hoursString = '';
 var minutesString = '';
 var secondsString = '';
 dayString = (days< 10) ? "0"+ days : days.toString();
 hoursString = (hours < 10) ? "0" + hours : hours.toString();
 minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
 secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
 return ' ' + dayString + '일 ' + hoursString + '시간 ' + minutesString + '분';
 }
startTimer() {
 this.timer.hasStarted = true;
 this.timer.runTimer = true;
 this.timerTick();
 }
timerTick() {
 setTimeout(() => {

if (!this.timer.runTimer) { return; }
 this.timer.timeRemaining--;
 this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
 if (this.timer.timeRemaining > 0) {
 this.timerTick();
 }
 else {
 this.timer.hasFinished = true;
 this.timer.displayTime = "판매 종료";
 }
 }, 1000);
 }

}