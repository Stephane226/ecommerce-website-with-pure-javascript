const itemsSection = document.getElementById("items");
const url = "http://localhost:3000/api/products"

function updateQuantity() {
    var itemNumbers_ = document.getElementsByClassName('itemQuantity')
    console.log(itemNumbers_.length)

    for (i = 0; i < itemNumbers_.length; i++) {
        productNumber_ = itemNumbers_[i].value

        itemNumbers_[i].addEventListener('change', function changeFonction(event) {

            let getOldbasketDataItems = JSON.parse(localStorage.getItem("basketDataItems"));

            let oldbasketDataItems = JSON.parse(localStorage.getItem("basketDataItems"));
            let itemId = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")
            let color_select = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-color")

            let newProductNumber = event.target.value
            let item_set_id = itemId + 'itemColor' + color_select
            oldbasketDataItems.filter((data) => {
                if (data.id == itemId && item_set_id == data.newIdSet) {
                    console.log('sames')
                    SendNewObject = {
                        "color": data.color,
                        "id": data.id,
                        "productNumber": newProductNumber,
                        "newIdSet": item_set_id
                    }
                    let rest_getOldbasketDataItems_ = getOldbasketDataItems.filter((datas) => {

                        return datas.newIdSet !== item_set_id
                    })
                    console.log(rest_getOldbasketDataItems_ + 'di')
                    localStorage.setItem('basketDataItems', JSON.stringify(rest_getOldbasketDataItems_));



                    let oldbasketDataItemsNew = JSON.parse(localStorage.getItem("basketDataItems"));
                    oldbasketDataItemsNew.push(SendNewObject)
                    localStorage.setItem('basketDataItems', JSON.stringify(oldbasketDataItemsNew));

                    let arr_ = []
                    fetch(url)
                        .then(response => response.json())
                        .then(prouctsDatas => prouctsDatas.filter((item) => {

                            setItem_filter = item

                            let basketDatasStorage = localStorage.getItem('basketDataItems')

                            let datason = JSON.parse(basketDatasStorage)
                            datason.filter((item2) => {
                                let item_id_ = item2.id
                                if (item_id_.includes(item._id)) {
                                    arr_.push(item.price * parseInt(item2.productNumber))
                                    console.log(arr_)
                                    const sumarr_ = arr_.reduce((partialSum, a) => partialSum + a, 0);
                                    document.getElementById("totalPrice").innerHTML = sumarr_
                                    document.getElementById("totalQuantity").innerHTML = datason.length
                                }
                            })




                        }))




                }

            })


        })


    }
}




/*total to pay*/
let total = 0
let updatedTotal = 0
let totalUpdate = 0

function displayTotalToPay() {
    fetch(url)
        .then(response => response.json())
        .then(prouctsDatas => prouctsDatas.filter((item) => {

            setItem_filter = item

            let basketDatasStorage = localStorage.getItem('basketDataItems')

            let datason = JSON.parse(basketDatasStorage)
            datason.filter((item2) => {
                let item_id_ = item2.id
                if (item_id_.includes(item._id)) {

                    let toAdd = item.price * parseInt(item2.productNumber)

                    total += toAdd

                    document.getElementById("totalPrice").innerHTML = total
                    document.getElementById("totalQuantity").innerHTML = datason.length
                }
            })




        }))
}
displayTotalToPay()




const basketDataDisplay = document.getElementById("cart__items");


function delete_item(event) {
    console.log('clock')

    let getOldBasketItemId = JSON.parse(localStorage.getItem("basketItemId"));
    let getOldbasketDataItems = JSON.parse(localStorage.getItem("basketDataItems"));
    let data_set_delete = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id")
    let data_color = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-color")




    let rest_getOldbasketDataItems = getOldbasketDataItems.filter((data) => {

        let countOtherItems = 0
        const otherItems = getOldbasketDataItems.filter(item => {
            if (item.id == data_set_delete) {
                countOtherItems += 1
            }
        })
        if (countOtherItems <= 1) {

            let rest_basketItemId = getOldBasketItemId.filter((data) => {


                return data !== data_set_delete
            })

            localStorage.setItem('basketItemId', JSON.stringify(rest_basketItemId));

        }
        return data.color !== data_color


    })



    // 
    localStorage.setItem('basketDataItems', JSON.stringify(rest_getOldbasketDataItems));

    function cleanBasketHtml() {
        basketDataDisplay.innerHTML = ''
    }
    cleanBasketHtml()


    displayBasketData()

    function updateTotalToPay() {
        fetch(url)
            .then(response => response.json())
            .then(prouctsDatas => prouctsDatas.filter((item) => {

                setItem_filter = item

                let basketDatasStorage = localStorage.getItem('basketDataItems')

                let datason = JSON.parse(basketDatasStorage)
                datason.filter((item2) => {
                    let item_id_ = item2.id
                    if (item_id_.includes(item._id)) {

                        let toAdd = item.price * parseInt(item2.productNumber)

                        totalUpdate += toAdd

                        document.getElementById("totalPrice").innerHTML = totalUpdate
                        document.getElementById("totalQuantity").innerHTML = datason.length


                    }
                })


                if (datason.length < 1) {
                    document.getElementById("totalPrice").innerHTML = ''
                    document.getElementById("totalQuantity").innerHTML = ''
                }


            }))
    }

    updateTotalToPay()
    totalUpdate = 0



    setTimeout(function() {
        return updateQuantity()
    }, 3000)


    //  window.location.href = "../html/cart.html"

}




