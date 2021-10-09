let toggle = document.querySelector('.toggle');

toggle.addEventListener('click',function(){
    
let mude = document.querySelector('.mude');
let lua_bx = document.querySelector('.lua_bx');
let sol_bx = document.querySelector('.sol_bx');
mude.classList.toggle('darkMode')
lua_bx.classList.toggle('luaShow')
lua_bx.classList.toggle('luaEnd')
sol_bx.classList.toggle('luaShow')
sol_bx.classList.toggle('luaEnd')
});

const calculo = document.getElementById('calculo');
const rs = document.getElementById('resul');
//Pega cada item html que tenha TECLA ou OPERADOR no id
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');
//Seta para o codigo que é um novo numero, logo pode substituir
let novoNumero = true;
// Variavel para guardar o valor do operador
let operador;
// Variavel para guardar na memoria o primeiro valor da operção
let numeroAnterior;
let htmlOp;

//Verifica se algum sinal de operção ja foi utilizado
const operacaoPendente = () => operador != undefined;

const calcular = () => {
  //Calcular somente se operacaoPendente for true
  if(operacaoPendente()){
    //Numero atual recebe o segundo valor
    const numeroAtual = parseFloat(calculo.textContent)
    //Reseta as operaçoes
    novoNumero = true;
    //calcula tudo
    const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`)
    //Mostra na tela o resultado
    attDisplay2(resultado)
  }
}
//Função pra mostrar na tela o que é digitado
const attDisplay = (texto) => {
  if(novoNumero){
    calculo.textContent = texto;
    novoNumero = false
  }else{
    calculo.textContent += texto;
  }
}
// Função para mostrar o resultado da operação
const attDisplay2 = (texto) => {
    rs.textContent = texto;
    novoNumero = true
    calculo.textContent = texto
    novoNumero = false
 }

// A função inserir numero recebe um evento (numero digitado), e joga esse numro pra attDisplay
const inserirNumero = (evento) => attDisplay(evento.target.textContent);

//Pega cada numero em numeros
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

//Recebe o cada operador digitado e coloca dentro de um evento
const selectOperador = (evento) =>{
  // Só vai poder inserir um sinal se ja tiver algum numero digitado
  if(!novoNumero){
      //manda o operador pra function calcular e executa
      calcular()
      novoNumero = true;
      // Pega o valor recebido da calc que é um x e muda pra * (operador calculavel)
      if(evento.target.textContent == 'x'){
        operador = '*'
      }else{
        operador = evento.target.textContent
      }
      // Envia pra var numeroAnterior o valor digitado antes do operador
      numeroAnterior = parseFloat(calculo.textContent);
      htmlOp = evento.target;
      htmlOp.classList.add('macaca');
      setInterval(() => {
        htmlOp.classList.remove('macaca');
      }, 2000);
     

      console.log(htmlOp)
  }
}
//Pega cada operador digitado dentro de operadores e joga esse evento para a function selectOperador
operadores.forEach(operador => operador.addEventListener('click', selectOperador));



const ativarIgual = () =>{
  calcular()
  //reseta os operadores
  operador = undefined;
}
document.getElementById('calcular').addEventListener('click', ativarIgual)


const limparCalculo = () =>{
  calculo.textContent = '';
  rs.textContent = '';
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
}
document.getElementById('operador_ce').addEventListener('click', limparCalculo);

const removerUltimo = () => calculo.textContent = calculo.textContent.slice(0,-1);
document.getElementById('apagar').addEventListener('click', removerUltimo);


const inverteSinal = () => {
  novoNumero = true;
  attDisplay(calculo.textContent *-1)
}
document.getElementById('maismenos').addEventListener('click', inverteSinal);


const existirDecimal = () => calculo.textContent.indexOf('.') != -1;
const existeValor = () => calculo.textContent.length > 0;
const inserirDecimal = () =>{
  if(!existirDecimal()){
    if(existeValor()){
      attDisplay('.');
    }else{
      attDisplay('0.');
    }
  }

 }

document.getElementById('decimal').addEventListener('click', inserirDecimal);

// Mapear Teclado

const mapaTeclado = {
  '0' : 'tecla_0',
  '1' : 'tecla_1',
  '2' : 'tecla_2',
  '3' : 'tecla_3',
  '4' : 'tecla_4',
  '5' : 'tecla_5',
  '6' : 'tecla_6',
  '7' : 'tecla_7',
  '8' : 'tecla_8',
  '9' : 'tecla_9',
  '+' : 'operador_somar',
  '-' : 'operador_menos',
  '*' : 'operador_multiplicar',
  '/' : 'operador_dividir',
  '.' : 'decimal',
  '%' : 'operador_raiz',
  '=' : 'calcular',
  'Enter' : 'calcular',
  'Backspace' : 'apagar',
  'c' : 'operador_ce'
}

const mapearTeclado = (evento) => {
  const tecla = evento.key

  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) != -1; 
  if(teclaPermitida())
  document.getElementById(mapaTeclado[tecla]).click();
}

document.addEventListener('keydown', mapearTeclado);