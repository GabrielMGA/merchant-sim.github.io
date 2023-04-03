const randInt = (start, end) => Math.floor(Math.random() * (end - start) + start);

const { useState, useMemo } = React;

const request = {
    "amount": 1000,
    "currency": 840,
    "items": [
        {
            "description": "Converse Shoes",
            "quantity": 2,
            "amount": 5000,
            "currency": 840
        }
    ],
    "billing_address": {
        "country": 484,
        "state": "Puebla",
        "zip_code": "73310",
        "address": "Av. siempre viva.",
        "floor_apartment": "No. 3"
    },
    "customer": {
        "phone": {
            "cc": "+57",
            "number": "3123334455"
        },
        "email": "example@mail.com"
    },
    "success_url": "https://paymentpage-success.free.beeceptor.com",
    "cancel_url": "https://paymentpage-cancel.free.beeceptor.com"
};

const App = () => {

    const [session, setSession] = useState({
        "session_id": "d2ade83c-f542-429e-8078-9019f73765f8",
        "redirection_url": "http://localhost:8080/#/login?session=d2ade83c-f542-429e-8078-9019f73765f8",
        "expiration_date": "2023-04-01 17:03:50"
    });

    const [response, setResponse] = useState([]);

    const handleClick = () => {

    };

    return (
        <div className="container py-4">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">EL PENTAGONO</h1>
                    <p className="col-md-8 fs-4">
                        {session.session_id} <br />
                        {session.redirection_url} <br />
                        {session.expiration_date}
                    </p>
                    <a href={session.redirection_url} className="btn btn-success btn-lg" type="button" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                        </svg>
                        <span className="ms-3">Confirmar pago</span>
                    </a>
                </div>
            </div>
            <div class="row align-items-md-stretch">
                <div class="col">
                    <div class="h-100 p-5 text-bg-dark rounded-3">
                        <h2>RESPONSE</h2>
                        <p>
                            {response}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


// Example POST method implementation:
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": 'application/json',
            'Authorization': 'Basic MTpza190ZXN0X3Bhc3N3b3Jk',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
