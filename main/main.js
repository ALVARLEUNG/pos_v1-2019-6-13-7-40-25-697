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
    let itemList = [];
    // goodsBarcodeList.forEach(item => {
    //     if (cartItems.indexOf(item.barcode) >= 0) {
    //         if (itemList.length != 0) {
    //             for (let i = 0; i < itemList.length; i++) {
    //                 if (itemList[i].barcode === item) {
    //                     itemList[i].count++;
    //                     break;
    //                 } else {
    //                     itemList.push({
    //                         barcode: item.barcode,
    //                         name: item.name,
    //                         unit: item.unit,
    //                         price: item.price,
    //                         count: 0,
    //                         promotion: '',
    //                         cost: 0.0
    //                     });
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // });
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
    itemList.forEach(item => {
        if (item.type === 'BUY_TWO_GET_ONE_FREE') {
            item.cost = item.count * item.price - parseInt(item.count / 2) * item.price;
        } else {
            item.cost = item.count * item.price;
        }
    });
    return itemList;
};

const getTotalPrice = (priceList) => {
    return priceList.reduce((acc, cur) => {
        return acc + cur
    }, 0);
};


const calculatePrice = (itemList) => {
    let result = getItemPromotion(itemList);
    let sum = getTotalPrice(itemList.map(item => {
        return item.price
    }));
    return {result, sum};
};

const getReceipt = (result) => {
    let resultReceipt = '***<没钱赚商店>收据***\n';
    let itemList = result.result;
    let sum = 0;
    itemList.forEach(item => {
        resultReceipt += `名称：${item.name}，数量：${item.count},${item.unit}，单价：${item.price}(元)，小计：${item.cost}\n`;
        sum += item.price * item.count;
    });
    resultReceipt += `----------------------\n总计:${result.sum}(元)\n节省:${sum - result.sum}(元)\n`;
    resultReceipt += '**********************';
    return resultReceipt;
};


const printReceipt = (cartItems) => {
    cartItems.forEach(item => {
        if (isCartItemValid(item)) return 'have wrong barcode!';
    })
    let itemList = getItemList(cartItems);
    let result = calculateItemCost(itemList);
    let receipt = getReceipt(result);

    return receipt;
};
