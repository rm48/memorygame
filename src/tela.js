// metodos estaticos nao podem acessar o 'this'
// por issom nao vamos colocar o util no construtor
const util = Util
const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
//const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const ID_BOTAO_MOSTRAR_TUDO = "mostrarTudo"
const MENSAGENS = {
    sucesso: {
        texto: 'Combinação correta!',
        classe: 'alert-success'
    },
    erro: {
        texto: 'Combinação incorreta!',
        classe: 'alert-danger'
    }
}
class Tela {
    static obterCodigoHtml(item) {
       return `
            <div class="card" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
                <img name="${item.nome}" src="${item.img}" class="bola" alt="${item.nome}" />
            </div>

        `
    }
    static configurarBotaoVerificaSelecao(funcaoOnClick){
        window.verificarSelecao = funcaoOnClick
    }

    static alterarConteudoHTML(codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }
    static gerarStringHTMLPelaImagem(itens) {
        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens) {
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnClick){
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }
    static configurarClickVerificarSelecao(funcaoOnclick) {
        window.verificarSelecao = funcaoOnclick
    }
    static exibirNumeros(nomeDoNumero, img) {
        const elementosHtml = document.getElementsByName(nomeDoNumero)
        // para cada elemento encontrado na tela, vamos alterar a imagem
        // para a imagem inicial dele

        elementosHtml.forEach(item => (item.src = img))
    }
    static async exibirMensagem(sucesso = true){
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso) {
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto
        }
        else {
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText = MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIVEL)
    }

    static iniciarContador() {
        let contarAte = 3
        const identificadorNoTexto = "$$contagem"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`
        const elementoContador = document.getElementById(ID_CONTADOR)
        
        // toda vez que executar, vai tirar 1 do contador
        const atualizarTexto = _ => 
            (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))
        
        atualizarTexto()

        // vai executar a cada segundo
        const idIntervalo = setInterval(atualizarTexto, 1000);
        return idIntervalo
         
    }
    static limparContador(idContador) {
        clearInterval(idContador)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    /*static exibirCarregando(mostrar = true) {
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar) {
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        carregando.classList.add(CLASSE_INVISIVEL)
    }*/

    static configurarBotaoMostrarTudo(funcaoOnclick) {
        const mostrarTudo = document.getElementById(ID_BOTAO_MOSTRAR_TUDO)
        mostrarTudo.onclick = funcaoOnclick
    }

}

