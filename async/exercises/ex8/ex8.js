$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list"),
		clicks = ASQ.react.of(),
		msgs = ASQ.react.of();

		$btn.click(function(evt){
			throttle(clicks)
		});

		clicks.val(function(evt) {
			latest = evt;
		});

		msgs.val(function(msg){
			$list.append('<div>' + msg + '<div>');
		});
});
function throttle(inStream) {
	setInterval(function() {
		allow = true;
	}, 1000);

	inStream.val(function(evt){
		if (allow) {
			outStream.push('clicked');
			allow = false;
		}
	});

	var allow = true;
	var outStream = ASQ.react.of();
	return outStream;
}
// $(document).ready(function(){
// 	var $btn = $("#btn"),
// 		$list = $("#list"),
// 		clicks = ASQ.react.of(),
// 		msgs = ASQ.react.of(),
// 		latest;
//
// 		$btn.click(function(evt){
// 			clicks.push(evt);
// 		});
//
// 		setInterval(function() {
// 			if (latest) {
// 				msgs.push('clicked!');
// 				latest = null
// 			}
// 		}, 1000);
//
// 		clicks.val(function(evt) {
// 			latest = evt;
// 		});
//
// 		msgs.val(function(msg){
// 			$list.append('<div>' + msg + '<div>');
// 		});
// });
