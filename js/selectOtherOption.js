const otherOption = document.querySelector('#budget');
const formSubmit = document.getElementsByClassName('form__submit');
otherOption.addEventListener('change', event => {
    const formGroup = document.createElement('div');
    const newInput = document.createElement('input');
    const parentElem = formSubmit[0].parentElement;
    const input = document.querySelector('.new')

    formGroup.className = 'form__group new';
    newInput.placeholder = 'Введите ваш вариант'
    formGroup.appendChild(newInput);
    console.log(formGroup.classList)
    console.log(formGroup.className)
    if (event.target.value === 'other') {
        parentElem.insertBefore(formGroup, formSubmit[0]);
    } else if (parentElem.contains(input)) {
        input.remove();
    }
})