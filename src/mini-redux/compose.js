export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  
  if (funcs.length === 1) {
    return funcs[0]
  }
  
  return funcs.reduce(
    (composed, func) => //composed 它的值是上一次调用reducer的返回值
      (...args) =>
        composed(func(...args))
  )

  // return arg => fns.reduceRight((prev,fn) => {
  //   return fn(prev)
  // },arg)
}