import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import { getImage } from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import { PureComponent } from 'react/cjs/react.production.min';
import { Oval } from 'react-loader-spinner';

export default class App extends PureComponent {
  state = {
    submitValue: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    getImage()
      .then(images => this.setState({ images }))
      .catch(error => this.setState({ error: error.message }));
  }

  handleFormSubmit = submitValue => {
    this.setState({ submitValue, page: 1, images: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevState.submitValue;
    const nextValue = this.state.submitValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevValue !== nextValue && this.state.submitValue) {
      this.setState({ isLoading: true });
      getImage(nextValue)
        .then(images => this.setState({ images }))
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }

    if (
      prevPage !== nextPage &&
      this.state.page !== 1 &&
      this.state.submitValue !== ''
    ) {
      getImage(nextValue, nextPage)
        .then(images =>
          this.setState(prev => ({
            images: [...prev.images, ...images],
          })),
        )
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleLoadMoreButton = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.error ? (
          <p>{this.state.error}</p>
        ) : (
          <>
            <ImageGallery images={this.state.images} />
            {this.state.isLoading ? (
              <Oval color="#00BFFF" height={80} width={80} />
            ) : (
              this.state.submitValue && (
                <Button onClick={this.handleLoadMoreButton} />
              )
            )}
          </>
        )}
      </>
    );
  }
}
