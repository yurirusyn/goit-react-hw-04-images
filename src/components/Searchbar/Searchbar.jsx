import { Component } from 'react';
import s from './searchbar.module.css';
import svg from './symbol-defs.svg';
import { ImSearch } from 'react-icons/im';
class Searchbar extends Component {
  state = {
    submitValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.submitValue);
  };

  handleValueChange = e => {
    this.setState({ submitValue: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s['SearchForm']}>
          <button
            type="submit"
            className={s['SearchForm-button']}
            disabled={this.state.submitValue.trim() === ''}
          >
            <ImSearch style={{ marginRight: 8, width: 30, height: 30 }} />
            <span className={s['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={s['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleValueChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
