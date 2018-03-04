const wait = time => value =>
  new Promise(resolve =>
    setTimeout(() => resolve(value), time)
  )

export default wait
