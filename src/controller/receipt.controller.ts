import readline from "readline";
import { ReceiptService } from "../services/receipt.service";

interface IUserData {username: string, password: string, receiptId: string };

export class ReceiptController {

    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    async init() {
        const { username, password, receiptId } = await this.collectUserData();
        console.log(username, password, receiptId);
        const res = await this.fetchReceipt(username, password, receiptId);
        console.log(res);
        // we can store this receipt in some database
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

    private async fetchReceipt(username: string, password: string, receiptId: string) {
        try {
        const receiptService = ReceiptService.getInstance();
        return await receiptService.getReceipt(username, password, receiptId);
        } catch (e) {
            console.log('Cannot Fetch Receipt');
        }
    }
}