
class JogoDaMemoria {


    constructor({ tela, util }) {
        this.tela = tela
        this.util = util

        this.iconePadrao = './icones/default.gif'
        this.iconesIniciais = [
            { img: './icones/1.gif', nome: '1' },
            { img: './icones/2.gif', nome: '2' },
            { img: './icones/3.gif', nome: '3' },
            { img: './icones/4.gif', nome: '4' },
            { img: './icones/5.gif', nome: '5' },
            { img: './icones/6.gif', nome: '6' },
            { img: './icones/7.gif', nome: '7' },
            { img: './icones/8.gif', nome: '8' },
            { img: './icones/9.gif', nome: '9' },
            { img: './icones/10.gif', nome: '10' },


        ]

        this.iconesEscondidos = []
        this.iconesSelecionados = []
    }

    inicializar() {
        this.tela.atualizarIcones(this.iconesIniciais)
        // quando essa função executar, vai ignorar o this de window 
        // ela vai usar o this dessa tela
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarClickVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarIconesEscondidos.bind(this))

    }
    esconderIcones(icones) {
        const iconesOcultos = icones.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))

        this.tela.atualizarIcones(iconesOcultos)
        this.iconesEscondidos = iconesOcultos
    }

    exibirIcones(nomeIcone) {
        const { img } = this.iconesIniciais.find(({ nome }) => nomeIcone === nome)
        this.tela.exibirIcones(nomeIcone, img)
    }

    verificarSelecao(id, nome) {
        const item = { id, nome }
        // alert(`Olá: ${nome}, id: ${id}`)
        const iconesSelecionados = this.iconesSelecionados.length
        switch (iconesSelecionados) {
            case 0:
                this.iconesSelecionados.push(item)
                break;
            case 1:
                const [opcao1] = this.iconesSelecionados
                // zerar itens, para nao selecionar mais de dois
                this.iconesSelecionados = []
                let deveMostrarMensagem = false
                if (opcao1.nome === item.nome && opcao1.id !== id) {
                    deveMostrarMensagem = true
                    this.exibirIcones(item.nome)
                    this.tela.exibirMensagem(true)
                    return;
                }
                this.tela.exibirMensagem(false)
                break;
        }
    }
    mostrarIconesEscondidos() {
        const iconesEscondidos = this.iconesEscondidos
        for (const icone of iconesEscondidos) {
            const { img } = this.iconesIniciais.find(item => item.nome === icone.nome)
            icone.img = img
        }
        this.tela.atualizarIcones(iconesEscondidos)
    }
    async embaralhar() {
        const copias = this.iconesIniciais

            // duplicar os itens
            .concat(this.iconesIniciais)
            // entrar em cada um dos itens e gerar um id para cada
            .map((item) => {
                return Object.assign({}, item, { id: (Math.random() / 0.5) })
            })
            // ordenar
            .sort(() => Math.random() - 0.5)

        this.tela.atualizarIcones(copias)
        this.tela.exibirCarregando()

        const idIntervalo = this.tela.iniciarContador()
        await this.util.timeout(20000);
        this.tela.limparContador(idIntervalo)

        this.esconderIcones(copias)
        this.tela.exibirCarregando(false)

    }

    jogar() {
        this.embaralhar()
    }

}
