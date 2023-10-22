import { createStore, compose, applyMiddleware } from './src/mini-redux/index';
import { loggerEnhancer, anotherLoggerEnhancer } from './src/example/enhancer';
import { loggerMiddleware } from './src/example/middleware';
import { thunkMiddleware } from './src/mini-redux/redux-thunk/thunkMiddleware'

// 获取元素
const container = document.querySelector('#container');
const increaseBtn = document.querySelector('#increaseBtn');
const decreaseBtn = document.querySelector('#decreaseBtn');

// REDUCER
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'counter/increment':
      return state + 1;
    case 'counter/decrement':
      return state - 1;
    default:
      return state;
  }
};

// STORE
const enhancer = compose(loggerEnhancer, anotherLoggerEnhancer);
const store = createStore(
  reducer,
  undefined,
  compose(enhancer, applyMiddleware(loggerMiddleware, thunkMiddleware))
);

// RENDER
const render = () => {
  container.innerHTML = store.getState();
};

// SUBSCRIBE
const unsubscribe = store.subscribe(render);

// EVENT
increaseBtn.addEventListener('click', () => {
  store.dispatch({ type: 'counter/increment' });
});

decreaseBtn.addEventListener('click', () => {
  store.dispatch({ type: 'counter/decrement' });
});

const increaseTimeout = () =>(dispatch) => {
  let p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000);
  })
  p.then(() => {
    dispatch({ type: 'counter/increment' });
  })
}

increaseTimeoutBtn.addEventListener('click', () => {
  console.log('1s后+')
  store.dispatch(increaseTimeout())
})

const decreaseTimeout = () => (dispatch) => {
  let p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000);
  })
  p.then(() => {
    dispatch({ type: 'counter/decrement' });
  })
}

decreaseTimeoutBtn.addEventListener('click', () => {
  console.log('1s后-')
  store.dispatch(decreaseTimeout())
})