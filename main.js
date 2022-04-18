const input = document.getElementsByClassName("itemAdicionavel");
const botao = document.getElementsByClassName("addItemAdicionavel");
const lista = document.getElementById("lista");
const painelSoma = document.getElementById("painelSomatorio");
const btnLimparCache = document.getElementById("btnLimparCache");
var somaPreco = 0;
var meusItens;

//cria localstorage
var localData = localStorage.getItem("mercadoDev");

if(localData && localData.length > 0){
    meusItens = JSON.parse(localData);

    meusItens.forEach((meusItens, index, array) => {
        console.log(array);
        criaItemDeLista(array[index].nomeDoItem, array[index].valorItem);
    });

}
else{
    meusItens = [];
}
//limpeza do localstorage
btnLimparCache.addEventListener("click",(event)=>{
    
    localStorage.removeItem("mercadoDev");
    document.location.reload(true);

});

//cria variavel para ser adicionada na lista
botao[0].addEventListener("click",(event)=>{
    const valor = input[0].value;
    if(valor && valor.length > 0){
        criaItemDeLista(valor, 0);
    }else{
        alert("Escreva algo");
    }
    input[0].value = '';
})

//cria lista de compra
function criaItemDeLista(nomeDoItem, valorItem){
    const li = document.createElement("li");
    lista.append(li);
    li.classList.add("listaDeCadaItem");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("classeCheckboxItem");

    const btnExcluir = document.createElement("button");
    btnExcluir.innerText = "X";
    btnExcluir.classList.add("BotaoDeExcluir");

    const texto = document.createElement("span");
    texto.innerText = nomeDoItem;
    texto.classList.add("TextoNaLista");

    li.append(checkbox);
    li.append(texto);
    li.append(btnExcluir);

    //faz a lógica set do checkbox e tacha o item
    checkbox.addEventListener("click",(e)=>{

        if(texto.style.textDecoration =="line-through"){
            checkbox.checked = "true";
        }else{
            texto.style.textDecoration = "line-through";
            popup.style.display = "block";
        }
    })

    //cria os elementos html de lista, input e button para adicionar preco
    const popup = document.createElement("li");
    popup.style.display = "none";
    lista.append(popup);

    const valorDoItem = document.createElement("input");
    valorDoItem.type = "number";
    valorDoItem.placeholder = "Digite o valor";
    valorDoItem.classList.add("BotaoAddValor");
    
    const botaoFinaliza = document.createElement("button");
    botaoFinaliza.innerText = "Inserir Preço";
    botaoFinaliza.classList.add("botaoValorProduto");

    //logica para armazenar preco do item
    if(valorItem && valorItem.length > 0){

        valorDoItem.value = valorItem;

    }

    popup.append(valorDoItem);
    popup.append(botaoFinaliza);
    
    //exclue os itens e faz a subtração
    btnExcluir.onclick = ()=>{
        li.remove();
        valorDoItem.remove();
        botaoFinaliza.remove();
        popup.remove();
        if (isNaN(parseFloat(valorDoItem.value))){
            valorDoItem.value = 0;
        }
        somaPreco = somaPreco - parseFloat(valorDoItem.value);
        painelSoma.innerText = " Valor Total " + somaPreco;

        var filtered = meusItens.filter(function(el) { return el.nomeDoItem != nomeDoItem; });
        localStorage.setItem("mercadoDev", JSON.stringify(filtered));
    }

    //adiciona os itens e faz o calculo de soma
    botaoFinaliza.addEventListener("click", ()=>{
        popup.style.display = "none";
        const preco = document.createElement("span");
        preco.classList.add("PrecoDoLadoDoItem");
        preco.innerText = " R$ " + valorDoItem.value;
        texto.insertAdjacentElement("afterend", preco);
        somaPreco = somaPreco + parseFloat(valorDoItem.value);
        painelSoma.innerText = " Valor Total das Compras: " + somaPreco;

        var obj = { nomeDoItem: nomeDoItem, valorItem: valorDoItem.value };
        console.log(obj);

        if(!valorItem){
            meusItens.push(obj);
            localStorage.setItem("mercadoDev", JSON.stringify(meusItens));
        }

    });

    if(valorItem && valorItem.length > 0){

        botaoFinaliza.click();

    }

}