class JogoDaMemoria {

    constructor({ tela, util }) {
        this.tela = tela
        this.util = util

        this.iconePadrao = './icones/default.gif'
        this.iconesOcultosCopia = []
        this.iconesClicados = []
        this.iconesPares = []

        this.tempoFim
        this.acertos
        this.podeJogar
        this.deNovo = true
        this.path = "1"
        this.nivel = 1
    }

    inicializar() {
        this.tela.atualizarIcones(this.path, iconesIniciais)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarClique(this.verificarClique.bind(this))
    }

    ocultarIcones(icones) {
        const iconesOcultos = icones.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        this.tela.atualizarIcones(this.path, iconesOcultos)
        this.iconesOcultosCopia = iconesOcultos
    }

    async verificarClique(id, nome) {
        if (segundos > this.tempoFim) {
            this.tela.pararContador("TEMPO ESGOTADO")
            this.podeJogar = false
            this.deNovo = true
        }
        if (this.podeJogar) {
            const item = { id, nome }
            const iconesClicados = this.iconesClicados.length
            switch (iconesClicados) {
                case 0:
                    if (this.iconesPares.includes(nome)) {
                        return
                    }
                    this.iconesClicados.push(item)
                    this.mostrariconesOcultosCopia(item.id, item.nome, 0)
                    break;
                case 1:
                    if (this.iconesPares.includes(nome)) {
                        return
                    }
                    const [opcao1] = this.iconesClicados
                    this.iconesClicados = []
                    if (opcao1.nome === item.nome && opcao1.id === id) {
                        this.mostrariconesOcultosCopia(opcao1.id, opcao1.nome, 1)
                        return
                    }
                    else if (opcao1.nome === item.nome && opcao1.id !== id) {
                        this.iconesPares.push(item.nome)
                        this.mostrariconesOcultosCopia(item.id, item.nome, 0)
                        this.acertos++
                        if (this.acertos === 10) {
                            this.nivel++
                            if (this.nivel === 9) {
                                this.nivel = 1
                                this.path = this.nivel.toString()
                                this.podeJogar = false
                                this.deNovo = true
                                inicio = 0
                                this.tela.pararContador("FIM")
                            }
                            this.tela.pararContador("PASSOU!")
                            this.path = this.nivel.toString()
                            this.deNovo = true
                            return
                        }
                        this.tempoFim += 3
                        this.tela.mudarFim(this.tempoFim)
                        return;
                    }
                    this.mostrariconesOcultosCopia(item.id, item.nome, 2)
                    await this.util.timeout(200)
                    this.mostrariconesOcultosCopia(opcao1.id, opcao1.nome, 1)
                    this.mostrariconesOcultosCopia(item.id, item.nome, 1)
                    break;
            }
        }
    }

    mostrariconesOcultosCopia(id, nome, par) {
        const iconesExibidos = this.iconesOcultosCopia
        for (const icone of iconesExibidos) {
            const { img } = iconesIniciais.find(item => item.nome === icone.nome)
            if (icone.nome === nome && icone.id == id) {
                icone.img = img
                if (par === 1) {
                    icone.img = this.iconePadrao
                }
                else if (par === 2) {
                    icone.img = img
                }
            }
        }
        this.tela.atualizarIcones(this.path, iconesExibidos)
    }

    async embaralhar() {
        this.tela.atualizarIcones(this.path, iconesIniciais)
        const copias = iconesIniciais
            .concat(iconesIniciais)
            .map((item) => {
                return Object.assign({}, item, { id: (Math.random() / 0.5) })
            })
            .sort(() => Math.random() - 0.5)

        this.tela.atualizarIcones(this.path, copias)
        this.iconesPares = []
        this.acertos = 0
        this.podeJogar = false
        segundos = 0
        this.tela.pararContador(" START ")
        this.tela.zerarContador()
        this.tempoFim = 9
        this.tela.mudarFim(this.tempoFim)
        this.deNovo = false
        let tempo = 3
        const idIntervalo = this.tela.mostrarContagemRegressiva('Iniciando em ', tempo)
        await this.util.timeout(1000 * tempo);
        this.tela.limparContagemRegressiva(idIntervalo)
        this.ocultarIcones(copias)
        this.podeJogar = true
        this.tela.iniciarContador()
    }

    jogar() {
        inicio = 1
        if (this.deNovo)
            this.embaralhar()
    }
}
