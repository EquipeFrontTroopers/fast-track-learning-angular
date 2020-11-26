export const environment = {
  production: false,
  ApiUrl: 'http://localhost:3000/',
  auth0:{
    domain: 'dev-d1wwy-sg.us.auth0.com',
    idClient: 'Sdl0HSc3kMEtW0Zw9Jmm0neFTD9DkbBP',
    audience: 'http://localhost:4200',
    redirect: 'http://localhost:4200',
    scope: 'openid profile'
  },
  auth0Api:{
    urltoken: 'https://dev-d1wwy-sg.us.auth0.com/oauth/token',
    id: '5fbd50144ab354003eaedfc6',
    name: 'Auth0 Management API',
    audience: 'https://dev-d1wwy-sg.us.auth0.com/api/v2/'
  }
};

