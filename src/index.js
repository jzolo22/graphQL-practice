import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';


const client = new ApolloClient({
  // need to provide the url for a running GraphQL server
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});


// ----------- PLAIN JS VERSION ----------- // 
// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));


// ----------- GRAPHQL QUERY ----------- // 
// gql parses the the query string into a query document
const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

// the result of query is attached to the data property
function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

ReactDOM.render(
  <React.StrictMode>
    {/* NEED TO WRAP HIGHEST LEVEL COMPONENT IN THE APOLLO PROVIDER */}
    <ApolloProvider client={client}>
      <App />
      <ExchangeRates />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
