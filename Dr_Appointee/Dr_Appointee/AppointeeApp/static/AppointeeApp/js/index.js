function body(){
  markershow('All');
}
var map;
function map(){
     map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 23.17658175, lng: 79.92581606},
          zoom: 13,
          mapTypeId: 'roadmap'
        });
}

function markershow(value){
  map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: 23.17658175, lng: 79.92581606},
       zoom: 13,
       mapTypeId: 'roadmap'
     });
  $.ajax({
        url: '/ajax/validate_username/',
        data: {
          'username': value
        },
        dataType: 'json',
        success: function (data) {
          var latitude=data.late;
          var longetude=data.long;
          latitude=String(latitude);
          longetude=String(longetude);
          var tmplong=new Array();
          var tmplat=new Array();
          tmplong=longetude.split(",");
          tmplat=latitude.split(",");
          var i=0;


          tmplong.forEach(function(element) {
              var lat=Number.parseFloat(tmplat[i]);
              var lng=Number.parseFloat(tmplong[i]);
              var look={lat, lng};
              var icon = {
                url: "https://image.flaticon.com/icons/svg/252/252025.svg", // url
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
               };
              var marker = new google.maps.Marker({
               position: look,
               map: map,
               icon: icon
              });
              marker.addListener('click', function() {
               detailshow(marker.getPosition())
             });
            i++;
          });
        }
      });
}

function appoint(value){
  alert(value);
  if(value!=""){

    $.ajax({
          url: '/ajax/appoint_show/',
          data: {
            'username': value
          },
          dataType: 'json',
          success: function (data) {
            alert('Appointment Successfull,please check your Email');
          }
        });
  }else{
    alert("please Login or Register your Account?");
  }
}

function detailshow(latlng){
 var tmp=new Array();
 latlng=String(latlng);
 latlng = latlng.replace(/[{()}]/g, '');
 tmp=latlng.split(",");

$.ajax({
     url: '/ajax/marker_detail/',
     data: {
       'username': tmp[0]
     },
     dataType: 'json',
     success: function (data) {
       $('#myModal3').modal('show');
       document.getElementById('clinic').textContent=data.clinic;
       document.getElementById('exp').textContent=data.exp+" years";
       document.getElementById('cate').textContent=data.cate;
       document.getElementById('fees').textContent=data.fees+" Rs";
       document.getElementById('name').textContent=data.name;
     }
   });
}

function show(value){
  var log=document.getElementById('log');
  var reg=document.getElementById('reg');

  if(value==1){
    log.style.display='none';
    reg.style.display='block';
  }else if(value==2){
    log.style.display='block';
    reg.style.display='none';
  }else if(value==3){
    $('#regform').submit();
  }
}

/* coursel */
$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }

    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});
