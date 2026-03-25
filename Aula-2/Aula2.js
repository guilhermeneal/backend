function CalcImc(peso, altura) {
    var imc = peso / (altura * altura)
    if (imc < 18.5) {
        console.log("Abaixo do peso")
    }
    else if (imc >= 18.5 and imc < 25) {
        console.log("Peso normal")
    }
    else if (imc >= 25 and imc < 30) {
        console.log("Sobrepeso")
    }
    else if (imc >= 30) {
        console.log("Obeso")
    }
}
CalcImc(70, 175);


function inverteFrase(frase) {
    var resultado = "";
    for (let i = frase.length - 1; i >= 0; i--) {
        resultado += frase[i];
    }
    return resultado;
}
console.log(inverteFrase("Hoje e Domingo"));

function contaVogais(frase) {
    var vogais = "aeiouAEIOU";
    var contador = 0;
    for (let i = 0; i < frase.length; i++) {
        if (vogais.includes(frase[i])) {
            contador++;
        }
    }
    return contador;
}
console.log(contaVogais("Hoje e sabado"));

function contaletras(frase, letra) {
    var contador = 0;
    var letraMin = letra.toLowerCase();
    for (let i = 0; i < frase.length; i++) {
        if (frase[i].toLowerCase() === letraMin) {
            contador++;
        }
    }
    return contador;
}
console.log(contaletras("Hoje e sabado", "H"));

function horatrabalho(entrada, saida) {
    if (entrada < 8 || entrada > 18 || saida < 8 || saida > 18) {
        return "Horário de trabalho é das 8h às 18h";
    }
    var horastrabalhadas= saida - entrada;
    return "Hoje foram trabalhadas " + horastrabalhadas + " horas.";
}
console.log(horatrabalho(10, 12));

function retangulo(largura, altura) {
    for (let i = 0; i < altura; i++) {
        let linha = "";
        for (let j = 0; j < largura; j++) {
            linha += "*";
        }
        console.log(linha);
    }
}
retangulo(20, 10);

function triangulo(altura) {
    for (let i = 1; i <= altura; i++) {
        let linha = "";
        for (let j = 1; j <= i; j++) {
            linha += "*";
        }
        console.log(linha);
    }
}
triangulo(10);

function retanguloVazio(largura, altura) {
    for (let i = 0; i < altura; i++) {
        let linha = "";
        for (let j = 0; j < largura; j++) {
            if (i === 0 || i === altura - 1 || j === 0 || j === largura - 1) {
                linha += "*";
            } else {
                linha += " ";
            }
        }
        console.log(linha);
    }
}
retanguloVazio(20, 10);

function turmaNotas(alunos,notas) {
    turma = {pedro : 19,tomas : 17,ana :12,marcos : 6};
    