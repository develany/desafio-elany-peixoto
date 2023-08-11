import { Cardapio } from "./cardapio";

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        if (itens.lenght === 0) {
            return "Não há itens no carrinho de compra!"
        }

        let valorTotal = 0

        for (itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');
            const item = Cardapio.find(item => item.codigo === codigo);
            if (!item) {
                return "Item inválido!";

            }

            valorTotal += item.valor * parseInt(quantidade);

            if (itemInfo.includes(',') && !itens.includes(item.codigo)) {
                return "Item extra não pode ser pedido sem o principal";
            }

        }
        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // 5% de desconto
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03; // 3% de acréscimo
        }

        // Formatar o valor total e retornar
        const valorTotalFormatado = `R$ ${valorTotal.toFixed(2)}`;
        return valorTotalFormatado;
    }

}

export { CaixaDaLanchonete };
