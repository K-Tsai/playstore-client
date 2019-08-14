import React from 'react';
import Playstore from './playstore'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      playstores: [],
      genre: '',
      sort: '',
      error: null
    }
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  setGenre(genre) {
    this.setState({
      genre
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    const baseUrl='http://localhost:8000/apps';
    const params = [];
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`)
    }
    if(this.state.genre) {
      params.push(`genre=${this.state.genre}`)
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;
    console.log(url);
    fetch(url)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      this.setState({
        playstores: data,
        error: null
      });
    })
    .catch(err => {
      this.setState({
        error: "Sorry, could not get playstore at this time."
      })
    })
  }
  render()  {
    const playstores = this.state.playstores.map((playstore, i) => {
      return <Playstore {...playstore} key={i} />
    })
    console.log(playstores);
    return (
      <main className='App'>
        <h1>Google Play Apps Search</h1>
        <div className="genreSearch">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="genreSearch">Search for a Genre: </label>
            <input
              type ="text"
              id="genreSearch"
              name="genreSearch"
              value={this.state.genre}
              onChange={e => this.setGenre(e.target.value)}
              />

            <label htmlFor="sort">Sort: </label>
            <select id ="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="rating">Rating</option>
              <option value="app">App</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {playstores}
      </main>
    );
  }
}

export default App;
