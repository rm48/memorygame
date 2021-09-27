
class JogoDaMemoria {


    constructor({ tela, util }) {
        this.tela = tela
        this.util = util

        this.iconePadrao = './arquivos/default.gif'
        this.heroisIniciais = [
            { img: './arquivos/1.gif', nome: '1' },
            { img: './arquivos/2.gif', nome: '2' },
            { img: './arquivos/3.gif', nome: '3' },
            { img: './arquivos/4.gif', nome: '4' },
            { img: './arquivos/5.gif', nome: '5' },
            { img: './arquivos/6.gif', nome: '6' },
            { img: './arquivos/7.gif', nome: '7' },
            { img: './arquivos/8.gif', nome: '8' },
            { img: './arquivos/9.gif', nome: '9' },
            { img: './arquivos/10.gif', nome: '10' },


        ]

        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }

    inicializar() {
        this.tela.atualizarImagens(this.heroisIniciais)
        // quando essa função executar, vai ignorar o this de window 
        // ela vai usar o this dessa tela
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarClickVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))

    }
    esconderHerois(herois) {
        const heroisOcultos = herois.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))

        this.tela.atualizarImagens(heroisOcultos)
        this.heroisEscondidos = heroisOcultos
    }

    exibirHerois(nomeHeroi) {
        const { img } = this.heroisIniciais.find(({ nome }) => nomeHeroi === nome)
        this.tela.exibirHerois(nomeHeroi, img)
    }

    verificarSelecao(id, nome) {
        const item = { id, nome }
        // alert(`Olá: ${nome}, id: ${id}`)
        const heroisSelecionados = this.heroisSelecionados.length
        switch (heroisSelecionados) {
            case 0:
                this.heroisSelecionados.push(item)
                break;
            case 1:
                const [opcao1] = this.heroisSelecionados
                // zerar itens, para nao selecionar mais de dois
                this.heroisSelecionados = []
                let deveMostrarMensagem = false
                if (opcao1.nome === item.nome && opcao1.id !== id) {
                    deveMostrarMensagem = true
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem(true)
                    return;
                }
                this.tela.exibirMensagem(false)
                break;
        }
    }
    mostrarHeroisEscondidos() {
        const heroisEscondidos = this.heroisEscondidos
        for (const heroi of heroisEscondidos) {
            const { img } = this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }
    async embaralhar() {
        const copias = this.heroisIniciais

            // duplicar os itens
            .concat(this.heroisIniciais)
            // entrar em cada um dos itens e gerar um id para cada
            .map((item) => {
                return Object.assign({}, item, { id: (Math.random() / 0.5) })
            })
            // ordenar
            .sort(() => Math.random() - 0.5)

        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idIntervalo = this.tela.iniciarContador()
        await this.util.timeout(3000);
        this.tela.limparContador(idIntervalo)

        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)

    }

    jogar() {
        this.embaralhar()
    }

}