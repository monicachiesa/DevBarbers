const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({ token }) //quando abrir o app, ele da um refresh no token caso já tenha
        });
        const json = await req.json();
        return json;

    },
    signIn: async (email, password) => {  // login 
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({ email, password })
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => { //cadastro de usuário
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({ name, email, password })
        });
        const json = await req.json();
        return json;
    },


};