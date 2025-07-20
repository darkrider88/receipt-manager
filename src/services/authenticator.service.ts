import type { IAuthRequest, IAuthResponse } from "../types/interfaces";
import { BASE_URL } from "../utils/constants";
import { HttpClient } from "./http-client.service";

export class Authenticator {
    private static instance: Authenticator;
    private baseURL: string;
    private dataStore: Map<string, string>;

    // declaring this private to prevent others, from creating the instance
    private constructor(baseUrl: string) {
        this.baseURL = baseUrl;
        this.dataStore = new Map<string, string>();
    }

    // making this class singleton
    static getInstance() {
        
        if (this.instance) {
            return this.instance;
        }
        this.instance = new Authenticator(BASE_URL);
        return this.instance;

    }

    /**
     * This method fetches the auth token from external site
     * and stores it, for now just storing it in-memory
     * @param username 
     * @param password 
     */
    async getToken(username: string, password: string): Promise<{token: string, status: string}> {
        try {
            // check if token already exists
            if (this.dataStore.has(username)) {
                return {token: this.dataStore.get(username)!, status: 'success' }
            }

            const url = this.getAuthURL();
            const body = this.prepareAuthRequest(username, password);
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
            const res = await HttpClient<IAuthResponse>(url, options);
            const { access_token } = res;
            this.storeToken(username, access_token);

            return {token: access_token, status: 'success'};
            
        } catch (error) {
            console.log('Error while getting the token', error);
            return { token: '', status: 'failure' }
        }
    }

    /**
     * This method can be used to store the token in your redis instance
     * For now just storing it in-memory
     * @param username 
     * @param token 
     */
    private storeToken(username: string, token: string): void {
        if (username && token) {
            this.dataStore.set(username, token);
        }
    }

    private prepareAuthRequest(username: string, password: string): IAuthRequest {
        const body: IAuthRequest = {
            grant_type: 'password',
            scope: 'private',
            username: username,
            password: password
        }
        return body;
    }

    /**
     * Method to return the baseURL + endpoint of the API
     * @returns URL
     */
    private getAuthURL(): string {
        return `${this.baseURL}/auth/token`;
    }
}