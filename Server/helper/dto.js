export function toJson(obj) {
    return JSON.stringify(obj);
}
export function fromJson(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error('Error parsing JSON string:', e.message);
        return null; // or you can throw the error depending on your use case
    }
}