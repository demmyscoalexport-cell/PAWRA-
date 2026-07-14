import {loadEnvFile, getStorefrontCredentials} from './loadEnv.js';
import {storefrontQuery} from './storefrontClient.js';

loadEnvFile();
const creds = getStorefrontCredentials();
const {data} = await storefrontQuery({
  domain: creds.domain,
  token: creds.token,
  query: `{ collections(first: 30) { nodes { handle title } } }`,
});
for (const c of data?.collections?.nodes ?? []) {
  console.log(`${c.handle} — ${c.title}`);
}
