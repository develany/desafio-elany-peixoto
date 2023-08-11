import { Cardapio } from "./cardapio";

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        const itensExtrasRelacionados = {
            'queijo': 'sanduiche',
            'chantily': 'cafe'
        };
        let valorTotal = 0

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!"
        }

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');
            const item = Cardapio.find(item => item.codigo === codigo);
            if (!item) {
                return "Item inválido!";
            }

            if (!parseInt(quantidade)) {
                return "Quantidade inválida!";
            }

            if (itemInfo.includes(',')) {
                const [itemCodigo, _] = itemInfo.split(',');

                if (itensExtrasRelacionados[itemCodigo]) {
                    const itemPrincipal = itensExtrasRelacionados[itemCodigo];
                    if (!itens.some(item => item.split(',')[0] === itemPrincipal)) {
                        return `Item extra não pode ser pedido sem o principal`;
                    }
                }
            }
            valorTotal += item.valor * parseInt(quantidade);
        }
        if (metodoDePagamento === 'debito') {
            valorTotal = valorTotal
        } else if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // 5% de desconto
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03; // 3% de acréscimo
        } else {
            return "Forma de pagamento inválida!"
        }

        const valorTotalFormatado = `R$ ${valorTotal.toFixed(2).replace(".", ',')}`;
        return valorTotalFormatado;
    }

}

export { CaixaDaLanchonete };
