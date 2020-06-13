import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2,
    x: [1,2,3],
    type: {
      name: 'zhaosir',
      gender: 'male'
    }
  }
})





