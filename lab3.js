function Choice(){
    let n = true;
    while (n === true) {
        let key = prompt("Вы находитесь в консольном магазине!\nВведите 1-7 для работы с магазином\n1.Добавить товар в магазин\n2.Добавить товар в корзину\n3.Удалить товар из корзины (по одному товару за раз)\n4.Конечная стоимость корзины\n5.Показать все товары магазина\n6.Показать все товары корзины\n7.Выход из магазина");
        switch (key) {
            case "1":
                AddProduct();
                break;
            case "2":
                AddProductToBasket();
                break;
            case "3":
                DeleteProductFromBasket();
                break;
            case "4":
                FinallyCostOfBasket();
                break;
            case "5":
                ShowAllProducts();
                break;
            case "6":
                ShowAllProductsOfBasket();
                break;
            case "7":
                n = Exit(n);
                break;
            default:
                alert("Вы ввелие неправильное значение! Попробуйте еще раз")
        }
        
    }
}

function AddProduct(){
    let nameProduct = prompt("Какой товар вы хотите добавить в магазин?");
    let n = false;
    while (!n) {
        let costProduct = prompt(`Какая цена товара ${nameProduct}?`);
        if (isNaN(costProduct) || (costProduct < 0)) {
            alert("Внимание! Вы ввели не число, либо отрицательное число! Попробуйте снова");
        } else {
            const Product = {
                name: nameProduct,
                cost: costProduct,
            }
            products.push(Product);
            n =  true;
        }
    }
    
}

function AddProductToBasket(){
    if (products.length !== 0){
        let arrayOfAllNamesProducts = products.map(product => product.name);
        let stringOfAllNamesProducts = arrayOfAllNamesProducts.join(', ');
        
        let n = false;
        while (!n) {
            let newProductName = prompt(`Какой товар вы хотите добавить в корзину? Доступный товар: ${stringOfAllNamesProducts}`);
            if (arrayOfAllNamesProducts.includes(newProductName)) {
                if (Basket.arrayProducts.includes(newProductName)) {
                    let index = Basket.arrayProducts.indexOf(newProductName);
                    Basket.countOfProduct[index]++; 
                } else {
                    Basket.arrayProducts.push(newProductName);
                    Basket.countOfProduct.push(1);
                }
                n = true;
            } else {
                alert("Вы ввели товар не из корзины! Попробуйте еще раз")
            }
        }
    } else {
        alert("Введите сначала товар в магазин!");
    }
}

function DeleteProductFromBasket(){
    let stringOfAllProductOfBasket = Basket.arrayProducts.join(", ");
    let n = false;
    while (!n) {
        let productOfDelete = prompt(`Какой товар вы хотите удалить из корзины? Доступный товар из корзины: ${stringOfAllProductOfBasket}`);
        if (Basket.arrayProducts.includes(productOfDelete)) {
            let indexProduct = Basket.arrayProducts.indexOf(productOfDelete);
            if (Basket.countOfProduct[indexProduct] > 1){
                Basket.countOfProduct[indexProduct]--; 
            } else {
                for (let i = indexProduct; i < Basket.arrayProducts.length; i++){
                    Basket.arrayProducts[i] = Basket.arrayProducts[i + 1];
                }
                Basket.arrayProducts.pop(Basket.arrayProducts.length - 1);
            }
            n = true;
        } else {
            alert("Вы ввели товар не из корзины! Попоробуйте снова");
        }
    }
    console.log("Add str");
}

function FinallyCostOfBasket(){
    if (Basket.arrayProducts.length !== 0) {
        let sumOfBasket = 0;
        for(let i = 0; i < Basket.arrayProducts.length; i++) {
            for(let j = 0; j < products.length; j++) {
                if (products[j].name === Basket.arrayProducts[i]){
                    let currentCost = Number(products[j].cost);
                    sumOfBasket += currentCost * Basket.countOfProduct[i];
                    break;
                }
            }
        }
        alert(`Конечная стоимость корзины: ${sumOfBasket} руб`);
    } else {
        alert("Корзина пуста!");
    }
}


function ShowAllProducts(){
    if (products.length !== 0){
        let productList = "";
        for(let i = 0; i < products.length; i++){
            productList += `${i + 1}. ${products[i].name} - ${products[i].cost} руб\n`
        }
        alert("Доступные товары:\n" + productList);
    } else {
        alert("Товаров нет!");
    }
}

function ShowAllProductsOfBasket(){
    if (Basket.arrayProducts.length !== 0) {
        let productListOfBasket = "";
        for(let i = 0; i < Basket.arrayProducts.length; i++){
            productListOfBasket += `${i + 1}. ${Basket.arrayProducts[i]} - ${Basket.countOfProduct[i]} штук\n`
        }
        alert("Товары корзины:\n" + productListOfBasket)
    } else {
        alert("Корзина пуста!");
    }
}

function Exit(n){
    n = false;
    alert("Спасибо, что воспользовались нашим магазином!");
    return n;
}

const products = [];
const basket = [];
const count = [];

const Basket = {
    arrayProducts: basket,
    countOfProduct: count, 
}

Choice();
