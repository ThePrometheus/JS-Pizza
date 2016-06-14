/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};
var order_val=1;
//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $(".order-list");


function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    if(!ifSimilar(Cart,pizza)){
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });
}
    //Оновити вміст кошика на сторінці
    updateCart();
}
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
    if(removePizzaIndex>-1){
    Cart.splice(removePizzaIndex,cart_item);
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
    

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
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
 console.log("Start cart:"+cart_item.quantity);
    console.log("Start order_val:"+order_val);
        var $node = $(html_code);

        $node.find(".add-button").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity ++;
            order_val++;
            console.log("Order_val:"+order_val);
            $order_value.html(order_val);
            $counter= $node.find(".pizza-ordered-counter");
            console.log($counter+"Counter");
            $counter.text(cart_item.quantity);

            //Оновлюємо відображення
            updateCart();
        });
        
        $node.find(".subtract-button").click(function(){
            if(cart_item.quantity>0&&order_val>0){
            cart_item.quantity-=1;
           order_val-=1; 
                
console.log("Order_val:"+order_val);
            $order_value.html(order_val);
            }
             if(cart_item.quantity<0||order_val<0){
                
            }

            
            if(cart_item.quantity === 0){
 removeFromCart(cart_item);
           
        updateCart();
        }});
        
          $node.find(".delete-button").click(function(){
            order_val-=cart_item.quantity;
              $order_value.html(order_val);
              
              
removeFromCart(cart_item);
        updateCart();
        });
        
        

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;