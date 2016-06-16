/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage	=	require('../Storage');
var orders	=	{};
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};
var order_val=0;

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $(".order-list");
var $order=$(".total-price");


function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    if(!ifSimilar(Cart,pizza)){
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });
        incValue();
}else{
    incrementOne(Cart,pizza);
    
}
    //Оновити вміст кошика на сторінці
    updateCart();
}
function incValue(){
    order_val++;
}
function incrementOne(Cart,pizza){
  for(var i=0;i<Cart.length;i++){
    if(Cart[i].pizza.id===pizza.id){
        Cart[i].quantity++;  
}}}
function ifSimilar(Cart, pizza){
for(var i=0;i<Cart.length;i++){
    if(Cart[i].pizza.id===pizza.id){
        return true;
    }
}
    return false;
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    var removePizzaIndex= Cart.indexOf(cart_item);
    console.log("to remove:"+removePizzaIndex);
    if(removePizzaIndex > -1){
        
    Cart.splice(removePizzaIndex,1);
        
}else{
    console.log("Not removed :"+cart_item);
}

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {

    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    var saved_orders =	Storage.get('cart');
if(saved_orders)	{
Cart	=	saved_orders;
    $(".total-price").text(0 + "грн");
    Cart.forEach(function(cart_item,index,Cart){
        changePrice(cart_item,cart_item.quantity);
        for(var i =0;i<cart_item.quantity;i++){
            incValue();
            
        }
    })
    updateCart();
}else{
    

    

    updateCart();}
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}
function changePrice(cart_item,item){
    var price =  parseInt($(".total-price").text());
            
            
    if(cart_item.size=="small_size"){
    
        price +=(cart_item.pizza.small_size.price * item);
        if(price<0)price=0;
        $order.html(price +" грн ");
       
       }if(cart_item.size=="big_size"){
           
            price +=(cart_item.pizza.big_size.price * item);
           if(price<0)price=0;
           $order.html(price +" грн ");
}
}

function updateCart() {
    var $order_value= $("#order-value");
    
    
   
    $order_value.html(order_val);
    
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
    //   console.log("H:"+html_code);
        var $node = $(html_code);
      
//console.log($node);
        order_val++;
       
        $node.find(".add-button").click(function(){
            //Збільшуємо кількість замовлених піц
            if(cart_item.quantity>0){
                console.log("addidtion");
            cart_item.quantity ++;
                console.log("cart_item.quantity"+cart_item.quantity);
                if(cart_item.quantity===2){
         }else{
             order_val++;
         }
                console.log("order-val:"+order_val)
            changePrice(cart_item,1);
            $order_value.html(order_val);
                
         
            
          
;

            //Оновлюємо відображення
            updateCart();}
        });
        
        $node.find(".subtract-button").click(function(){
                   if(cart_item.quantity == 0){
 removeFromCart(cart_item);
           
        updateCart();
        } if(cart_item.quantity<0||order_val<0){
                
            }
            if(cart_item.quantity>0&&order_val>0){
            cart_item.quantity-=1;
           order_val-=1; 
                changePrice(cart_item,-1);
                
//console.log("Order_val:"+order_val);
            $order_value.html(order_val);
            }
            

            
     });
        
          $node.find(".delete-button").click(function(){
              
              if(cart_item.quantity>0&&order_val>0){
                  
            //  console.log("Save our souls");
                  
              
    if(cart_item.quantity>order_val){
        order_val=0;
        cart_item.quantity=0;
        
    $order_value.html(order_val);}
    else{
            order_val -= cart_item.quantity;
        
        changePrice(cart_item, -cart_item.quantity);
       // cart_item.quantity=0;
       // console.log("Order-val after remove"+order_val);
        $order_value.html(order_val);
                  }
                  removeFromCart(cart_item);
              }
               if(cart_item.quantity<0||order_val<0){
                
            }
              
                      
        updateCart();
        });
        
        
        

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    Storage.set("cart",Cart);

}
exports.incValue= incValue;

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;