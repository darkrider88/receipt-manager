import { ReceiptController } from "./src/controller/receipt.controller";

async function main() {
    console.log('------- Welcome to Receipt Manager Service - Numerator ---------');
    console.log('Here you can fetch receipts of your orders');
    console.log('Please enter the below details to get details');
    await new ReceiptController().init()

}

main();