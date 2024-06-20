document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    const productForm = document.getElementById("product-form");
    const productList = document.getElementById("product-list");
    const btnNewProduct = document.getElementById("btn-new-product");
    const productsTableBody = document.querySelector("#products-table tbody");

    // Inicializar visibilidade
    productForm.style.display = "none";
    productList.style.display = "block";

    // Mostrar formulário de cadastro
    btnNewProduct.addEventListener("click", function() {
        productForm.style.display = "block";
        productList.style.display = "none";
    });

    // botão de enviar
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nome = form.nome.value;
        const descricao = form.descricao.value;
        const valor = parseFloat(form.valor.value);
        const disponivel = form.disponivel.value;
        
        const product = { nome, descricao, valor, disponivel };
        
        //Pega produtos existentes do amarzenamento local.
        let products = JSON.parse(localStorage.getItem("products")) || [];
        
        // Add novo produto
        products.push(product);
        
        //Salva itens no amarzenamento local
        localStorage.setItem("products", JSON.stringify(products));
        
        // Reseta o formulario
        form.reset();
        
        //Altera a exibição do campo de cadastro
        productForm.style.display = "none";
        productList.style.display = "block";
        
        // renderiza a lista
        renderProductList();
    });

    function renderProductList() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        
        // limpa as colunas existentes
        productsTableBody.innerHTML = "";
        
        // ordena produtos pelo valor
        products.sort((a, b) => a.valor - b.valor);
        
        // add colunas na tabela
        products.forEach(product => {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td");
            const valueCell = document.createElement("td");
            
            nameCell.textContent = product.nome;
            valueCell.textContent = product.valor.toFixed(2);
            
            row.appendChild(nameCell);
            row.appendChild(valueCell);
            
            productsTableBody.appendChild(row);
        });
    }
    
    // renderização inicial
    renderProductList();
});
