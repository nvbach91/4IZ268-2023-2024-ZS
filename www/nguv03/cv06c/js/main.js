/**
 * document.querySelector()     -> vyber elementu pomoci css selektoru
 * element.addEventListener()   -> posluchac udalosti
 * element.textContent          -> textovy obsah elementu, da se menit operatorem =
 * input.value                  -> hodnota inputu
 */
document.querySelector('#submit').addEventListener('click', () => {
    document.querySelector('#text-content').textContent = 
        document.querySelector('#text-input').value;
});