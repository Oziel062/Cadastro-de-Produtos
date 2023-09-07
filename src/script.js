var btnADD = document.getElementById("btnAdd");
var btnCancelar = document.getElementById("btnCancelar");

class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validarCampos(produto)) {
            if (this.editId == null) {
            this.adicionar(produto);
            } else{
                this.atualizar(this.editId, produto);
            }


        }

        this.listaTabela();
        this.limpar()

    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = ''

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acao = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText ="R$ " + this.arrayProdutos[i].valorProduto;

            td_id.classList.add('center');

            let imgEditar = document.createElement('img');
            imgEditar.src = './assets/editar.svg';
            imgEditar.setAttribute("onclick", "produto.edicao(" + JSON.stringify(this.arrayProdutos[i]) + ")");
            imgEditar.style.cursor = 'pointer';

            let imgDeletar = document.createElement('img');
            imgDeletar.src = './assets/excluir-black.svg';
            imgDeletar.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");
            imgDeletar.style.cursor = 'pointer';


            td_acao.appendChild(imgEditar);
            td_acao.appendChild(imgDeletar)
        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
        this.id++;

        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                var notification = new Notification("Produto cadastrado com Sucesso!", {
                    body: "Sucesso! Seu produto foi adicionado a lista de cadastrados!",
                    icon: "./assets/check-fat.svg"
                });
            }
        });
    }

    atualizar(id, produto){
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valorProduto = produto.valorProduto;
            }
        }
    }

    edicao(dados) {
    this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valorProduto').value = dados.valorProduto;

        document.getElementById('btnAdd').innerText = "Atualizar";
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

    limpar() {
        document.getElementById('produto').value = '';
        document.getElementById('valorProduto').value = '';

        document.getElementById('btnAdd').innerText = 'Salvar'
        this.editId = null
    }

    deletar(id) {
        if (confirm('Deseja deletar o produto do ID ' + id + " ?")) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1)
                    tbody.deleteRow(i)
                }
            }

            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    var notification = new Notification("Produto deletado com Sucesso!", {
                        body: "Sucesso! Seu produto foi deletado da lista de cadastrados!",
                        icon: "./assets/excluir.svg"
                    });
                }
            });
        }

        

    }

}

var produto = new Produto;

btnADD.addEventListener('click', () => {
    produto.salvar();
});

btnCancelar.addEventListener('click', () => {
    produto.limpar();
});

