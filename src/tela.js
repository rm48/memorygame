const ID_BOTAO_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const ID_FIM = "fim"
const ID_CONTEUDO = "conteudo"
const ID_PREPARANDO = "preparando"
//const CLASSE_INVISIVEL = "invisible"
const ID_PREPARADOR = "preparador"



class Tela {

    static obterCodigoHtml(item) {
        return `   
            <span   onclick="window.verificarClique('${item.id}', '${item.nome}')">
                <img name="${item.nome}" src="${item.img}" class="icone" alt="${item.nome}" />
            </span>  
        `
    }

    static alterarConteudoHTML(codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }

    static gerarStringHTMLPelaImagem(data) {
        return data.map(Tela.obterCodigoHtml).join('')
    }

    static exibirMensagem() {
        const elemento = document.getElementById(ID_MENSAGEM)
        elemento.innerText = textoTempo
    }

    static iniciarPreparador(str, tm) {
        let tempoInicio = tm
        const identificadorNoTexto = "$$contagem"
        const textoPadrao = `${str} ${identificadorNoTexto} segundos...`
        const elementoPreparador = document.getElementById(ID_PREPARADOR)
        const atualizarTexto = _ => { (elementoPreparador.innerHTML = textoPadrao.replace(identificadorNoTexto, tempoInicio--)) }
        atualizarTexto()
        const idIntervalo = setInterval(atualizarTexto, 1000);
        return idIntervalo
    }

    static mostrarFim(str) {
        document.getElementById(ID_PREPARADOR).innerHTML = str
    }

    static iniciarContador() {
        const elementoContador = document.getElementById(ID_MENSAGEM)
        const addSecond = _ => (elementoContador.innerHTML = segundos++)
        addSecond()
        startTimer = setInterval(addSecond, 1000);
        textoTempo = `${segundos}`
    }

    static mudarFim() {
        const elementoFim = document.getElementById(ID_FIM)
        elementoFim.innerHTML = tempoFim
    }

    static pararContador() {
        clearInterval(startTimer)
        textoTempo = '0'
        podeJogar = false
        document.getElementById(ID_PREPARADOR).innerHTML = "TEMPO ESGOTADO"
    }

    static limparPreparador(idContador) {
        clearInterval(idContador)
        document.getElementById(ID_PREPARADOR).innerHTML = "________ Tempo ___ Limite"
    }

    static exibirMensagem() { //mostrar = true) {
        const elementoContador = document.getElementById(ID_MENSAGEM)
        elementoContador.innerHTML = tempoFim
        //this.exibirMensagem(true)
        const prepara = document.getElementById(ID_PREPARANDO)
        //if (mostrar) {
        //      prepara.classList.remove(CLASSE_INVISIVEL)
        //     return
        //  }
        //  prepara.classList.add(CLASSE_INVISIVEL)
    }

    static atualizarIcones(itens) {
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    static exibirIcones(nome, img) {
        const elements = document.getElementsByName(nome)
        elements.forEach(item => (item.src = img))
    }

    static configurarBotaoJogar(funcaoOnclick) {
        const btnJogar = document.getElementById(ID_BOTAO_JOGAR)
        btnJogar.onclick = funcaoOnclick
    }

    static configurarClickVerificarClique(funcaoOnclick) {
        window.verificarClique = funcaoOnclick
    }
}

