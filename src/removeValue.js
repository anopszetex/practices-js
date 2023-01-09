
//* remove a value by returning an empty array
const doubled = [1, 2, 3, 0, 5, 0].flatMap((number) => {
  return number === 0 ? [] : [number * 2]
})


console.log('doubled', doubled);