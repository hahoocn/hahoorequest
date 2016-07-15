import ncp from 'ncp';

ncp('src/fetch', 'lib/fetch');
ncp('src/fetch-request', 'lib/fetch-request');
ncp('src/reqwest-fetch', 'lib/reqwest-fetch');
ncp('src/reqwest-request', 'lib/reqwest-request');
ncp('src/superagent-fetch', 'lib/superagent-fetch');
ncp('src/superagent-request', 'lib/superagent-request');
