//var btn = document.getElementById('button');
//var message = document.getElementById('testp');
var i = 0;
var numTabs = 8; //This number should be set to how many tabs the user has open


/*chrome.windows.getCurrent(function(window){
	var browserWidth = window.width;
	var browserHeight = window.height;
	// console.log(browserWidth);
	// console.log(browserHeight);
	// console.log($('#previewContainer'));
	if(browserWidth<800){
		$('#ourBody').css('width',browserWidth);
	}
	else{
		$('#ourBody').css('width','800px');
	}
	if(browserHeight<800){
		$('#ourBody').css('height',browserHeight);
	}
	else{
		$('#ourBody').css('height','600px');
	}
})*/


window.onload = function(){

	//$('#previewContainer').css('background-color', 'blue');
	//Create 
	while(i<numTabs){
		$('#previewContainer').append('<a href="#"><img/></a>')
		i++;
	}

}

//This function finds the smallest grid that the images could fit into one visible page
function scaleImages(numTabs){
	sqrtNumTabs = Math.sqrt(numTabs);
	//Grid size always rounds up of sqrtNumTabs
	ceilSqrt = Math.ceil(sqrtNumTabs);
	gridSize = ceilSqrt * ceilSqrt;
	percentage = parseFloat(100/gridSize)*ceilSqrt - 2;
	if(percentage > 80){
		percentage = 80;
	}	
	percentage = percentage.toString() + "%";;


	buttonMargins = 11 - ceilSqrt*2;
	$('.previewGroupDiv').css({
		width:percentage,
		height:percentage,
		margin:buttonMargins + 'px'
	});
}
/*
	if($('#testp').is(':visible')){
		$('#testp').hide();
	}
	else{
		$('#testp').show();
	}*/