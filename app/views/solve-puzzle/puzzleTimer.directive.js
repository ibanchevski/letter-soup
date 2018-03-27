function puzzleTimer($compile, $interval) {
	return {
		restrict: 'E',
		scope: {
			timerTime: '=',
			onTimerFinish: '&'
		},
		replace: true,
		template:
			`<div id="puzzleTimer">
				<span id="timerMins"></span>
				<span>:</span>
				<span id="timerSecs"></span>
			</div>`,
		link: function(scope, elem, attr) {
			var timerMinutesEl = angular.element(document.querySelector('#timerMins'))[0];
			var timerSecondsEl = angular.element(document.querySelector('#timerSecs'))[0];
			var minutes = scope.timerTime;
			var seconds = 0;
			var timer;

			function stopTimer() {
				if (angular.isDefined(timer)) {
					$interval.cancel(timer);
					timer = null;
				}
				scope.onTimerFinish();
			}
			
			function displayTimer() {
				if (minutes < 10) {
					timerMinutesEl.innerHTML = '0' + minutes;	
				} else {
					timerMinutesEl.innerHTML = minutes;
				}
				if (seconds < 10) {
					timerSecondsEl.innerHTML = '0' + seconds;	
				} else {
					timerSecondsEl.innerHTML = seconds;
				}
			}
			displayTimer();

			// Start the timer
			timer = $interval(function() {
				seconds--;
				if (seconds < 0) {
					minutes--;
					seconds = 59;
				}
				if (minutes <= 0 && seconds <=0) {
					minutes = 0;
					seconds = 0;
					stopTimer();
				}
				displayTimer();
			}, 1000);
		}
	}
}
puzzleTimer.$inject = ['$compile', '$interval'];
angular.module('letterSoup').directive('puzzleTimer', puzzleTimer);