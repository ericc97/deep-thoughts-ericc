import decode from 'jwt-decode';

class AuthService {
    //retrieve data saved in token
    getProfile() {
        return decode.apply(this.getToken());
    }
    // check if user is still logged in
    loggedIn() {
        // checks if there is a saved token and it's still valid
        const token = this.getToken();
        // use type coercion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // check if the token  has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }else {
                return false;
            }
        }catch (err) {
            return false;
        }
    }

    // retrieve token from local storage
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    // Set token to localStorage and reload page to homepage
    login(idToken) {
        // Save user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // Clear token from localStorage and force logout with reload
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');

        // This will reload the page and reset the state of the application
        window.location.assign('/')
    }
}

export default new AuthService();