import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { REVIEW_RATINGS } from '../../utils/const';
import { updateReviews, setModalVisibility } from '../../store/actions';
import { getModalVisibility, getReviews } from '../../store/selectors';

const defaultFormState = {
  name: '',
  dignity: '',
  limitations: '',
  rating: 0,
  reviewText: '',
  isFormChecked: false,
}

const Modal = ({ isModalVisible, reviews, updateReviews, setModalVisibility }) => {
  const [formState, setFormState] = useState({ ...defaultFormState })

  const hideModal = () => {
    setModalVisibility(false);
    setFormState({ ...defaultFormState });
  }

  const handleChange = (evt) => {
    const inputName = evt.target.name;
    const newValue = inputName === 'rating' ? Number(evt.target.value) : evt.target.value;

    setFormState({
      ...formState,
      [inputName]: newValue,
      isFormChecked: true,
    });
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    if (!isValid()) {
      return;
    }

    const newReview = {
      name: formState.name,
      dignity: formState.dignity,
      limitations: formState.limitations,
      rating: formState.rating,
      reviewText: formState.reviewText,
    };

    const updatedReviews = [
      ...reviews,
      newReview,
    ]

    updateReviews(updatedReviews);
    hideModal();
  };

  const isNameValid = () => formState.name.length > 0;

  const isReviewTextValid = () => formState.reviewText.length > 0;

  const isValid = () => {
    return isNameValid() && isReviewTextValid();
  }

  const getMessage = (validityCheckFunction) => {
    if (formState.isFormChecked && !validityCheckFunction()) {
      return (
        <p className='modal__error'>Пожалуйста, заполните поле</p>
      );
    }

    return '';
  };

  return (
    <div className={isModalVisible ? 'modal' : 'modal visually-hidden'}>
      <div className='modal__content'>
        <button className='modal__button' onClick={hideModal}>
          <svg width='15' height='16' viewBox='0 0 15 16' fill='none'>
            <path d='M13.6399 15.0096L7.50482 8.86495L1.36977 15.0096L0 13.6399L6.14469 7.50482L0 1.36978L1.36977 0L7.50482 6.14469L13.6399 0.00964652L15 1.36978L8.86495 7.50482L15 13.6399L13.6399 15.0096Z' fill='#9F9E9E' />
          </svg>
        </button>
        <h2>Оставить отзыв </h2>
        {getMessage(isNameValid)}
        <form action='#' className='modal__form' onSubmit={handleFormSubmit}>
          <div className='modal__form-left'>
            <label className='visually-hidden'></label>
            <input
              type='text'
              placeholder='Имя'
              name='name'
              value={formState.name}
              onChange={handleChange}
              className='modal__form-input modal__form-input--name'
            />
            <label className='visually-hidden'></label>
            <input
              type='text'
              placeholder='Достоинства'
              name='dignity'
              value={formState.dignity}
              onChange={handleChange}
              className='modal__form-input modal__form-input--dignity'
            />
            <label className='visually-hidden'></label>
            <input
              type='text'
              placeholder='Недостатки'
              name='limitations'
              value={formState.limitations}
              onChange={handleChange}
              className='modal__form-input modal__form-input--limitations'
            />
          </div>
          <div className='modal__form-right'>
            <div className='modal__rating'>
              <p>Оцените товар:</p>
              <div className='modal__rating-stars'>
                {REVIEW_RATINGS.map((rating, index) => {
                  const isChecked = formState.rating === rating;

                  return (
                    <Fragment key={index}>
                      <input
                        className='modal__rating-input visually-hidden'
                        name='rating'
                        type='radio'
                        value={rating}
                        id={rating}
                        checked={isChecked}
                        onChange={handleChange}
                      />
                      <label htmlFor={rating} className='modal__rating-label'></label>
                    </Fragment>
                  );
                })}
              </div>
            </div>
            {getMessage(isReviewTextValid)}
            <label htmlFor='reviewText' className='visually-hidden'></label>
            <textarea
              type='text'
              placeholder='Комментарий'
              value={formState.reviewText}
              onChange={handleChange}
              name='reviewText'
              id='reviewText'
              className={isReviewTextValid() ? 'modal__form-input modal__form-input--review' : 'modal__form-input modal__form-input--review modal__form-input--invalid'}
            />
          </div>
          <button className='modal__form-button' disabled={!isValid()}>Оставить отзыв</button>
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isModalVisible: PropTypes.bool,
  reviews: PropTypes.array,
  updateReviews: PropTypes.func,
  setModalVisibility: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isModalVisible: getModalVisibility(state),
  reviews: getReviews(state),
});

const mapDispatchToProps = {
  updateReviews,
  setModalVisibility,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
