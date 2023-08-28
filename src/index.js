let podeJogar = false
let segundos = 0
let jogada = 0
let acertos = 0
let startTimer
let tempoFim = 10 //let contarAte
let textoTempo = '*'

function onLoad() {
    const dependencias = {
        tela: Tela,
        util: Util
    }
    const jogoDaMemoria = new JogoDaMemoria(dependencias)
    jogoDaMemoria.inicializar()
}

window.onload = onLoad