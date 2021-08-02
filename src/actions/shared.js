import { getInitialData } from '../utils/api';
import { setAuthedUser } from './authUser';
import { receiveTweets } from './tweet';
import { receiveUsers } from './user';
import {showLoading, hideLoading} from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({users, tweets}) => {
                dispatch(receiveTweets(tweets));
                dispatch(receiveUsers(users));
                dispatch(setAuthedUser(AUTHED_ID));
                dispatch(hideLoading());
            })
            // .catch(() => alert('Something wrong happened. Please reload your page'));
    }
}