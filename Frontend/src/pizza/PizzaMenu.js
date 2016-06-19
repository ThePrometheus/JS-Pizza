/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart')
var Pizza_List = require('../Pizza_List');
var api = require('../API');


api.getPizzaList(function (err,data) {
    if (!err){
        Pizza_List = data;
        console.log("from server1:"+data);
        initialiseMenu();
       PizzaCart.initialiseCart();
    }else{
        console.log("No reply form server");
           console.log("from server2:"+data);
    }
       console.log("from server3:"+data);
});


//HTML едемент куди будуть додаватися піци
var $pizza_list = $(".main-field .row");
  $(".all-pizzas").click(function(event){
      var id = $(this).attr('id');
        console.log("ID:"+id);
      if(id==="pizza-with-meat"){
         
                        filterPizza("М'ясні");
  
      }if(id==="pizza-with-pinapple"){
          filterPizza("З ананасами");
      } if(id==="pizza-with-mushroom"){
          filterPizza("З грибами");
      }
      if(id==="pizza-with-fish"){
          filterPizza("З морепродуктами");
      }
      if(id==="pizza-for-vegan"){
          filterPizza("Вега");
      }
      if(id==="all-pizza-filter"){
          $(".main-title").html("<br>Усі<span class='badge'>6</span>");
          initialiseMenu();
      }
      
        
                
        
    });
function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");
    console.log(list);

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);
        

        $node.find(".buy-lg-button").click(function(){
         /*   var prev_number= $(".order-value").val();
            console.log("Hello :"+prev_number);
            var new_number=prev_number+1;
            $(".order-value").val(new_number);*/
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
            var order = parseInt($(".total-price").text());
            
            $(".total-price").text(pizza.big_size.price+order +" грн ");
           PizzaCart.incValue();
        });
        $node.find(".buy-sm-button").click(function(){
         /*   var prev_number= $(".order-value").val();
            console.log("Hello :"+prev_number);
            var new_number=prev_number+1;
            $(".order-value").val(new_number);*/
            
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
             var order = parseInt($(".total-price").text());
            
            $(".total-price").text(pizza.small_size.price+order + "  грн ");
       PizzaCart.incValue();
        });

        $pizza_list.append($node);
    }

list.forEach(showOnePizza);
  
}



function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    console.log("we are already here"+filter);
  Pizza_List.forEach(function(pizza,index,Pizza_List){
      console.log(pizza.type===filter); console.log("id"+pizza.id+"type"+pizza.type+"inde:"+index);
       if (pizza.type === filter){
           pizza_shown.push(pizza);
       } 
      console.log(pizza_shown);

   });
    $(".main-title").html("<br>"+filter+"<span class='badge'>"+pizza_shown.length+"</span>");
        
    


        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);

        //TODO: зробити фільтри
   

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
   
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;