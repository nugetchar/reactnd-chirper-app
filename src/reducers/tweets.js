import { RECEIVE_TWEETS, SAVE_TWEET, TOGGLE_TWEET } from "../actions/tweet";

export default function tweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return { ...state, ...action.tweets };
        case TOGGLE_TWEET:
            const likes = action.hasLiked ? state[action.id].likes.filter(id => id !== action.authedUser) : [...state[action.id].likes, action.authedUser];
            return { ...state, [action.id]: { ...state[action.id], likes } };
        case SAVE_TWEET:
            const { tweet } = action

            let replyingTo = {}
            if (tweet.replyingTo !== null) {
              replyingTo = {
                [tweet.replyingTo]: {
                  ...state[tweet.replyingTo],
                  replies: state[tweet.replyingTo].replies.concat([tweet.id])
                }
              }
            }
      
            return {
              ...state,
              [action.tweet.id]: action.tweet,
              ...replyingTo,
            }
        default:
            return state;
    }
}