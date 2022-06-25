import fetch from 'node-fetch'
import { config } from 'dotenv'
config()
const sync = async function (url = process.env.MORGEN_GET_URL) {
  const token = process.env.MORGEN_TOKEN
  console.log(token)
  // const res = await fetch(request, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: 'Bearer ' + token
  //   }
  // })
  const res = await fetch(url, {
    headers: {
      accept: '*/*',
      'accept-language': 'de',
      authorization: 'Bearer ' + process.env.MORGEN_TOKEN,
      'content-type': 'application/json',
      'if-none-match': 'W/"271-7CojDm9JdxnuQEgWBw+wS07sj6U"',
      'morgen-app-version': '2.5.6',
      'morgen-device-os': 'darwin',
      'morgen-device-os-version': '21.5.0',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site'
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  })

  console.log('Retrieved Result', res)
  const data = await res.text()
  console.log('Data', data)
  return data
}
// module.exports = performRequest;
sync().then(
  res => {
    console.log('Success', res)
    process.exit()
  },
  err => {
    console.error('Error', err)
    process.exit()
  }
)

export default sync
