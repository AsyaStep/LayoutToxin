const input = document.querySelector('.dropdown__input');
const textInput = document.querySelector('.dropdown__content');
const menu = document.querySelector('.dropdown__menu');
const divQuantity = document.querySelectorAll('.dropdown__quantity');
const btnDecrement = document.querySelectorAll('.dropdown__decrement');
const btnIncrement = document.querySelectorAll('.dropdown__increment');
const btnClear = document.querySelector('.dropdown__btn-clear');
const btnAdd = document.querySelector('.dropdown__btn-add');

const minQuantity = 0;
const maxQuantityAdult = 16;
const maxQuantityChild = 5;
const maxQuantityBaby = 5;
const selectionText = {
  man: ['гость', 'гостя', 'гостей'],
  baby: ['младенец', 'младенца', 'младенцев'],
};
const varnum = 'num';
const vartext = 'text';

let totalQuantity = 0;
let quantityBaby = 0;

const activeBtnClear = () => {
  const quantity = document.querySelectorAll('.dropdown__quantity');
  let sumQuantity = 0;
  for (const q of quantity) {
    sumQuantity += Number(q.textContent);
  }
  if (sumQuantity !== 0) {
    btnClear.classList.add('active');
  } else {
    btnClear.classList.remove('active');
  }
};

const quantityAdult = (variant) => {
  const quantityGuest = document.querySelectorAll('.dropdown__quantity-guest');
  for (const i of quantityGuest) {
    if (i.dataset.id === 'adult') {
      if (variant === 'num') {
        return Number(i.querySelector('.dropdown__quantity').textContent);
      }
      if (variant === 'text') {
        return (i.querySelector('.dropdown__quantity').textContent = '1');
      }
    }
  }
};

const bendWords = (quantity, text) => {
  let mod = Math.abs(quantity);

  if (mod === 1) {
    return text[0];
  } if (mod >= 2 && mod <= 4) {
    return text[1];
  } if (mod >= 5 && mod <= 20) {
    return text[2];
  }
  mod %= 10;
  if (mod === 1) {
    return text[0];
  } if (mod >= 2 && mod <= 4) {
    return text[1];
  }
  return text[2];
};

const changeInput = (totalQuantity, quantityBaby) => {
  if (totalQuantity !== 0) {
    textInput.textContent = `${String(totalQuantity)} ${bendWords(totalQuantity, selectionText.man)}`;
  }
  if (totalQuantity !== 0 && quantityBaby !== 0) {
    textInput.textContent = `${String(totalQuantity)
    } ${
      bendWords(totalQuantity, selectionText.man)
    }, ${
      String(quantityBaby)
    } ${
      bendWords(quantityBaby, selectionText.baby)}`;
  }
  if (totalQuantity === 0 && quantityBaby === 0) {
    textInput.textContent = 'Сколько гостей';
  }
};

const quantityDecrement = (item) => {
  const quantity = item.parentElement.querySelector('.dropdown__quantity');
  const idOption = item.parentElement.dataset.id;
  let count = Number(quantity.textContent);

  if (count > minQuantity) {
    count -= 1;
    quantity.textContent = String(count);
    const adult = quantityAdult(varnum);

    if (adult === 0) {
      for (const i of divQuantity) {
        i.textContent = '0';
      }
      totalQuantity = 0;
      quantityBaby = 0;
      changeInput(totalQuantity, quantityBaby);
    } else {
      if (idOption !== 'baby') {
        totalQuantity -= 1;
      } else {
        quantityBaby -= 1;
      }
      changeInput(totalQuantity, quantityBaby);
    }
  }
  activeBtnClear();
};

const quantityIncrement = (item) => {
  const quantity = item.parentElement.querySelector('.dropdown__quantity');
  const idOption = item.parentElement.dataset.id;
  let count = Number(quantity.textContent);

  const matchCount = (maxQuantity) => {
    if (count < maxQuantity) {
      count += 1;
      quantity.textContent = String(count);
      const adult = quantityAdult(varnum);

      if (idOption !== 'adult' && adult === 0) {
        quantityAdult(vartext);
        quantity.textContent = String(count);
        if (idOption === 'child') {
          totalQuantity += 2;
        } else {
          totalQuantity += 1;
          quantityBaby += 1;
        }
        changeInput(totalQuantity, quantityBaby);
      } else if (idOption !== 'baby') {
        totalQuantity += 1;
        changeInput(totalQuantity, quantityBaby);
      } else {
        quantityBaby += 1;
        changeInput(totalQuantity, quantityBaby);
      }
    }
  };
  switch (idOption) {
    case 'adult':
      matchCount(maxQuantityAdult);
      break;
    case 'child':
      matchCount(maxQuantityChild);
      break;
    case 'baby':
      matchCount(maxQuantityBaby);
      break;
  }
  activeBtnClear();
};

input.addEventListener('click', () => {
  menu.classList.toggle('active');
});

for (const item of btnDecrement) {
  item.addEventListener('click', () => {
    quantityDecrement(item);
  });
}

for (const item of btnIncrement) {
  item.addEventListener('click', () => {
    quantityIncrement(item);
  });
}

btnClear.addEventListener('click', () => {
  const quantity = document.querySelectorAll('.dropdown__quantity');
  for (const q of quantity) {
    q.textContent = '0';
  }
  totalQuantity = 0;
  quantityBaby = 0;
  changeInput(totalQuantity, quantityBaby);
  btnClear.classList.remove('active');
});

btnAdd.addEventListener('click', () => {
  menu.classList.toggle('active');
});
