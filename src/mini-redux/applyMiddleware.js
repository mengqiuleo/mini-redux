/**
import { compose, createStore, applyMiddleware } from'redux';

// 假如我们要注册两个middleware: middleware1和middleware2
const enhancer = applyMiddleware(middleware1, middleware2);
const store = createStore(reducers, enhancer);
 */

import compose from './compose'

// applyMiddleware返回另一个函数，也就是`enhancer`。
export default function applyMiddleware(...middlewares){
  return function enhancer(createStore){ // `enhancer`接受原来的createStore函数为参数.
    
     // enhancer的返回值是另一个函数，其实就是`新的createStore`
    return function enhancedCreateStore(...args){
      
    	const store = createStore(...args) // 调用老的createStore，来获得store。

      // 定义新的dispatch函数，后边会被修改
      let dispatch = () => {
      	throw new Error('Dispatching while constructing your middleware is not allowed.Other middleware would not be applied to this dispatch.')
      }

      // 暴露个每个middleware的API。
      const middlewareAPI = {
      	getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }

      // 把所有传入的middlewares转为一个数组。
      const chain = middlewares.map(function(middleware) {
      	return middleware(middlewareAPI)
      })

      // 新的dispatch函数，其实就是把所有middleware的调用链加入dispatch的执行过程中。
      dispatch = compose(...chain)(store.dispatch)

      return {
      	...store,
        dispatch,
      }
    }
  }
}