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
        this.iconesOcultosCopia = []
        this.iconesClicados = []
    }

    inicializar() {
        this.tela.atualizarIcones(this.iconesIniciais)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarClickVerificarClique(this.verificarClique.bind(this))
    }

    ocultarIcones(icones) {
        const iconesOcultos = icones.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        this.tela.atualizarIcones(iconesOcultos)
        this.iconesOcultosCopia = iconesOcultos
    }

    exibirIcones(nomeIcone) {
        const { img } = this.iconesIniciais.find(({ nome }) => nomeIcone === nome)
        this.tela.exibirIcones(nomeIcone, img)
    }

    async verificarClique(id, nome) {
        if (segundos > tempoFim) {
            this.tela.pararContador()
        }
        if (podeJogar) {
            const item = { id, nome }
            const iconesClicados = this.iconesClicados.length
            switch (iconesClicados) {
                case 0:
                    this.iconesClicados.push(item)
                    this.mostrariconesOcultosCopia(item.id, item.nome, jogada = 0)
                    break;
                case 1:
                    const [opcao1] = this.iconesClicados
                    this.iconesClicados = []
                    if (opcao1.nome === item.nome && opcao1.id === id) {
                        this.mostrariconesOcultosCopia(opcao1.id, opcao1.nome, jogada = 1)
                        return
                    }
                    else if (opcao1.nome === item.nome && opcao1.id !== id) {
                        //this.exibirIcones(item.nome)
                        this.mostrariconesOcultosCopia(item.id, item.nome, jogada)
                        acertos++
                        if (acertos === 10) {
                            podeJogar = false
                            clearInterval(startTimer)
                            this.tela.mostrarFim("VOCÊ VENCEU!")
                            return
                        }
                        jogada = 0
                        tempoFim += 5
                        this.tela.mudarFim()
                        return;
                    }
                    this.mostrariconesOcultosCopia(opcao1.id, opcao1.nome, jogada = 1)
                    break;
            }
        }
    }

    mostrariconesOcultosCopia(id, nome, par) {
        const iconesExibidos = this.iconesOcultosCopia
        for (const icone of iconesExibidos) {
            const { img } = this.iconesIniciais.find(item => item.nome === icone.nome)
            if (icone.nome === nome && icone.id == id) {
                icone.img = img
                if (par) {
                    icone.img = this.iconePadrao
                    jogada = 0
                }
            }
        }
        this.tela.atualizarIcones(iconesExibidos)
    }

    async embaralhar() {
        const copias = this.iconesIniciais
            .concat(this.iconesIniciais)
            .map((item) => {
                return Object.assign({}, item, { id: (Math.random() / 0.5) })
            })
            .sort(() => Math.random() - 0.5)

        this.tela.atualizarIcones(copias)
        acertos = 0
        podeJogar = false
        segundos = 0
        tempoFim = 10
        this.tela.mudarFim()
        this.tela.exibirMensagem()
        let tempo = 3;
        const idIntervalo = this.tela.iniciarPreparador('Iniciando em ', tempo)
        await this.util.timeout(1000 * tempo);
        this.tela.limparPreparador(idIntervalo)
        this.ocultarIcones(copias)
        podeJogar = true
        this.tela.iniciarContador()
        this.tela.mudarFim()
    }

    jogar() {
        this.tela.pararContador()
        this.embaralhar()
    }
}
