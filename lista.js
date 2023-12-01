const lista = {
    itens: [],

    adicionar(item) {
        this.itens.push(item);
        this.atualizarLocalStorage();
    },

    remover(item) {
        const indice = this.itens.findIndex((i) => i.codigoDeBarra === item.codigoDeBarra);
        if (indice !== -1) {
            this.itens.splice(indice, 1);
            this.atualizarLocalStorage();
        }
    },

    marcar(item) {
        const indice = this.itens.findIndex((i) => i.codigoDeBarra === item.codigoDeBarra);
        if (indice !== -1) {
            this.itens[indice].comprado = true;
            this.atualizarLocalStorage();
        }
    },

    desmarcar(item) {
        const indice = this.itens.findIndex((i) => i.codigoDeBarra === item.codigoDeBarra);
        if (indice !== -1) {
            this.itens[indice].comprado = false;
            this.atualizarLocalStorage();
        }
    },

    listar() {
        return this.itens;
    },

    atualizarLocalStorage() {
        localStorage.setItem('listaDeCompras', JSON.stringify(this.itens));
    },

    carregarLocalStorage() {
        const itensArmazenados = JSON.parse(localStorage.getItem('listaDeCompras')) || [];
        this.itens = itensArmazenados;
    },
};

lista.carregarLocalStorage();