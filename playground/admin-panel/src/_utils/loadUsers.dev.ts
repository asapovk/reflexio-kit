
export const loadUsers =  () => new Promise((res, rej) => {
    setTimeout(()=>{
      res([{
          name: 'Invan',
          id: 1
        },
        {
          name: 'Vasya',
          id: 2
        }
    ])
    },3000)
  })