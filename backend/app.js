const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const cors = require('koa2-cors');

const clientID = 'e9cea89333635770458e';
const clientSecret = '2975194b4e5293b3e69337c40af137f1861215c5';
const app = new Koa();

const router = new Router();

router.get('/', async ctx => {
	ctx.body = "hi,oauth demo";
})

router.get('/oauth/callback', async ctx => {
	const requestToken = ctx.request.query.code;
	console.log('authorization code:', requestToken);

	const tokenResponse = await axios({
		method: 'post',
		url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
		headers: {
			accept: 'application/json'
		}
	});

	const accessToken = tokenResponse.data.access_token;
	console.log(`access token: ${accessToken}`);

	const result = await axios({
		method: 'get',
		url: `https://api.github.com/user`,
		headers: {
			accept: 'application/json',
			Authorization: `token ${accessToken}`
		}
	});
	const login = result.data.login;

	ctx.response.redirect(`http://localhost:3000/welcome?name=${login}`);
});

app.use(cors())
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(9000);
