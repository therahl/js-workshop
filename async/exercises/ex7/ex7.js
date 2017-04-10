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

function getFile(file) {
	return ASQ(function(done){
		fakeAjax(file,done);
	});
}

ASQ().runner(function*(file) {
  var pr1 = getFile('file 1');
  var pr2 = getFile('file 2');
  var pr3 = getFile('file 3');

	output(yield pr1);
	output(yield pr2);
	output(yield pr3);

	output('Complete!');

})
