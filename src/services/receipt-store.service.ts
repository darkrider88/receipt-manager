import type { IReceipt } from "../types/interfaces";
import { appendFileSync, existsSync, mkdirSync } from 'fs'
import path from "node:path";

/**
 * This class is used to store the receipt data
 * This can be used to store the data into some database.
 * For now just storing it into a file, to keep the things simple
 */
export class ReceiptStore {
    private static instance: ReceiptStore;
    private STORAGE_FILE = path.join(process.cwd(), 'src', 'data', 'receipts.json');

    private constructor() {}

    static getInstance() {
        if(this.instance) {
            return this.instance;
        }

        this.instance = new ReceiptStore();
        return this.instance;
    }

    writeData(data: IReceipt) {
        if (data) {
            try {
                this.checkFileExists();
                appendFileSync(this.STORAGE_FILE, JSON.stringify(data, null, 2));
            } catch (e) {
                console.log('Error While writing the file ', e)
            }
        }
        
    }

    /**
     * Checks if file exists, if not then creates it
     */
    private checkFileExists() {
        const directory = path.dirname(this.STORAGE_FILE);
        if (!existsSync(directory)) {
            mkdirSync(directory, { recursive: true });
        }
    }


}