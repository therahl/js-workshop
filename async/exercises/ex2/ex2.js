function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
//
function getFile(file) {
	var v, f;
	fakeAjax(file, function(text) {
		if (f) {
			f(text);
		} else {
			v = text;
		}
	});
	return function(cb) {
		if (v) {
			cb(v);
		} else {
			f = cb;
		}
	};
}

var th1 = getFile('file1');
var th2 = getFile('file2');
var th3 = getFile('file3');

th1(function(val) {
	output(val)
	th2(function(text) {
		output(text)
		th3(function(text2) {
			output(text2)
			console.log('Complete!');
		});
	});
});
