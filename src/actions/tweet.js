import { saveLikeToggle, saveTweet } from "../utils/api";
import {showLoading, hideLoading} from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const SAVE_TWEET = 'SAVE_TWEET';

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

function toggleTweet({ id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

function saveNewTweet(tweet) {
    return {
        type: SAVE_TWEET,
        tweet
    }
}

export function handleSaveTweet(text, replyingTo) {
    return (dispatch, getState) => {
        const {authedUser} = getState();

        dispatch(showLoading());
        saveTweet({text, author: authedUser, replyingTo})
        .then((savedTweet) => dispatch(saveNewTweet(savedTweet)))
        .catch((e) => {
            console.warn('Error in handleSaveTweet: ', e);
            alert('Tweet could not be saved. Try again');
        })
        .finally(() => dispatch(hideLoading()));
    }
}

export function handleToggleTweet(info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))
        saveLikeToggle(info)
            .catch((e) => {
                console.warn('Error in handleToggleTweet: ', e);
                dispatch(toggleTweet(info));
                alert('There was an error liking the tweet. Try again.');
            });
    };
}