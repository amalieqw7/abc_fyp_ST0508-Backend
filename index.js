const app = require('./controller/app');

const PORT = process.env.PORT || 3000;
const frontend_PORT = 5000;

function isLocalhost() 
{
    // console.log(url.includes('localhost') || url.includes('127.0.0.1'));
    // return url.includes('localhost') || url.includes('127.0.0.1');
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        console.log('hostname   ' + hostname);
        // isLocalhost(hostname);
        if(hostname == 'localhost'){
            return 'localhost:3000'
        }
        else if(hostname == 'abc-cooking-studio'){
            return 'abc-cooking-studio-backend.azurewebsites.net'
        }

    }
}

const baseUrl = `http://${isLocalhost()}`;
console.log('backendbaseurl ' + baseUrl);

app.listen(PORT, (err) => {
  if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
  console.log(`Backend listening at http://localhost:${PORT}`);
  console.log(`Frontend listening at http://localhost:${frontend_PORT}`);
});