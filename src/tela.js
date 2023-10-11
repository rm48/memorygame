const ID_BOTAO_JOGAR = "jogar"
const ID_CONTADOR = "contador"
const ID_FIM = "fim"
const ID_CONTEUDO = "conteudo"
const ID_MENSAGEM = "mensagem"
const CLASSE_INATIVO = "transparente"
let startTimer
let segundos
let pasta = 1
let inicio = 0
let iconesIniciais = []

class Tela {

    static atualizarIcones(path, itens) {
        pasta = path
        iconesIniciais = [
            { img: `./icones/${pasta}/1.gif`, nome: '1' },
            { img: `./icones/${pasta}/2.gif`, nome: '2' },
            { img: `./icones/${pasta}/3.gif`, nome: '3' },
            { img: `./icones/${pasta}/4.gif`, nome: '4' },
            { img: `./icones/${pasta}/5.gif`, nome: '5' },
            { img: `./icones/${pasta}/6.gif`, nome: '6' },
            { img: `./icones/${pasta}/7.gif`, nome: '7' },
            { img: `./icones/${pasta}/8.gif`, nome: '8' },
            { img: `./icones/${pasta}/9.gif`, nome: '9' },
            { img: `./icones/${pasta}/10.gif`, nome: '10' },
        ]
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    static gerarStringHTMLPelaImagem(data) {
        return data.map(Tela.obterCodigoHtml).join('')
    }
    static obterCodigoHtml(item) {

        return `   
            <span   onclick="window.verificarClique('${item.id}', '${item.nome}')">
                <img name="${item.nome}" src="${item.img}" class="icone" alt="${item.nome}" />
            </span>  
        `
    }

    static alterarConteudoHTML(codigoHtml) {
        if (inicio) {
            const conteudo = document.getElementById(ID_CONTEUDO)
            conteudo.innerHTML = codigoHtml
        }
    }

    static mostrarContagemRegressiva(str, tm) {
        document.getElementById(ID_BOTAO_JOGAR).classList.add(CLASSE_INATIVO)
        let tempoInicio = tm
        const identificadorNoTexto = "$$contagem"
        const textoPadrao = `${str} ${identificadorNoTexto} segundos...`
        const elementoMensagem = document.getElementById(ID_MENSAGEM)
        const atualizarTexto = _ => { (elementoMensagem.innerHTML = textoPadrao.replace(identificadorNoTexto, tempoInicio--)) }
        atualizarTexto()
        const idIntervalo = setInterval(atualizarTexto, 1000);
        return idIntervalo
    }

    static iniciarContador() {
        const elementoContador = document.getElementById(ID_CONTADOR)
        const addSecond = _ => (elementoContador.innerHTML = segundos++)
        addSecond()
        startTimer = setInterval(addSecond, 1000);
    }

    static mudarFim(tm) {
        const elementoFim = document.getElementById(ID_FIM)
        elementoFim.innerHTML = tm
    }

    static pararContador(str) {
        clearInterval(startTimer)
        document.getElementById(ID_MENSAGEM).innerHTML = str
        document.getElementById(ID_BOTAO_JOGAR).classList.remove(CLASSE_INATIVO)
        if (str === "FIM") {
            const conteudo = document.getElementById(ID_CONTEUDO)
            conteudo.innerHTML = `
            <img src = "./icones/fim.gif" width="340" height="240">
            `
        }
    }

    static zerarContador() {
        const elementoContador = document.getElementById(ID_CONTADOR)
        elementoContador.innerHTML = 0
    }

    static limparContagemRegressiva(idContador) {
        clearInterval(idContador)
        document.getElementById(ID_MENSAGEM).innerHTML = "________ Tempo ___ Limite"
    }

    static configurarBotaoJogar(funcaoOnclick) {
        const btnJogar = document.getElementById(ID_BOTAO_JOGAR)
        btnJogar.onclick = funcaoOnclick

    }

    static configurarClique(funcaoOnclick) {
        window.verificarClique = funcaoOnclick
    }
}

