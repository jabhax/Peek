window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var file_system;

var GROUP_VIEW = "GROUP_VIEW";
var LIST_VIEW = "LIST_VIEW";
var CAROUSEL_VIEW = "CAROUSEL_VIEW";

function setLocalStorage_BodyBackgroundColor(color) {
    localStorage.BODY_BACKGROUND_COLOR = color;
}

function setLocalStorage_TabBackgroundColor(color) {
    localStorage.TAB_BACKGROUND_COLOR = color;
}

function setLocalStorage_PreferredView(view) {
    localStorage.PREFERRED_VIEW = view;
}

function setLocalStorage_SelectedBgColorId(id) {
    localStorage.SELECTED_BG_COLOR_ID = id;
}

function setLocalStorage_SelectedTabColorId(id) {
    localStorage.SELECTED_TAB_COLOR_ID = id;
}

function convertBase64ToBinary(imgUrl) {
    var BASE64_MARKER = ';base64,';
    var base64Index = imgUrl.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = imgUrl.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (i = 0; i < rawLength; ++i) {
        array[i] = raw.charCodeAt(i);
    }
    numTabs = $('.previewGroupDiv').length;
    scaleImages(numTabs);
    return array;
}

function addClickEventListenerTab(tabElement, tab) {
    tabElement.addEventListener('click', function() {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function() {
            window.self.close();
        });
        chrome.tabs.update(tab.id, {
            active: true
        });
    });
}

function createGroupViewElement(tab) {
    var groupImg_class = ' class="previewGroupImg" ';
    var groupImg_src = ' src=' + '"' + tab.favIconUrl + '" ';
    var groupImg_height = ' height="25%" ';
    var groupImg_width = ' width="25%" ';
    var groupImg = '<div class="card-action"><img' + groupImg_src + groupImg_class + groupImg_height + groupImg_width + '/></div>';

    var groupP_class = ' class="previewGroupP card-content" ';
    var groupP_value = ' value="' + tab.title + '" ';
    var groupP_style = ' style="color: ' + localStorage.TAB_TEXT_COLOR + '" ';
    var groupP_innerHtml = tab.title;
    var groupP = '<p' + groupP_class + groupP_value + groupP_style + '>' + groupP_innerHtml + '</p>';

    var groupDiv_class = ' class="previewGroupDiv card z-depth-5 hoverable';
    var groupDiv_id = ' id="tabid' + tab.id + '" ';
    var groupDiv_style = 'style="background: ' + localStorage.TAB_BACKGROUND_COLOR + '" ';
    var groupDiv_innerHtml = groupImg + '<br/>' + groupP;
    var groupDiv = $('<button' + groupDiv_id + groupDiv_style + groupDiv_class + '>' + groupDiv_innerHtml + '</button>');

    groupDiv.appendTo('#previewGroup');
    addClickEventListenerTab($(groupDiv)[0], tab);
}

function createListViewElement(tab) {
    var listImg_src = ' src="' + tab.favIconUrl + '" ';
    var listImg_height = ' height="5%" ';
    var listImg_width = ' width="5%" ';
    var listImg = '<img' + listImg_height + listImg_width + listImg_src + '/>';

    var listButton_class = ' class="chip" ';
    var listButton_id = ' id="previewListButton" ';
    var listButton_style = ' style="' + 'background:' + localStorage.TAB_BACKGROUND_COLOR + '; color: ' + localStorage.TAB_TEXT_COLOR + '; " ';
    var listButton_innerHtml = listImg + tab.title;
    var listButton = '<button' + listButton_class + listButton_id + listButton_style + '>' + listButton_innerHtml + '</button>';

    var listLi_id = ' id="previewListLi" ';
    var listLi_innerHtml = listButton;
    var listLi = $('<li' + listLi_id + '>' + listLi_innerHtml + '</li>');

    listLi.appendTo('#previewList');
    addClickEventListenerTab($(listLi)[0], tab);
}

function createCarouselViewElement(tab) {
    var carouselImg_class = ' class="previewCarouselImg" ';
    var carouselImg_src = ' src=' + '"' + tab.favIconUrl + '" ';
    var carouselImg_height = ' height="25%" ';
    var carouselImg_width = ' width="25%" ';
    var carouselImg = '<div class="card-action"><img' + carouselImg_src + carouselImg_class + carouselImg_height + carouselImg_width + '/></div>';

    var carouselP_class = ' class="previewCarouselP card-content" ';
    var carouselP_value = ' value="' + tab.title + '" ';
    var carouselP_style = ' style="color: ' + localStorage.TAB_TEXT_COLOR + ';" ';
    var carouselP_innerHtml = tab.title;
    var carouselP = '<p' + carouselP_class + carouselP_value + carouselP_style + '>' + carouselP_innerHtml + '</p>';

    var carouselDiv_class = ' class="previewCarouselDiv carousel-item card z-depth-5 hoverable"';
    var carouselDiv_id = ' id="tabid' + tab.id + '" ';
    var carouselDiv_style = 'style="background: ' + localStorage.TAB_BACKGROUND_COLOR + '" ';
    var carouselDiv_innerHtml = carouselImg + '<br/>' + carouselP;
    var carouselDiv = $('<button' + carouselDiv_id + carouselDiv_style + carouselDiv_class + '>' + carouselDiv_innerHtml + '</button>');

    carouselDiv.appendTo('#previewCarousel');
    addClickEventListenerTab($(carouselDiv)[0], tab);
}

