document.addEventListener('DOMContentLoaded', () => {
    const formularioAdicionarItem = document.getElementById('addItemForm');
    const tabelaListaDeCompras = document.getElementById('listaDeCompras');

    formularioAdicionarItem.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const codigoDeBarra = document.getElementById('codigoDeBarra').value;
        const nomeDoItem = document.getElementById('nomeDoItem').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const novoItem = { codigoDeBarra, nomeDoItem, preco, comprado: false };

        lista.adicionar(novoItem);
        renderizarLista();
        formularioAdicionarItem.reset();
    });

    function renderizarLista() {
        const itens = lista.listar();
        tabelaListaDeCompras.innerHTML = '';

        itens.forEach((item) => {
            const linha = document.createElement('tr');

            const celulaCodigoDeBarra = document.createElement('td');
            celulaCodigoDeBarra.textContent = item.codigoDeBarra;
            linha.appendChild(celulaCodigoDeBarra);

            const celulaNomeDoItem = document.createElement('td');
            celulaNomeDoItem.textContent = item.nomeDoItem;
            linha.appendChild(celulaNomeDoItem);

            const celulaPreco = document.createElement('td');
            celulaPreco.textContent = item.preco;
            linha.appendChild(celulaPreco);

            const celulaComprado = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = item.comprado;
            checkbox.addEventListener('change', () => alternarCompra(item, checkbox));
            celulaComprado.appendChild(checkbox);
            linha.appendChild(celulaComprado);

            const celulaAcoes = document.createElement('td');
            const botaoRemover = criarBotao('Remover', () => removerItem(item.codigoDeBarra));

            celulaAcoes.appendChild(botaoRemover);

            linha.appendChild(celulaAcoes);

            tabelaListaDeCompras.appendChild(linha);
        });
    }

    function alternarCompra(item, checkbox) {
        if (item.comprado) {
            lista.desmarcar(item);
        } else {
            lista.marcar(item);
        }
        checkbox.checked = item.comprado;
        renderizarLista();
    }

    function criarBotao(texto, onClick) {
        const botao = document.createElement('button');
        botao.textContent = texto;
        botao.addEventListener('click', onClick);
        return botao;
    }

    window.marcarItem = (codigoDeBarra) => {
        const item = lista.itens.find((i) => i.codigoDeBarra === codigoDeBarra);
        if (item) {
            lista.marcar(item);
            renderizarLista();
        }
    };

    window.desmarcarItem = (codigoDeBarra) => {
        const item = lista.itens.find((i) => i.codigoDeBarra === codigoDeBarra);
        if (item) {
            lista.desmarcar(item);
            renderizarLista();
        }
    };

    window.removerItem = (codigoDeBarra) => {
        const item = lista.itens.find((i) => i.codigoDeBarra === codigoDeBarra);
        if (item) {
            lista.remover(item);
            renderizarLista();
        }
    };

    renderizarLista();
});