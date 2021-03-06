import Vue from 'vue'

export function errorParser (error) {
  let statusText = ''
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status === 500) {
      statusText = 'We are unable to process your request'
      console.error('Unable to process your request')
    } else {
      statusText = error.response.statusText
      console.error(`There was an error processing your request ${statusText}`)
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request)
    console.error(error.message)
    statusText = error.message
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
    statusText = error.message
  }

  Vue.$toast.error(statusText, {
    timeout: 2000,
    position: 'top-right',
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: true
  })

  return {
    success: false
  }
}

export function responseParser (response) {
  let result = {
    success: false,
    errors: {},
    data: {}
  }

  if (response) {
    let status = response.status
    if (status >= 200 && status < 300) {
      // success
      result['success'] = true
      result['data'] = response.data
    } else if (status === 400) {
      if (response.data) {
        let body = response.data
        if (body.errors) {
          console.error(`erros: ${JSON.stringify(body.errors)}`)
          result['errors'] = body.errors
          // result
        } else {
          // errors
          console.error('unknown api error')
        }
      }
    } else {
      // general parsing
      // Vue.toasted.global.unknown_error()
      console.error('unprocessed error')
    }
  }

  return result
}
