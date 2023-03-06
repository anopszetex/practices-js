/* import { setTimeout } from 'node:timers/promises'

const results = ['1','2'].map(async (item) => {
  console.log('Starting process\n', item)
  
  await setTimeout(5000)
  
  console.log('Finishing process', item)

  return Number(item) * 2
})

console.log('results', await Promise.all(results)) */
 

/* for (const iterator of ['1', '2']) {
 console.log('Starting process\n')

  await setTimeout(50000)
  
  console.log('Finishing process', iterator)
} */