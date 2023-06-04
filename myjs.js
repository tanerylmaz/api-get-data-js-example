var startValue = 0;
var limitValue = 0;
var isSearch = false;
$(function () {
    $("#search").click(function () {
        isSearch = true;
        getNews();
    });
    $("#loadNews").click(function () {
        getNews();
    });



});

function getNews() {
    limitValue = parseInt($("#pageCount").val());
var filter="{";
filter+='"_start":'+startValue;
filter+=",";
filter+='"_limit":'+limitValue;

var st=$('#searchField').val();

    if (isSearch == true && st!=undefined) {
    filter+=",";
    filter+='"title_contains":"'+st+'"';
    filter+="}";
    }
    $.get("https://api.spaceflightnewsapi.net/v3/articles",
        JSON.parse(filter),
        function (data) {
            for (var i = 0; i < data.length; i++) {
                var metin = haberHazirla(data[i]);
                $("#news").append(metin);
            }
            startValue += limitValue;


            // var i=0;
            // setInterval(function(){
            //     var metin = haberHazirla(data[i]);
            //     $("#news").append(metin);
            //    i++;
            //  },1000);
        });
}

function haberHazirla(veri) {
    var obj = $("#hiddenObject").html();
    obj = obj.replace("|title|", veri.title);
    obj = obj.replace("|url|", veri.imageUrl);
    obj = obj.replace("|desc|", veri.summary);
    obj = obj.replace("|url|", veri.url);
    return obj;
}






