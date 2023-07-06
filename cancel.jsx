const { useState, useMemo, useEffect } = React;

const useParams = () => {
    const [pres, setPres] = useState('');
    const [decode, setDecode] = useState('');
    const [response, setResponse] = useState({});

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const res = urlParams.get('pres') || '';
        setPres(res);
        setDecode(atob(res));
        setResponse(JSON.parse(atob(res)))
    }, [])

    return [
        pres,
        decode,
        response
    ];
};

const CancelView = () => {

    const [pres, decode, response] = useParams();
    const [sessionId, setSessionId] = useState('');

    return (
        <div className="container-fluid py-4">
            <main role="main" className="inner cover">
                <h1 className="cover-heading">EL PENTAGONO</h1>
                <p className="lead">El pedido no se ha completado.</p>
                <div className="row mb-4">
                    <div className="col">
                        {pres}
                        <br />
                        {decode}
                        <br />
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Response</h5>
                                <a href="#" className="card-link">{`code: ${response.responseCode}`}</a>
                                <a href="#" className="card-link"> {`orderId: ${response.orderID}`}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="lead">
                    <a href="index.html" className="btn btn-lg btn-secondary">Volver al Inicio</a>
                </p>
            </main>
        </div>
    );
}

ReactDOM.render(
    <CancelView />,
    document.querySelector('#root')
);
