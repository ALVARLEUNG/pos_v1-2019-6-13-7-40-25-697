'use strict';

describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(printReceipt(tags)).toEqual(expectText);
  });


  it('should return true when call isCartItemValid', () => {
    const tags = [
      'ITEM000001'
    ];
    expect(isCartItemValid(tags)).toBe(true);
  });

  it('should return itemList when call getItemList', () => {
    const tags = [
      'ITEM000001'
    ];

    const result = [
        {barcode: "ITEM000001",
            cost: 0,
            count: 1,
            name: "雪碧",
            price: "3.00",
            promotion: "",
            unit: "瓶"}];
    expect(getItemList(tags)).toEqual(result);
  });

    it('should return itemPromotion when call getItemPromotion', () => {
        const tags = [
            {barcode: "ITEM000001",
                cost: 0,
                count: 1,
                name: "雪碧",
                price: "3.00",
                promotion: "BUY_TWO_GET_ONE_FREE",
                unit: "瓶"}];

        const result = [
            {barcode: "ITEM000001",
                cost: 0,
                count: 1,
                name: "雪碧",
                price: "3.00",
                promotion: "BUY_TWO_GET_ONE_FREE",
                unit: "瓶"}];
        expect(getItemPromotion(tags)).toEqual(result);
    });

    it('should return ItemList when call calculateItemCost', () => {
        const tags = [
            {barcode: "ITEM000001",
                cost: 0,
                count: 2,
                name: "雪碧",
                price: "3.00",
                promotion: "BUY_TWO_GET_ONE_FREE",
                unit: "瓶"}];

        const result = [
            {barcode: "ITEM000001",
                cost: "6.00",
                count: 2,
                name: "雪碧",
                price: "3.00",
                promotion: "BUY_TWO_GET_ONE_FREE",
                unit: "瓶"}];
        expect(calculateItemCost(tags)).toEqual(result);
    });

});
