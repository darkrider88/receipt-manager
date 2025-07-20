// Reusable HTTP client with fetch API

export async function HttpClient<T>(url: string, options: RequestInit): Promise<T> {
    validateRequest(url, options);
    
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${error}`);
    }
    return response.json();
}

function validateRequest(url: string, options: RequestInit) {
    if (!url) {
        throw new Error('URL is required')
    }
    if (!options.method || !options.headers) {
        // for now only validating the method and headers
        // Though headers are not mandatory but still..
        throw new Error('HTTP Request option is missing Method or Headers')
    }
}