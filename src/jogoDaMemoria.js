class JogoDaMemoria {
    // 3o importar a tela como dependencia
    // iria funcionar sem importar chamando a variavel Tela global
    // mas não é uma boa prática, a melhor prática é obter esse valor por dependencia
    // depois usar a partir do this
    
    constructor({ tela }) {
        this.tela = tela
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
        
    }

    // 1o -para usar o this, nao podemos usar o static
    inicializar() {
        // 2o - vamos precisar importar a tela para fazer alterações nela
        // 3o - chamar a funcao de tela apara atualizar as imagens
        this.tela.atualizarImagens(this.numerosIniciais)
        //força a tela a usar o This de JogoDaMemoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        
    }
    embaralhar() {
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
        // vamos esperar 1 segundo para atualizar a tela
        setTimeout(() => {
            this.esconderNumeros(copias)
        }, 1000);
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
        this.numerosOcultos = numerosOcultos
    }
    jogar() {
        this.embaralhar()
    }

}