/* card page */
function displayBasketData() {
    setTimeout(function() {
        let deletProductBtn
        deletProductBtn = document.getElementsByClassName("deleteItem")
        for (let i = 0; i < deletProductBtn.length; i++) {
            var deleteBtn = deletProductBtn[i]
            deleteBtn.addEventListener("click", delete_item)
        }



    }, 1000)

    fetch(url)
        .then(response => response.json())
        .then(prouctsDatas => prouctsDatas.filter((item) => {

            basketData = item

            //var basketItemsStorage= localStorage.getItem('basketItemId')
            let basketDatasStorage = localStorage.getItem('basketDataItems')

            let datason = JSON.parse(basketDatasStorage)
            datason.filter((item2) => {
                let item_id_ = item2.id
                if (item_id_.includes(item._id)) {


                    basketDataDisplay.innerHTML += `

    <article class="cart__item" data-id="${item._id}" data-color="${item2.color}">
    <div class="cart__item__img">
      <img src="${basketData.imageUrl}" alt="${item.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${basketData.name}</h2>
        <p>${item2.color}</p>
        <p>${basketData.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté :${item2.productNumber} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item2.productNumber}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article> 
    
    
    `;
                }
            })
        }))
}
displayBasketData()




/*  commander */
let order_url = "http://localhost:3000/api/products/order"
window.addEventListener('load', function() {
    const order = document.getElementById("order");
    order.addEventListener("click", function(e) {



        e.preventDefault()
        /*get input and user data*/
        const user_firstName = document.getElementById("firstName").value
        const user_lastName = document.getElementById("lastName").value
        const user_address = document.getElementById("address").value
        const user_city = document.getElementById("city").value
        const user_email = document.getElementById("email").value



        /* convert the data structure into the required structure at the backend (post)*/
        const basketItemsStorage_ = localStorage.getItem('basketItemId')
        let array_item2 = basketItemsStorage_.replace(/\\/g, '')
        let array_item3 = array_item2.replace(/\"/g, '')
        let array_item4 = array_item3.replace(/\[/g, '')
        let array_item5 = array_item4.replace(/\]/g, '')


        console.log("array_item 5:" + array_item5)



        let payload = {
            contact: {
                firstName: user_firstName,
                lastName: user_lastName,
                address: user_address,
                city: user_city,
                email: user_email
            },

        }
        let stringifyedPayload_;



        stringifyedPayload_ = payload
        stringifyedPayload_.products = array_item5.split(/[.,!,?,;,...]/);
        console.log(stringifyedPayload_)




        let options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stringifyedPayload_)

        }
        fetch(order_url, options).then((res) => {
                return res.json();
            })
            .then((data) => {


                function validateEmail_(email) {
                    if (email.indexOf('@') > 0) {
                        return true
                    } else {
                        return false
                    }

                }
                //validation form

                //validation form
                let validateFirstName = validateLastname = validateAdress = validateCity = validateEmail = false

                if (user_firstName == "") {
                    document.getElementById('firstNameErrorMsg').innerHTML = "Veuillez entrer votre nom"


                } else {
                    document.getElementById('firstNameErrorMsg').innerHTML = ""
                    validateFirstName = true

                }

                if (user_lastName == "") {
                    document.getElementById('lastNameErrorMsg').innerHTML = "Veuillez entrer votre prenom"

                } else {
                    document.getElementById('lastNameErrorMsg').innerHTML = ""
                    validateLastname = true

                }
                if (user_address == "") {
                    document.getElementById('addressErrorMsg').innerHTML = "Veuillez entrer votre addresse"

                } else {
                    document.getElementById('addressErrorMsg').innerHTML = ""
                    validateAdress = true

                }

                if (user_city == "") {
                    document.getElementById('cityErrorMsg').innerHTML = "Veuillez entrer votre ville"

                } else {
                    document.getElementById('cityErrorMsg').innerHTML = ""
                    validateCity = true

                }

                if (user_email == "") {
                    document.getElementById('emailErrorMsg').innerHTML = "Veuillez entrer votre mail"

                } else if (!validateEmail_(user_email)) {
                    document.getElementById('emailErrorMsg').innerHTML = "Veuillez entrer un mail correcte"
                } else {
                    document.getElementById('emailErrorMsg').innerHTML = ""
                    validateEmail = true

                }
                console.log('valise' + validateFirstName + ' ' + validateLastname + ' ' + validateAdress + ' ' + validateCity + ' ' + validateEmail)
                if (validateFirstName && validateLastname && validateAdress && validateCity && validateEmail) {

                    window.location.href = "../html/confirmation.html?order-id=" + data.orderId;
                    localStorage.clear();



                }




                console.log(data)
            });



    })
})




document.addEventListener('DOMContentLoaded', function() {

    //delete product from basket

    setTimeout(function() {


        let deletProductBtn

        deletProductBtn = document.getElementsByClassName("deleteItem")
        for (let i = 0; i < deletProductBtn.length; i++) {


            let deleteBtn

            deleteBtn = deletProductBtn[i]
            console.log(deletProductBtn[i] + 'one click')


            deleteBtn.addEventListener("click", delete_item)


        }

        //on quantity change
        updateQuantity()

    }, 1000)
})
