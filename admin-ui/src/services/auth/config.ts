import config from '../../config';

interface AuthConfig {
    domain: string;
    clientId: string;
    callbackUrl: string;
    audience: string;
}

const AUTH_CONFIG: AuthConfig = {
    domain: '',
    clientId: ','
    audience: '',
    callbackUrl: config.auth0CallbackUrl
};

export default AUTH_CONFIG;