function createViewsForCurrentTab(tab) {
    createGroupViewElement(tab);
    createListViewElement(tab);
    createCarouselViewElement(tab);
}

function onInitFs(fs) {
    file_system = fs;
    chrome.tabs.captureVisibleTab({
        "format": "png"
    }, function(imgUrl) {
        file_system.root.getFile("capture.png", {
            create: true
        }, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.onwriteend = function(e) {
                    console.log("Write successfully")
                };
                fileWriter.onerror = function(e) {
                    console.log("Write error!")
                };
                content = convertBase64ToBinary(imgUrl);
                bob = new Blob([content]);
                fileWriter.write(bob);
            });
        });
    });
};

function updateTabView() {
    var body = document.querySelector("#ourBody");
    var groupContainer = document.querySelector("#previewGroup");
    var carouselContainer = document.querySelector("#previewCarousel");
    var listContainer = document.querySelector("#previewList");
    $('.button-collapse').sideNav('hide');
    switch (localStorage.PREFERRED_VIEW) {
        case GROUP_VIEW:
            body.style.width = '800px';
            groupContainer.style.display = 'inline-block';
            carouselContainer.style.display = 'none';
            listContainer.style.display = 'none';
            Materialize.fadeInImage('#previewGroup');
            break;
        case LIST_VIEW:
            body.style.width = '400px';
            groupContainer.style.display = 'none';
            carouselContainer.style.display = 'none';
            listContainer.style.display = 'inline-block';
            Materialize.showStaggeredList('#previewList');
            break;
        case CAROUSEL_VIEW:
            body.style.width = '800px';
            groupContainer.style.display = 'none';
            carouselContainer.style.display = 'inline-block';
            listContainer.style.display = 'none';
            Materialize.fadeInImage('#previewCarousel');
            $(document).ready(function() {
                $('.carousel').carousel();
            });
            break;
        default:
            break;
    }
}

function onClickListViewButton() {
    var listButton = document.querySelector('#listPreviewsButton');
    listButton.addEventListener('click', function() {
        setLocalStorage_PreferredView(LIST_VIEW);
        updateTabView();
    });
}

function onClickGroupViewButton() {
    var groupButton = document.querySelector('#groupPreviewsButton');
    groupButton.addEventListener('click', function() {
        setLocalStorage_PreferredView(GROUP_VIEW);
        updateTabView();
    });
}

function onClickCarouselViewButton() {
    var carouselButton = document.querySelector('#carouselPreviewsButton');
    carouselButton.addEventListener('click', function() {
        setLocalStorage_PreferredView(CAROUSEL_VIEW);
        updateTabView();
    });
}

function updateTabPreviewsOnSearch() {
    var search = document.querySelector('#search');

    function updateFunc() {
        var previewList = document.querySelector("#previewList");
        var previewGroup = document.querySelector("#previewGroup");
        var previewCarousel = document.querySelector("#previewCarousel");
        var keyword = search.value;

        if ($(previewGroup)[0].style.display == 'inline-block') {
            console.log("reached group search");
            var pArray = document.querySelectorAll(".previewGroupP");
            var divArray = document.querySelectorAll(".previewGroupDiv");
            for (var i = 0; i < pArray.length; i++) {
                var currP = $(pArray[i])[0];
                var currPOuterText = $(pArray[i])[0].outerText;
                var currDiv = $(divArray[i])[0];
                if (currPOuterText.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    currDiv.style.display = "inline-block";
                } else {
                    currDiv.style.display = "none";
                }
            }
        } else if ($(previewList)[0].style.display == "inline-block") {
            console.log("reached list search");
            var btnArray = document.querySelectorAll("#previewListButton");
            var liArray = document.querySelectorAll("#previewListLi");
            for (var i = 0; i < btnArray.length; i++) {
                var currBtn = $(btnArray[i])[0];
                var currLi = $(liArray[i])[0];
                var currBtnOuterText = $(btnArray[i])[0].outerText;
                if (currBtnOuterText.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    currLi.style.display = "inline-block";
                } else {
                    currLi.style.display = "none";
                }
            }
        } else if ($(previewCarousel)[0].style.display == "inline-block") {
            console.log("reached carousel search");
            var pArray = document.querySelectorAll(".previewCarouselP");
            var divArray = document.querySelectorAll(".previewCarouselDiv");
            for (var i = 0; i < pArray.length; i++) {
                var currP = $(pArray[i])[0];
                var currPOuterText = $(pArray[i])[0].outerText;
                var currDiv = $(divArray[i])[0];
                if (currPOuterText.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    console.log("matched");
                    currDiv.style.display = "inline-block";
                } else {
                    console.log("unmatched");
                    currDiv.style.display = "none";
                }
            }
        }
    }

    search.addEventListener('keyup', function() {
        updateFunc();
    });
}

