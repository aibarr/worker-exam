import JustDoing from '../utils'

self.addEventListener('message', function (event) {
    JustDoing(event.data)

    self.postMessage(event.data)
})