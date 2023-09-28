import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import reducers from "./redux/reducers"

const devtoolsExtension = composeWithDevTools({})
const allReducers=combineReducers({
    ...reducers
})
 const store=createStore(allReducers,{},devtoolsExtension(applyMiddleware(thunk)))
 export default store