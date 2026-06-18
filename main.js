const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const botoes = document.querySelectorAll('.parametro-senha__botao');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho(){
    if (tamanhoSenha > 1){
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho(){
    if (tamanhoSenha < 20){
       tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Declaração dos elementos do HTML e elementos de texto
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca'); 
const valorEntropia = document.querySelector('.entropia'); // Movido para fora para performance

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Vincula o evento de clique para cada um dos checkboxes
for (let i = 0; i < checkbox.length; i++){
    checkbox[i].onclick = geraSenha;
}

function geraSenha(){
    let alfabeto = '';
    
    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;
    
    // Proteção: Se nenhum checkbox estiver marcado
    if (alfabeto.length === 0) {
        campoSenha.value = "Selecione uma opção";
        forcaSenha.classList.remove('fraca','media','forte');
        if (valorEntropia) valorEntropia.textContent = "Um computador levaria 0 dias.";
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++){
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto.length); // Chamada única e correta
}

function classificaSenha(tamanhoAlfabeto){
    // Fórmula correta da entropia: tamanho da senha * log2(tamanho do alfabeto)
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    
    forcaSenha.classList.remove('fraca','media','forte');
    
    if (entropia > 57){
        forcaSenha.classList.add('forte');
    } else if (entropia >= 36) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
    
    if (valorEntropia) {
        let dias = Math.floor(2**entropia / (100e6 * 60 * 60 * 24));
        valorEntropia.textContent = "Um computador pode levar até " + dias + " dias para descobrir essa senha.";
    }
}

// Executa a função para gerar a senha inicial
geraSenha();