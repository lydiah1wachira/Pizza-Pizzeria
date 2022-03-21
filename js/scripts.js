//back-end logic//


const submitButton = document.getElementById('submit-btn')
const summary = document.getElementById('order_summary')


const pizzaOrder = {
  size: {
    small: 500,
    medium: 700,
    large: 950
  },

  crust: {
    glutenfree: 200,
    flatbread: 100,
    stuffed: 150,
    thin: 50,
  },

  toppings: 100,
  
}


const sumArray = (arr) => {
  let total = 0
  for (let index = 0; index < arr.length; index++) {
    total += arr[index]
  }

  return total
}

const orders = []


submitButton.addEventListener("click", e =>{
  e.preventDefault()
  const {flavor, size, crust, toppings} = document.forms.orders_form.elements  

  orders.push({
    size:pizzaOrder.size[size.value],
    crust:pizzaOrder.crust[crust.value],
    toppings:pizzaOrder.toppings,
  })


  const existingWrapper = document.getElementById("wrapper")
  if(existingWrapper) existingWrapper.remove()
  const wrapper = document.createElement('div')
  wrapper.setAttribute("id", "wrapper")
  orders.forEach((order) => {
    const orderSummaryDiv = document.createElement("div")
    orderSummaryDiv.className = "d-flex justify-content-between align-items-center"
    const list = document.createElement("ul")
    const listItemSize = document.createElement("li")
    const listItemFlavor = document.createElement("li")
    const listItemCrust = document.createElement("li")
    const listItemToppings = document.createElement("li")
  
    listItemSize.innerHTML = "Size: " + order.size
    listItemFlavor.innerHTML = "Flavor: " + flavor.value
    listItemCrust.innerHTML = "Crust: " + order.crust
    listItemToppings.innerHTML = "Toppings: " + order.toppings
  
    list.append(listItemSize)
    list.append(listItemFlavor)
    list.append(listItemCrust)
    list.append(listItemToppings)

    orderSummaryDiv.appendChild(list)
    const total = sumArray(Object.values(order))
    const p = document.createElement("p")
    p.innerHTML = "KES " + total
    orderSummaryDiv.appendChild(p)
    wrapper.appendChild(orderSummaryDiv)
    summary.appendChild(wrapper)
  })


 
 const totalOrder = sumArray(orders.map((ordr) => sumArray(Object.values(ordr))))

  const summaryDiv = document.createElement("div")
  summaryDiv.className = "d-flex justify-content-between align-items-center"
  const totalLabel = document.createElement("p")
  totalLabel.innerHTML = "Total: "   
  
  const totalValue = document.createElement("p")
  totalValue.innerHTML = "KES " + totalOrder
  summaryDiv.appendChild(totalLabel)
  summaryDiv.appendChild(totalValue)
  wrapper.appendChild(summaryDiv)

  const checkout = document.createElement("button")
  checkout.setAttribute('content', 'checkout')
  checkout.className = "btn btn-primary"
  checkout.innerHTML = "Checkout"
  wrapper.appendChild(checkout)

  checkout.addEventListener('click', e => {
    e.preventDefault()
   
    const deliveryStatementDiv = document.createElement("button")
    deliveryStatementDiv.setAttribute('content', 'delivery?')
    deliveryStatementDiv.className = "btn btn-primary"
    deliveryStatementDiv.innerHTML = "Delivery ?"
   

    const confirmAction = confirm("Would you like this order to be delivered?")

    if(confirmAction){
      const location = prompt("Enter Location for delivery")
      const message = "Your order amount is " + totalOrder + " and will delivered to " + location
      alert(message)
    }else{
      alert("Your order will be ready for pick-up in 15 minutes.")
    }
  })

})



