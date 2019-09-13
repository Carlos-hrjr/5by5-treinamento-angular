export class UserUtil {

    static get(): any {
        const data = localStorage.getItem('contact-list.user');
        if (!data) return null;
        return JSON.parse(data);
    }

    static set(data) {
        localStorage.setItem('contact-list.user', JSON.stringify(data));
    }

    static clear() {
        localStorage.removeItem('contact-list.user');
    }
}