var btnADD = document.getElementById("btnAdd");
var btnCancelar = document.getElementById("btnCancelar");

class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validarCampos(produto)); {
            this.adicionar(produto)
        }

        this.listaTabela();

    }

    listaTabela(){
        let tbody= document.getElementById('tbody');
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acao = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].valorProduto;

            td_id.classList.add('center');

            let imgEditar = document.createElement('img');
            imgEditar.src = 'img/edit.png'

            let imgDeletar = document.createElement('img');
            imgDeletar.src = 'img/delete.png'

            td_acao.appendChild(imgEditar);
            td_acao.appendChild(imgDeletar)
        }
    }

    adicionar(produto){
        this.arrayProdutos.push(produto);
        this.id++;
    }

    lerDados() {
        let produto = {}

        produto.id = this.id
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valorProduto = document.getElementById('valorProduto').value;

        return produto;
    }

    validarCampos(produto) {
        let msg = '';
        if (produto.nomeProduto == '') {
            msg += '- Erro! Por favor informe o nome do Produto! \n';
        }
        if (produto.valorProduto == '') {
            msg += '- Erro! Por favor informe o valor do Produto! \n';
        }

        if (msg != '') {
            alert(msg)
            return false
        }

        return true;
    }

    cancelar(){
        document.getElementById('produto').value = '';
        document.getElementById('valorProduto').value = '';
    }
}

var produto = new Produto;

btnADD.addEventListener('click', () => {
    produto.salvar();
});

btnCancelar.addEventListener('click', () => {
    produto.cancelar();
});

