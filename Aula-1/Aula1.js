function CalculateGrade(p1,p2,f){
    return (p1 * 0.3) + (p2 * 0.3) + (f * 0.4);
}
var finalGrade = CalculateGrade(12, 15, 13);
if (finalGrade >= 10) {
    console.log("Aprovado");
} else {
    console.log("Reprovado");
}

function numeroMes(mes){
    if (mes == 1){
        return "Janeiro";
    }    else if (mes == 2){
        return "Fevereiro";
    }    else if (mes == 3){
        return "Março";
    }    else if (mes == 4){
        return "Abril";
    }    else if (mes == 5){
        return "Maio";
    }    else if (mes == 6){
        return "Junho";
    }    else if (mes == 7){
        return "Julho";
    }   else if (mes == 8){
        return "Agosto";
    }   else if (mes == 9){
        return "Setembro";
    }    else if (mes == 10){
        return "Outubro";
    }    else if (mes == 11){
        return "Novembro";
    }    else if (mes == 12){
        return "Dezembro";
    } else {
        return "Mês inválido";
    }
}
console.log(numeroMes(5));

function calculadora(operacao, num1, num2){
    if (operacao == "soma"){
        return num1 + num2;
    }    else if (operacao == "subtracao"){
        return num1 - num2;
    }    else if (operacao == "multiplicacao"){
        return num1 * num2;
    }    else if (operacao == "divisao"){
        return num1 / num2;
    }
}
console.log(calculadora("soma", 5, 3));

function MultiploDeCinco(limite){
    for (let numero = 0; numero < limite; numero++){
        if (numero % 5 == 0){
            console.log(numero);
        }
    }
}
MultiploDeCinco(20);

function somaProximos100(){
    var soma = 0;
    for (let i = 1; i <= 100; i++){
        soma += i;
    }
    console.log(soma);
}
somaProximos100();

function fatorial(numero){
    if (numero < 0){
        return "Número negativo não tem fatorial";
    }
    if (numero == 0 || numero == 1){
        return 1;
    }
    let resultado = 1;
    for (let i = 2; i <= numero; i++){
        resultado *= i;
    }
    return resultado;
}
console.log("Fatorial de 5: " + fatorial(5));
console.log("Fatorial de 10: " + fatorial(10));

var array = [1, 2, 3, 4, 5];
function minimunOf(array) {
   var min = array[0];
   for (let i = 1; i < array.length; i++){
       if (array[i] < min){
           min = array[i];
       }
   }   return min; 
}
function maximumOf(array) {
    var max = array[0];
    for (let i = 1; i < array.length; i++){
        if (array[i] > max){
            max = array[i];
        }
    }    return max;
}
function averageOf(array) {
    var avg = 0;
    for (let i = 0; i < array.length; i++){
        avg += array[i];
    }
    return avg / array.length;
}

console.log("Array: " + array);
console.log("Média: " + averageOf(array));

