import './App.css';
import Searchbar from './components/Searchbar/Searchbar';
import { getImage } from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import { PureComponent } from 'react/cjs/react.production.min';
import { Oval } from 'react-loader-spinner';
import Modal from './components/Modal/Modal.jsx';

export default class App extends PureComponent {
  state = {
    submitValue: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    url: '',
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

    // if (prevValue !== nextValue && this.state.submitValue) {
    //   this.setState({ isLoading: true });
    //   getImage(nextValue)
    //     .then(images => this.setState({ images }))
    //     .catch(error => this.setState({ error: error.message }))
    //     .finally(() => this.setState({ isLoading: false }));
    // }

    // if (
    //   prevPage !== nextPage &&
    //   this.state.page !== 1 &&
    //   this.state.submitValue !== ''
    // ) {
    //   this.setState({ isLoading: true });
    //   getImage(nextValue, nextPage)
    //     .then(images =>
    //       this.setState(prev => ({
    //         images: [...prev.images, ...images],
    //       })),
    //     )
    //     .catch(error => this.setState({ error: error.message }))
    //     .finally(() => this.setState({ isLoading: false }));
    // }
    if (prevValue !== nextValue || prevPage !== nextPage) {
      // if (!this.state.search) return;
      this.setImages();
    }
  }

  setImages = () => {
    this.setState({ isLoading: true, error: null });
    getImage(this.state.submitValue, this.state.page)
      .then(images =>
        this.setState(prev => ({
          images: [...prev.images, ...images],
        })),
      )
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleLoadMoreButton = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleOpen = url => {
    this.setState({ url });
    this.toggleModal();
    console.log('target:', url.currentTarget);
  };

  render() {
    const { showModal } = this.state;
    return (
      <>
        {showModal && (
          <Modal images={this.state.url} onClose={this.toggleModal}></Modal>
        )}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.error ? (
          <p>{this.state.error}</p>
        ) : (
          <>
            <ImageGallery
              images={this.state.images}
              handleOpen={this.handleOpen}
            />
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
