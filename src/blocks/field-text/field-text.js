import 'inputmask/dist/jquery.inputmask.js';

$(":input[data-inputmask]").inputmask({placeholder: "ДД.ММ.ГГГГ", min: '01/01/1900',
max: '01/01/2023'}) 