function updateBodyBackgroundColor() {
    var body = document.querySelector("#ourBody");
    body.style.background = localStorage.BODY_BACKGROUND_COLOR;
}

function onClickBodyBackgroundColorChange() {
    var bgccArray = document.querySelectorAll('*[id*="bgcc"]');
    if (localStorage.SELECTED_BG_COLOR_ID) {
        $("#" + localStorage.SELECTED_BG_COLOR_ID).css("borderWidth", "4").css("border-color", "navy");
    }
    for (var i = 0; i < bgccArray.length; i++) {
        bgccArray[i].addEventListener('click', function() {
            setLocalStorage_BodyBackgroundColor(this.style.background);
            updateBodyBackgroundColor();
            $("form.form1").children().css("borderWidth", "1").css("border-color", "black");
            $(this).css({
                border: '0 solid navy'
            }).animate({
                borderWidth: '4'
            }, 150);
            var selectedId = this.id;
            localStorage.SELECTED_BG_COLOR_ID = selectedId;
        });
    }
}

function updateTabBackgroundColor() {
    var previewGroupDivBody = document.querySelectorAll(".previewGroupDiv");
    var previewListButtonBody = document.querySelectorAll("#previewListButton");
    var previewCarouselDivBody = document.querySelectorAll(".previewCarouselDiv");

    var previewGroupPArray = document.querySelectorAll(".previewGroupP");
    var previewCarouselPArray = document.querySelectorAll(".previewCarouselP");

    for (var i = 0; i < previewGroupDivBody.length; i++) {
        var currGroup = $(previewGroupDivBody[i])[0];
        var currList = $(previewListButtonBody[i])[0];
        var currCarousel = $(previewCarouselDivBody[i])[0];

        var currGroupP = $(previewGroupPArray[i])[0];
        var currCarouselP = $(previewCarouselPArray[i])[0];

        currGroup.style.background = localStorage.TAB_BACKGROUND_COLOR;
        currList.style.background = localStorage.TAB_BACKGROUND_COLOR;
        currCarousel.style.background = localStorage.TAB_BACKGROUND_COLOR;

        currGroupP.style.color = localStorage.TAB_TEXT_COLOR;
        currList.style.color = localStorage.TAB_TEXT_COLOR;
        currCarouselP.style.color = localStorage.TAB_TEXT_COLOR;
    }

    var navBar = document.querySelector('.my_navebar_wrapper');
    navBar.style.background = localStorage.TAB_BACKGROUND_COLOR;
}

function onClickTabBackgroundColorChange() {
    var tccArray = document.querySelectorAll('*[id*="tcc"]');
    if (localStorage.SELECTED_TAB_COLOR_ID) {
        $("#" + localStorage.SELECTED_TAB_COLOR_ID).css("borderWidth", "4").css("border-color", "navy");
    }
    for (var i = 0; i < tccArray.length; i++) {
        tccArray[i].addEventListener('click', function() {
            if (this.id == "tcc_black") {
                localStorage.TAB_TEXT_COLOR = "white";
            } else {
                localStorage.TAB_TEXT_COLOR = "black";
            }
            setLocalStorage_TabBackgroundColor(this.style.background);
            updateTabBackgroundColor();
            $("form.form2").children().css("borderWidth", "1").css("border-color", "black");
            $(this).css({
                border: '0 solid navy'
            }).animate({
                //width: '400px',
                borderWidth: '4'
            }, 150);
            var selectedId = this.id;
            localStorage.SELECTED_TAB_COLOR_ID = selectedId;

            //console.log(this);
            //localStorage.setItem('prevSelectedTag',this);
            //console.log(localStorage.getItem('prevSelectedTag'));
        });
    }
}

function init() {
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, onInitFs);

    window.onload = function() {
      if (localStorage.TAB_TEXT_COLOR != "white" || localStorage.TAB_TEXT_COLOR != "black") {
        localStorage.TAB_TEXT_COLOR = "black";
      }
        chrome.tabs.query({
            currentWindow: true
        }, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                createViewsForCurrentTab(tabs[i]);
            }
        });

        updateTabView();
        updateBodyBackgroundColor();
        updateTabBackgroundColor();

        onClickListViewButton();
        onClickGroupViewButton();
        onClickCarouselViewButton();

        updateTabPreviewsOnSearch();

        onClickBodyBackgroundColorChange();
        onClickTabBackgroundColorChange();

        console.log("Running sideNav");
        $(".button-collapse").sideNav();

        console.log("Running collapsible");
        $(document).ready(function() {
            $('.collapsible').collapsible();
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
/*
$('div img').mouseenter(function () {
    $(this).css({border: '0 solid #f37736'}).animate({
        borderWidth: 4
    }, 500);
}).mouseleave(function () {
     $(this).animate({
        borderWidth: 0
    }, 500);
});
*/
