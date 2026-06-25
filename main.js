const botoes = document.querySelectorAll('.parametro-senha__botao');
const textoTamanho = document.querySelector('.parametro-senha__texto');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*()_+=-';

let tamanhoSenha = 12;

// Configuração dos botões de aumentar e diminuir tamanho
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// Atualiza a senha automaticamente ao clicar em qualquer checkbox
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        textoTamanho.textContent = tamanhoSenha;
        geraSenha();
    }
}

function aumentaTamanho() {
    if (tamanhoSenha < 20 ) {
     tamanhoSenha++
     }
     textoTamanho.textContent = tamanhoSenha;
     geraSenha();
    
}

function geraSenha() {
    let alfabeto = '';

    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;

    if (alfabeto.length === 0) {
        campoSenha.value = "Selecione uma opção";
        forcaSenha.className = 'forca'; // Reseta as classes de cor
        if (valorEntropia) valorEntropia.textContent = "Um computador levaria 0 dias.";
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia >= 36) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
    
    if (valorEntropia) {
        let dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));
        if (dias < 1) {
            valorEntropia.textContent = "Um computador pode descobrir essa senha em menos de um dia.";
        } else {
            valorEntropia.textContent = "Um computador pode levar até " + dias + " dias para descobrir essa senha.";
        }
    }
}

// Inicializa o gerador ao carregar a página
geraSenha();