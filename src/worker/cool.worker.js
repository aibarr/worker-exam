import JustDoing from '../utils'

// eslint-disable-next-line
self.addEventListener('message', function (event) {
    JustDoing(event.data)

    // eslint-disable-next-line
    self.postMessage(event.data)
})