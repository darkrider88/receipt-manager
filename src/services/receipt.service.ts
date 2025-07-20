import type { IReceipt } from "../types/interfaces";
import { BASE_URL } from "../utils/constants";
import { Authenticator } from "./authenticator.service";
import { HttpClient } from "./http-client.service";

export class ReceiptService {
    private static instance: ReceiptService;
    private baseURL: string;

    private constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    // Making this class Singleton
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ReceiptService(BASE_URL);

        return this.instance;
    }

    async getReceipt(username: string, password: string, receiptId: string): Promise<IReceipt> {
        try {
            const token = await this.getAuthToken(username, password);
            const url = this.getReceiptURL(receiptId);
            const res = HttpClient<IReceipt>(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            return res; 
        } catch (error) {
            console.log('****')
            console.log('Error while fetching the receipt', error);
            throw new Error('Error while fetching the receipt');
        }
    }

    /**
     * Method to get the stored token from authenticator service
     * this token will be used to fetch reciet
     * @param username 
     * @param password 
     * @returns token
     */
    private async getAuthToken(username: string, password: string): Promise<string> {
        const authService = Authenticator.getInstance();
        const res = await authService.getToken(username, password);
        if (res.status === 'failure') {
            throw new Error('Error while getting the token')
        }

        return res.token;
    }

    private getReceiptURL(id: string) {
        return `${this.baseURL}/receipt/${id}`;
    }
}