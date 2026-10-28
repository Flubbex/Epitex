const commandConstructor = (API) => {
    const request = (url, callback) => {
        return fetch(url, {
            method: 'GET',
        }).then(callback)
    }

    const quote = () => {
        const url = 'http://dummyjson.com/quotes/random/'
        request(url, (res) => {
            res.json().then((e) => API.print(e.quote))
        })
    }

    const sexypipe = () => {
        window.setInterval(() => {
            request('http://pipecigarmen.tumblr.com/random', (result) => {
                if (result.ok) return result.text()
                else {
                    API.print('Failed')
                    console.log('Res', result.status, result.ok)
                    return result.code
                }
            }).then((e) => {
                const i = e.indexOf('u-photo')
                const sub = e.slice(i, i + 200)
                const x = sub.indexOf('https://')
                let a =
                    sub.indexOf('.jpg') ||
                    sub.indexOf('.gif') ||
                    sub.indexOf('.png') ||
                    sub.indexOf('.jpeg')
                if (a) {
                    const out = sub.slice(x, a + 4)
                    API.print("<img src='" + out + "'/>")
                } else {
                    let a = sub.indexOf('.mp4') || sub.indexOf('.mpg')
                    const out = sub.slice(x, a + 4)
                    API.print(
                        [
                            "<video width='720' height='480' autoplay>",
                            "<source src='" + out + "' type='video/mp4'>",
                            'Your browser does not support the video tag.',
                            '</video>',
                        ].join()
                    )
                }
            })
        }, 3000)
    }
    const sexycigar = () => {
        const url =
            'https://va.media.tumblr.com/tumblr_sk80s049my1un4q44_720.mp4'
        return [
            [
                "<video width='720' height='480' autoplay>",
                "<source src='" + url + "' type='video/mp4'>",
                'Your browser does not support the video tag.',
                '</video>',
            ].join(),
        ]
    }

    return {
        quote,
        sexycigar,
        sexypipe,
    }
}
export default commandConstructor
