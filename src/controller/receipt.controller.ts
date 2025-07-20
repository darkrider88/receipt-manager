import readline from "readline";
import { ReceiptService } from "../services/receipt.service";
import { ReceiptStore } from "../services/receipt-store.service";
import type { IReceipt } from "../types/interfaces";

interface IUserData {username: string, password: string, receiptId: string };

export class ReceiptController {

    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    async init() {
        const userInput = await this.collectUserData();
        if (!this.validateInput(userInput)) {
            console.log('[-] Please enter valid data');
            return;
        } 

        const { username, password, receiptId } = userInput;
        const res = await this.fetchReceipt(username, password, receiptId);
        console.log(res);
        // we can store this receipt in some database 
        const store = ReceiptStore.getInstance();
        store.writeData(res);
    }

    private ask(question: string): Promise<string> {
        return new Promise((resolve) => this.rl.question(question, resolve));
    }

    private async collectUserData(): Promise<IUserData> {
        const username = await this.ask('[+] What is your username? ');
        const password = await this.ask('[+] What is your password? ');
        const receiptId = await this.ask('[+] Receipt Id which you want to fetch? ');
        this.close();
        return { username, password, receiptId };
    }

    private close(): void {
        this.rl.close();
    }

    private async fetchReceipt(username: string, password: string, receiptId: string):Promise<IReceipt> {
        try {
        const receiptService = ReceiptService.getInstance();
        return await receiptService.getReceipt(username, password, receiptId);
        } catch (e) {
            console.log('Cannot Fetch Receipt');
        }
    }

    private validateInput(input: IUserData) {
        if (input.username.length > 5 && input.password.length > 6 && input.receiptId.length > 0) {
            return true;
        }
        return false;

    }
}