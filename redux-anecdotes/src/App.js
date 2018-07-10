import React from 'react';
import actionCreatorFor from "./actionCreator"

class App extends React.Component {

  createHandler = (e) => {
    e.preventDefault()

    this.props.store.dispatch(
      actionCreatorFor.create(e.target.anecdote.value)
    )

    e.target.anecdote.value = ""
  }

  voteHandler = (id) => () => {
    this.props.store.dispatch(
      actionCreatorFor.vote(id)
    )
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteHandler(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.createHandler}>
          <div><input name="anecdote" /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App