const randInt = (start, end) => Math.floor(Math.random() * (end - start) + start);

const { useState, useEffect, useMemo } = React;

const request = {
    "order_id": "b54628b74c044c3a9c9ce8f96e189111",
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

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  

const App = () => {

    const [sessionId, setSessionId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [session, setSession] = useState({
        "session_id": "0da0001e-34d5-4d38-b1e5-89db3c1fc300",
        "redirection_url": "http://localhost:8080/#/login?session=0da0001e-34d5-4d38-b1e5-89db3c1fc300",
        "expiration_date": "2023-04-01 17:03:50"
    });

    const [response, setResponse] = useState({});

    useEffect(() => {
        const sessions = uuidv4().replace(/-/g, '');
        setOrderId(sessions);
    }, [])

    const handleClick = () => {
        console.log('send request session!....');
        postData("http://eapiqa.st.com:8090/api/v1/checkout_session", {
            "order_id": orderId,
            "amount": 10000,
            "currency": 840,
            "items": [
                {
                    "description": "Converse Shoes",
                    "quantity": 2,
                    "amount": 5000,
                    "sku": "SG999999",
                    "type": "SPORTING_GOODS"
                }
            ],
            "billing_address": {
                "alias_name": "Name",
                "country": 484,
                "state": "Puebla",
                "zip_code": "73310",
                "address": "Av. siempre viva.",
                "floor_apartment": "No. 3",
                "city": "City address"
            },
            "customer": {
                "phone": {
                    "cc": "001",
                    "number": "3123334455"
                },
                "email": "example@mail.com"
            },
            "success_url": "http://127.0.0.1:5500/success.html",
            "cancel_url": "http://127.0.0.1:5500/cancel.html"
        })
            .then(response => {
                setResponse(response);
                window.location.replace(response.redirection_url);
            });
    };

    const handleSearch = (event) => {
        setSessionId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes realizar acciones adicionales con el término de búsqueda
        setSession({
            ...session,
            redirection_url: sessionId
        })
    };

    return (
        <div className="container py-4">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">EL PENTAGONO</h1>
                    <p className="col-md-8 fs-4">
                        {session.redirection_url} <br />
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
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="form-control"
                            type="text"
                            value={sessionId}
                            onChange={handleSearch}
                            placeholder="Buscar..."
                        />
                        <button
                            type="submit"
                            className="btn btn-success">
                            Confirmar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleClick}
                        >
                            Request session
                        </button>
                    </form>
                </div>
            </div>
            <div class="row align-items-md-stretch">
                <div class="col">
                    <div class="h-100 p-5 text-bg-dark rounded-3">
                        <h2>RESPONSE</h2>
                        <p>
                            ORDER: {orderId}
                        </p>
                        <p>
                            {JSON.stringify(response)}
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
            'Authorization': `Basic ${btoa('1:sk_password')}`,
            // "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
