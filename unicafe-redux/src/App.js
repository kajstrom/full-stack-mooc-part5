import React from 'react';
import ReactDOM from "react-dom"
import {createStore} from "redux";
import counterReducer from "./counterReducer"

const store = createStore(counterReducer)
console.log(store.getState())

const Statistiikka = ({votes}) => {
  const {good, bad, ok} = votes
  const totalVotes = good + bad + ok
  const average = (good - bad) / 3
  const positive = (good / totalVotes) * 100

  if (totalVotes === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positive}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({type: "ZERO"})}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  counterClick = (type) => () => {
    store.dispatch({type})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.counterClick('GOOD')}>hyvä</button>
        <button onClick={this.counterClick('OK')}>neutraali</button>
        <button onClick={this.counterClick('BAD')}>huono</button>
        <Statistiikka votes={store.getState()} />
      </div>
    )
  }
}


const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)

export default App;