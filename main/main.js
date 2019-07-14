'use strict';
//TODO: 请在该文件中实现练习要求并删除此注释

const isCartItemValid = (cartItem) => {
    let isValid = false;
    let goodsBarcodeList = loadAllItems().map(item => {
        item.barcode
    });
    goodsBarcodeList.includes(cartItem) < 0 ? isValid = false : isValid = true;
    return isValid

};

const getItemList = (cartItems) => {
    let goodsBarcodeList = loadAllItems();
    let cartList = [];
    let itemList = [];
    cartItems.forEach(barcode => {
        let index = barcode.indexOf('-');
        let subBarcode = '';
        if (index > -1) {
            subBarcode = barcode.substring(0, index);
            if (cartList[subBarcode]) {
                cartList[subBarcode] += parseFloat(barcode.substring(index + 1));
            } else cartList[subBarcode] = parseFloat(barcode.substring(index + 1));
        } else if (index === -1) {
            if (cartList[barcode]) {
                cartList[barcode]++;
            } else cartList[barcode] = 1;
        }
    })
    goodsBarcodeList.forEach(item => {
        if (cartList[item.barcode]) {
            itemList.push({
                barcode: item.barcode,
                name: item.name,
                unit: item.unit,
                price: item.price.toFixed(2),
                count: cartList[item.barcode],
                promotion: '',
                cost: 0
            });
        }
    })
    return itemList;
};

const getItemPromotion = (itemList) => {
    let itemPromotion = loadPromotions();
    itemPromotion.forEach(promotion => {
        itemList.forEach(item => {
            if (promotion.barcodes.indexOf(item.barcode) >= 0) {
                item.promotion = promotion.type;
            }
        })
    });
    return itemList;
};

const calculateItemCost = (itemList) => {
    getItemPromotion(itemList).forEach(item => {
        if (item.promotion === 'BUY_TWO_GET_ONE_FREE') {
            item.cost = (item.count * item.price - parseInt(item.count / 3) * parseFloat(item.price)).toFixed(2);
        } else {
            item.cost = (item.count * parseInt(item.price)).toFixed(2);
        }
    });
    return itemList;
};

const getTotalPrice = (priceList) => {
    return priceList.reduce((acc, cur) => {
        return parseFloat(acc) + parseFloat(cur)
    }, 0);
};


const calculatePrice = (itemList) => {
    let sum = getTotalPrice(itemList.map(item => {
        return item.cost;
    }));
    return {itemList, sum};
};

const getReceipt = (result) => {
    let resultReceipt = '***<没钱赚商店>收据***\n';
    let itemList = result.itemList;
    let sum = 0;
    itemList.forEach(item => {
        resultReceipt += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.price}(元)，小计：${item.cost}(元)\n`;
        sum += item.price * item.count;
    });
    resultReceipt += `----------------------\n总计：${(result.sum).toFixed(2)}(元)\n节省：${(sum - result.sum).toFixed(2)}(元)\n`;
    resultReceipt += '**********************';
    return resultReceipt;
};


const printReceipt = (cartItems) => {
    cartItems.forEach(item => {
        if (isCartItemValid(item)) return 'have wrong barcode!';
    })
    let itemList = getItemList(cartItems);
    let resultList = calculateItemCost(itemList);
    let receipt = getReceipt(calculatePrice(resultList));

    return receipt;
};
