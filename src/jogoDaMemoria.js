class JogoDaMemoria {
    // 3o importar a tela como dependencia
    // iria funcionar sem importar chamando a variavel Tela global
    // mas não é uma boa prática, a melhor prática é obter esse valor por dependencia
    // depois usar a partir do this
    
    constructor({ tela }) {
        this.tela = tela
        this.util = util
        this.iconePadrao = './imagens/0.gif'
        this.numerosIniciais = [
            // relativo ao index.html pois será carregado lá
            { img: './imagens/1.gif', nome: '1'},
            { img: './imagens/2.gif', nome: '2'},
            { img: './imagens/3.gif', nome: '3'},
            { img: './imagens/4.gif', nome: '4'},
            { img: './imagens/5.gif', nome: '5'},
            { img: './imagens/6.gif', nome: '6'},
            { img: './imagens/7.gif', nome: '7'},
            { img: './imagens/8.gif', nome: '8'},
            { img: './imagens/9.gif', nome: '9'},
            { img: './imagens/10.gif', nome: '10'},
        ]
        
        this.numerosEscondidos = []
        this.numerosSelecionados = []
    }

    // 1o -para usar o this, nao podemos usar o static
    inicializar() {
        // 2o - vamos precisar importar a tela para fazer alterações nela
        // 3o - chamar a funcao de tela apara atualizar as imagens
        this.tela.atualizarImagens(this.numerosIniciais)
        //força a tela a usar o This de JogoDaMemoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarClickVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarNumerosEscondidos.bind(this))
    }
    async embaralhar() {
        const copias = this.numerosIniciais
        // duplicar os itens
        .concat(this.numerosIniciais)
        // entrar em cada item e criar um id aleatorio
        .map(item => {
            return Object.assign({}, item, { id: Math.random() / 0.5})
        })
        //ordenar aleatoriamente
        .sort(() => Math.random() - 0.5)

        this.tela.atualizarImagens(copias)
       // this.tela.exibirCarregando()


        const idIntervalo = this.tela.iniciarContador()
        await this.util.timeout(3000);
        this.tela.limparContador(idIntervalo)

        this.esconderNumeros(copias)
        //this.tela.exibirCarregando(false)
      
    }
    esconderNumeros(numeros) {
        // vamos trocar a imagem de todos os numeros existentes
        // pelo icone padrao 0
        // como fizemos no construtor, vamos extrair somente o necessario
        // usando a sintaxe ({ chave: 1 }) estamos falando que vamos retornar
        // o que tiver dentro dos parenteses
        // quando nao usamos : (exemplo do id), o JS entende que o nome
        // é o mesmo do valor. Ex. id, vira id,
        const numerosOcultos = numeros.map(( { nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        // atualizamos a tela com os numeros ocultos
        this.tela.atualizarImagens(numerosOcultos)
        //guardamos os numeros para trabalhar com eles depois
        this.numerosEscondidos = numerosOcultos
    }
    exibirNumeros(nomeDoNumero) {
        // vamos procurar esse numero pelo nome em nossos numerosIniciais
        // vamos obter somente a imagem dele
        const { img } = this.numerosIniciais.find(({ nome }) => nomeDoNumero === nome)
        // vamos criar a funcao na tela, para exibir somente o numero selecionado
        this.tela.exibirNumeros(nomeDoNumero, img)
    }
    verificarSelecao(id, nome){
        const item = {id, nome }
        //alert(`Olá: ${item.id}, ${item.nome}`)
        const numerosSelecionados = this.numerosSelecionados.length
        switch(numerosSelecionados) {
            case 0: 
                // adiciona a escolha na lista e espera o proximo clique
                this.numerosSelecionados.push(item)
                break;
            case 1: 
                const [ opcao1 ] = this.numerosSelecionados
                // zerar itens, para nao selecionar mais de dois
                this.numerosSelecionados = []
                let deveMostrarMensagem = false
                if(opcao1.nome === item.nome && opcao1.id !== id) {
                   deveMostrarMensagem = true 
                   // alert('combinação correta!')
                    this.exibirNumeros(item.nome)
                    this.tela.exibirMensagem(true)
                    return;
                }
                //alert('combinação incorreta!')
                this.tela.exibirMensagem(false)
                break;
        }
    }
    mostrarNumerosEscondidos() {
        const numerosEscondidos = this.numerosEscondidos
        for (const numero of numerosEscondidos) {
            const { img } = this.numerosIniciais.find(item => item.nome === numero.nome)
            numero.img = img
        }
        this.tela.atualizarImagens(numerosEscondidos)
    }

    jogar() {
        this.embaralhar()
    }

}