//var btn = document.getElementById('button');
//var message = document.getElementById('testp');
var i = 0;
var numTabs = 8; //This number should be set to how many tabs the user has open


chrome.windows.getCurrent(function(window){
	var browserWidth = window.width;
	var browserHeight = window.height;
	console.log(browserWidth);
	console.log(browserHeight);
	console.log($('#previewContainer'));
	if(browserWidth<800){
		$('#body').css('width',browserWidth);
	}
	else{
		$('#body').css('width','800px');
	}
	if(browserHeight<800){
		$('#body').css('height',browserHeight);
	}
	else{
		$('#body').css('height','600px');
	}
})


window.onload = function(){

	//$('#previewContainer').css('background-color', 'blue');
	//Create 
	while(i<numTabs){
		$('#previewContainer').append('<a href="#"><img/></a>')
		i++;
	}

}

/*
	if($('#testp').is(':visible')){
		$('#testp').hide();
	}
	else{
		$('#testp').show();
	}*/