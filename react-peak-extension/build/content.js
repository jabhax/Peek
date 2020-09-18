/* global chrome */

var i = 0;
var numTabs = 8; //This number should be set to how many tabs the user has open

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  main();
});

function main() {
  // eslint-disable-next-line no-undef
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
  // eslint-disable-next-line no-restricted-globals
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    // Fetch the local React index.html page
    // eslint-disable-next-line no-undef
    fetch(chrome.runtime.getURL('index.html') /*, options */)
      .then((response) => response.text())
      .then((html) => {
        const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
        // eslint-disable-next-line no-undef
        $(styleStashHTML).appendTo('body');
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  getCurrentTabs();
  onLoadTabs();
}

window.addEventListener("message", function(event) {
  if (event.source !== window) return;
  onDidReceiveMessage(event);
});

async function onDidReceiveMessage(event) {
  if (event.data.type && (event.data.type === "GET_EXTENSION_ID")) {
    window.postMessage({ type: "EXTENSION_ID_RESULT", extensionId: chrome.runtime.id }, "*");
  }
}

function getCurrentTabs() {
  return chrome.windows.getCurrent(
    function(window) {
      console.log(
        'window.width: ', window.width, ', window.height: ', window.height,
        ', #previewContainter: ', $('#previewContainer')
      );
      if (window.width < 800) { $('.modal-content').css('width', '800px'); }
      else { $('.modal-content').css('width', window.width); }
      if (window.height < 800) { $('.modal-content').css('height', '600px'); }
      else { $('.modal-content').css('height', window.height); }
    }
  );
}

function onLoadTabs() {
  window.onload = function() {
    while(i < numTabs) {
      $('#previewContainer').append('<a href=""><img src="" alt=""/></a>');
      i++;
    }
  }
}

//This function finds the smallest grid that the images could fit into one visible page
function scaleImages(numTabs) {
  const sqrtNumTabs = Math.sqrt(numTabs);
	//Grid size always rounds up of sqrtNumTabs
	const ceilSqrt = Math.ceil(sqrtNumTabs);
	const gridSize = ceilSqrt * ceilSqrt;
	const percentage = parseFloat(100 / gridSize) * ceilSqrt - 2;
	if (percentage > 80) percentage = 80;
	percentage = percentage.toString() + "%";
	const buttonMargins = 11 - ceilSqrt * 2;
	$('.previewGroupDiv').css({ width:percentage, height:percentage, margin:buttonMargins + 'px' });
}
