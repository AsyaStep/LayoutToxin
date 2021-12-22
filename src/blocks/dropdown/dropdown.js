let input = document.querySelector(".dropdown__input");
let textInput = document.querySelector(".dropdown__content");
let menu = document.querySelector(".dropdown__menu");
let btnDecrement = document.querySelectorAll(".dropdown__decrement");
let btnIncrement = document.querySelectorAll(".dropdown__increment");

let minQuantity = 0;
let maxQuantityAdult = 16;
let maxQuantityChild = 5;
let maxQuantityBaby = 5;
let totalQuantity = 0;
let quantityBaby = 0;
let selectionText = {
  man: ['гость', 'гостя', 'гостей'],
  baby: ['младенец', 'младенца', 'младенцев']
}

let bendWords = (quantity, text) => { 
  let mod = Math.abs(quantity);
  
  if (mod === 1){
    return text[0]
  } else if (mod >=2 && mod <= 4){
    return text[1]
  } else if (mod >=5 && mod <=20){
    return text[2]
  } else {
    mod %= 10 
    if (mod === 1){
      return text[0]
    } else if (mod >=2 && mod <= 4){
      return text[1]
    } else{
      return text[2]
    }
  }
}

let changeInput = (totalQuantity, quantityBaby) => {  
  console.log(totalQuantity, quantityBaby);
  if (totalQuantity != 0){ 
    textInput.textContent = String(totalQuantity) + ' ' + bendWords(totalQuantity, selectionText.man)        
  } 
  if (totalQuantity != 0 && quantityBaby != 0){
    textInput.textContent = String(totalQuantity) + ' ' + bendWords(totalQuantity, selectionText.man) + ', ' + String(quantityBaby) + ' ' + bendWords(quantityBaby, selectionText.baby)
  } 
  if (totalQuantity === 0 && quantityBaby === 0) {
    textInput.textContent = "Сколько гостей"
  }
}

let quantityDecrement = (item) => {
    let quantity = item.parentElement.querySelector(".dropdown__quantity");
    let idOption = item.parentElement.dataset.id;    
    let count = Number(quantity.textContent)
  
    if (count > minQuantity){
      count -= 1;
      quantity.textContent = String(count);
      if (idOption != 'baby'){
        totalQuantity -= 1;
      }else {
        quantityBaby -=1;
      }
      changeInput(totalQuantity,quantityBaby);      
      }   
};

let quantityIncrement = (item) => {
  let quantity = item.parentElement.querySelector(".dropdown__quantity");
  let idOption = item.parentElement.dataset.id;
  let count = Number(quantity.textContent)

  let matchCount = (maxQuantity) => {
    if (count < maxQuantity){
      count+= 1;
      quantity.textContent = String(count)
      if (idOption != 'baby'){
        totalQuantity += 1;
        changeInput(totalQuantity,quantityBaby);
      } else {
        quantityBaby +=1;
        changeInput(totalQuantity,quantityBaby);
      }
    };
  }
  switch (idOption){
    case 'adult': 
      matchCount(maxQuantityAdult);
      break  
    case 'child':
      matchCount(maxQuantityChild);
      break  
    case 'baby':
      matchCount(maxQuantityBaby);
      break      
  } 
};

input.addEventListener("click",function(){
  menu.classList.toggle("active");
})

for (const item of btnDecrement){
  item.addEventListener("click", function(){
    quantityDecrement(item);
  })
}

for (const item of btnIncrement){
  item.addEventListener("click", function(){
    quantityIncrement(item)
  })
}


