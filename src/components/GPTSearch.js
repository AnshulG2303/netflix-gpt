import React from 'react'
import GPTSearchBar from './GPTSearchBar';
import GPTMovieSuggestion from './GPTMovieSuggestion';
import { BG_URL } from '../utils/constants';
export const GPTSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img className="w-full h-full object-cover " src={BG_URL} alt="logo" />
      </div>
      <GPTSearchBar />
      <GPTMovieSuggestion />
    </div>
  )
}
export default GPTSearch;