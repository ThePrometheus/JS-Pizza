
var PizzaCart = require('./PizzaCart');
var api = require('../API');
      
        var crypto = require('crypto');
function initialization() {
   
 var  LIQPAY_PRIVATE_KEY='zpmWpK5LVi4dhCdRJvzUbH6JmPcfJ8BuZftXU5zv';
var LIQPAY_PUBLIC_KEY= 'i68993676007';
function initialize(){
  $('#to-buy-list').on('click', '.add-button', function() {
   // alert( "It works");
});
    console.log("inside init");
    var mapProp = {
        center:new google.maps.LatLng(50.464379,30.519131),
        zoom:11};
    console.log("created map prop");
    var html_element= document.getElementById("map");
    var map = new google.maps.Map(html_element,mapProp);
    
       var  point = new google.maps.LatLng(50.464379,30.519131);
       var  marker= new google.maps.Marker({
            position:point,
            map:map,
            icon:"assets/images/map-icon.png"
        });
    var consumerMarker = new google.maps.Marker({
        position:point,
        
        icon:"assets/images/home-icon.png"
    });
    console.log("Map:"+map);
    console.log("Point:"+point);
      var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true } );
    map.addListener("click",function(me){
            console.log("Map listener:"+map);
    console.log("Point listener:"+point);
          
            var coordinates = me.latLng;
        console.log("coords"+coordinates);
             geocodeLatLng(coordinates,function(error,address){
                 if(error){
                     
                    $("#address-error").html("Адреса неправильна");
                     
                 } else {                   
                     consumerMarker.position=me.latLng;
                     consumerMarker.setMap(map);
                     
                     console.log("Position:"+consumerMarker.position);
                    $(".info-about-order-address-res").html(address); 
                     $("#address").val(address);
                     $("#address-input").addClass("has-success");
                     $("#address-input").removeClass("has-error");
                     
                     calculateRoute(point,consumerMarker.position,function(error,route){
                         if(error){
                             console.log('Route error');
                             
}else{
    console.log("Route value:"+route.duration.value);
    var min = Math.floor(route.duration.value/60);
    var sec =route.duration.value%60;
    $(".info-about-order-time-res").html(min+" хв " +sec +"сек");
}
                         
                     });
                     
                 }
             });
        
    });

       // marker.setMap(null);

      
        function geocodeLatLng(latLng,callback){
            console.log("Goecode latLng");
            var geocoder =new google.maps.Geocoder();
            geocoder.geocode({'location':latLng},function(results,status){
                if(status === google.maps.GeocoderStatus.OK && results[1]){
                    var address= results[1].formatted_address;
                    callback(null,address);
                    
                }else{
callback(new Error("Can't find addres"));}
            } );
        }
              
            function geocodeAddress(address,callback){
                console.log("geocodeAddress");
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address':address},function(results,status){
                    if(status===google.maps.GeocoderStatus.OK&&results[0]){
                        var coordinates = results[0].geometry.location;
                        callback(null,coordinates);
}else{
    callback(new Error("Can't find address"));
}
                });
} 
            function calculateRoute(A_latLng,B_latLng,callback){
                console.log("calculaterRoute");
    var directionService = new google.maps.DirectionsService();
               
    directionService.route({
        origin:A_latLng,
        destination:B_latLng,
        travelMode:google.maps.TravelMode["DRIVING"]},function(response,status){
        if(status===google.maps.DirectionsStatus.OK){
            var leg = response.routes[0].legs[0];
            console.log("Direction Service:"+leg.duration);
            callback(null,{
                duration:leg.duration
               
                
            });
            directionsDisplay.setDirections(response);
        }else{
            console.log("status fails");
            callback(new Error("Can't find direction"));
        }
    
    });
}
           console.log("Script map"+map); 
     
         google.maps.event.addListener(map,'click',function(me){
              console.log("Map listener:"+map);
    console.log("Point listener:"+point);
             //alert("Clicked");
            var coordinates = me.latLng;
             geocodeLatLng(coordinates,function(error,address){
                 if(error){
                   
                    $("#address-error").html("Адреса неправильна");
                     
                 } else {                   
                     var consumerMarker= new google.maps.Marker({position:me.latLng,map:map,icon:"assets/images/home-icon.png"});
                     
                    $("#info-about-address-res").html(address); 
                     calculateRoute(point,consumerMarker.position,function(error,route){
                         if(error){
}else{
    $(".info-about-order-item-res").html(route.duration.value);
}
                         
                     });
                     
                 }
             });
         });
                 

            
    


                $( document ).ready(function() {
                   
  $(".add-button").remove();
                $(".delete-button").remove();
                $(".subtract-button").remove();
 
});
//$("#name").val( "new value here" );
               
         function validateName(){
            var pattern=/^[A-Za-zА-Яа-я\s]{1,}[\.]{0,1}[A-Za-zА-Яа-я\s]{0,}$/;
             
            var input = $("#name").val();
             console.log(pattern +input);
            if(pattern.test(input)){
                $("#name-input").removeClass("has-error");
            $("#name-input").addClass("has-success");
                $("#name-error").html("");
              console.log(pattern.test(input));  
}else{
     console.log(pattern.test(input));  
   
    $("#name-input").addClass("has-error");
    $("#name-input").removeClass("has-success");
   $('#name-error').html("Введіть ім'я  тільки з літер ");
    //$('#name-error').addClass("has-success");
}
            
        }
        $("#name").on('input',validateName);
                
                
        function validatePhone(){
            var pattern=/^\+[0-9]{12}|0[0-9]{9}$/;
            var input = $("#telephone").val();
            if(pattern.test(input)){
                $("#tel-input").removeClass("has-error");
           $("#tel-input").addClass("has-success");
                 $('#tel-error').html("");

              console.log(pattern.test(input));  
}else{
     console.log(pattern.test(input));  
    $("#tel-input").addClass("has-error");
    $("#tel-input").removeClass("has-success");
     $('#tel-error').html("Введіть номер починаючи з +380 чи 0 ");
}
            
        }
        $("#telephone").on('input',validatePhone);
                function validateAddress(){
                    var input= $("#address").val();
                    geocodeAddress(input,function(err,data){
                        if(err){
console.log("can't get coordinates form that address");}else{
    console.log("Coords accepted");
    var coords = data;
     geocodeLatLng(coords,function(error,address){
                 if(error){
                      $("#address-input").removeClass("has-success");
                     $("address-input").addClass("has-error");
                     $("#address-error").css("color","#a94442");
                    $("#address-error").html("формат адреси (бульвар Перова,3,Київ)");
                     
                 } else {   
                     $("#address-error").html(address);
                     $("#address-input").addClass("has-success");
                     $("address-input").removeClass("has-error");
                     $("#address-error").css("color","#3c763d");
                     consumerMarker.position=coords;
                     consumerMarker.setMap(map);
                     
                     console.log("Position:"+consumerMarker.position);
                    $(".info-about-order-address-res").text(address); 
                     calculateRoute(point,consumerMarker.position,function(error,route){
                         if(error){
                             console.log('Route error');
                             
}else{
    console.log("Route value:"+route.duration.value);
    var min = Math.floor(route.duration.value/60);
    var sec =route.duration.value%60;
    $(".info-about-order-time-res").html(min+" хв " +sec +"сек");
}
                         
                     });
                     
                 }
             });
    
}
                    })
                    
};
                $("#address").on('input',validateAddress);
                
                $(".next-button").click(function(){
                    
                    if($(".info-about-order-address-res").text()&& $("#telephone").val()&&$("#name").val()){
                        var address= $(".info-about-order-address-res").text();
                        var telephone = $("#telephone").val();
                        var name= $("#name").val();
                        api.createOrder(PizzaCart.getPizzaInCart(),function(err,data){
                            if(!err){
                               saveOrder(PizzaCart.getPizzaInCart(),address,telephone,name);
                                
                            }else{
                           
                                console.log("Can't create order");
                            }
});
                        
                    }else{
                       
                    }
                    
                    
                    
});
    
   
            function saveOrder(list,address,telephone,name){
                
                var dat="Name:"+name+"Telephone:"+telephone+"Address:"+address+":";
               
                var total_price= parseInt($(".total-price").text());
                 
                list.forEach(function(cart_item,index,list){
                    data +="pizza"+cart_item.title+"size"+cart_item.size +"quantity:"+cart_item.quantity;
                    
                }); 
                
                var num=1;
                var order = {
version: 3,
public_key: LIQPAY_PUBLIC_KEY,
action: "pay",
amount: num,
currency: "UAH",
description: dat,
order_id: Math.random(),
//!!!Важливо щоб було 1, бо інакше візьме гроші!!!
sandbox: 1
};
                 
                $(".add-button").prop("disabled",true);
                $(".subtract-button").prop("disabled",true);
                $(".delete-button").prop("disabled",true);
                
                function sha1(string) {
var sha1 = crypto.createHash('sha1');
sha1.update(string);
return sha1.digest('base64');
}
    function base64(str) {
return new Buffer(str).toString('base64');
}
                
var data = base64(JSON.stringify(order));
var signature = sha1(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);
                
            LiqPayCheckout.init({
data: data,
signature: signature,
embedTo: "#liqpay",
mode: "popup" // embed || popup
}).on("liqpay.callback", function(data){
console.log("Data"+data.status);
console.log(data);
}).on("liqpay.ready", function(data){
// ready
}).on("liqpay.close", function(data){
//    
                
});
           
      }
     
                
                
                
          }      
                
                google.maps.event.addDomListener(window,'load',initialize); 
                
} 


exports.initialization = initialization;
            