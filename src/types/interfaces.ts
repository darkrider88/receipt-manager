export interface IAuthRequest {
    grant_type: string;
    scope: string;
    username: string;
    password: string
}

export interface IAuthResponse {
    access_token: string;
    token_type: 'bearer';
    refresh_token: string;
    scope: string;
    token_auth_type: string
}


export interface ReceiptLine {
  /** European Article Number - the barcode of item purchased */
  ean?: string;

  /** The text on the receipt */
  receiptText: string;

  /** Amount after deduction of promotion. Gross - Net should equal promotion. */
  amountNet: number;

  /** Total amount of discount/promotion on the item/items */
  amountPromotion: number;

  /** Total receipt line amount before deduction of promotion */
  amountGross: number;

  /** Number of items bought in this purchase. */
  count: number;

  /** The price of a single unit (before promotion is applied). */
  pricePrUnit: number;
}


export interface Receipt {
  /** The time of purchase */
  purchaseTimeUTC: Date;

  /** The receipts lines. */
  receiptLines: ReceiptLine[];

  /** ID used to identify the receipt by the source. */
  sourceReceiptId: string;

  /** The name of the store chain where this receipt was retrieved from. */
  storeChain: string;

  /**
   * Total promotion value.
   * In most cases this can be calculated by summing promotions across receipt lines but due to
   * particularities in certain sources this will not always be the case.
   */
  totalPromotion: number;

  /** Total amount calculated by summing receiptLines. */
  totalGross: number;

  /** Total amount calculated by summing receiptLines after promotion. */
  totalNet: number;
}
