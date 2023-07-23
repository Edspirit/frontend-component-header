import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import { FullscreenModal, Icon, SearchField } from '@edx/paragon';
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowBack, Close } from '@edx/paragon/icons';
import messages from '../generic/messages';
import useSearchSuggestions from './useSearchSuggestions';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPage,
  clearAllPages,
  loadPages,
  removePage,
} from './redux/slice/recentPagesSlice';
import logoPlaceholder from '../assets/org-logo-place-holder.svg';

const SearchModal = ({ intl, openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const [searchSuggestionValue, setSearchSuggestionValue] = useState('');
  const { searchSuggestionsResults } = useSearchSuggestions(
    searchSuggestionValue
  );
  const recentSearch = useSelector((state) => state.recentPages.pages);

  useEffect(() => {
    dispatch(loadPages());
  }, [dispatch]);

  const handleSubmitSearch = (value) => {
    setOpenModal(false);
    window.location.replace(`/homepage/search?q=${value}`);
  };
  const searchField = useMemo(
    () => (
      <SearchField
        onChange={(value) => {
          setSearchSuggestionValue(value);
        }}
        onSubmit={handleSubmitSearch}
        placeholder={intl.formatMessage(messages['header.search.placeholder'])}
      />
    ),
    [intl]
  );
  return (
    <FullscreenModal
      className="search-modal"
      title="search-modal"
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    >
      <div className="d-flex align-items-center search-wrapper">
        <Icon
          src={ArrowBack}
          loadPages
          onClick={() => {
            setOpenModal(false);
          }}
          className="mr-1.5"
        />
        {searchField}
      </div>
      {searchSuggestionsResults?.length > 0 && (
        <div className="search-result-modal-wrapper px-4 pt-3">
          {searchSuggestionsResults?.map((result) => (
            <a
              key={result?.data?.id}
              href={`/homepage/course/${result?.data?.course_metadata?.course_slug}`}
              onMouseDown={() => {
                setSearchSuggestionValue('');
                dispatch(addPage(result?.data?.course_metadata));
                setOpenModal(false);
                window.location.replace(
                  `/homepage/course/${result?.data?.course_metadata?.course_slug}`
                );
              }}
            >
              <div key={result?.data?.content?.display_name} className="py-2">
                <span className="suggestion-title pb-2">
                  {result?.data?.content?.display_name}
                </span>
                <p className="second-title-wrapper">
                  <span>
                    {result?.data?.course_metadata?.partner?.organization?.name}
                  </span>
                  . <span>{result.isProgram ? 'Program' : 'Course'}</span>
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
      {recentSearch?.length > 0 && (
        <div className="px-4 pt-4 recent-view-wrapper">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>
              <FormattedMessage
                id="searchModal.recentlyViewed.text"
                defaultMessage="Recently viewed"
              />
            </h4>
            <span className="font-sm" onClick={() => dispatch(clearAllPages())}>
              <FormattedMessage id="clearAll.text" defaultMessage="Clear all" />
            </span>
          </div>
          {recentSearch?.map((recentView) => (
            <div
              className="d-flex align-items-center mb-2.5"
              key={recentView?.paid_course?.course_id}
            >
              <a
                href={`/homepage/course/${recentView?.data?.course_metadata?.course_slug}`}
                className="logo-img-wrapper "
              >
                <img
                  src={
                    recentView?.partner?.organization?.logo ?? logoPlaceholder
                  }
                  alt="org-logo"
                />
              </a>

              <div className="d-flex justify-content-between align-items-center w-100">
                <a
                  href={`/homepage/course/${recentView?.data?.course_metadata?.course_slug}`}
                >
                  <p className="recent-title">
                    {recentView?.additional_metadata?.display_name}
                  </p>
                  <p className="recent-institution">
                    {recentView?.partner?.organization?.name}
                  </p>
                </a>
                <Icon
                  src={Close}
                  onClick={() => dispatch(removePage(recentView?.course_slug))}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* TODO: Need Backend Data */}
      {/* <TrendingWords />
      <TrendingCourses /> */}
    </FullscreenModal>
  );
};

SearchModal.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchModal);
