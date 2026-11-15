const commandConstructor = (API) => {
    const request = (url) => {
        return fetch(url, {
            method: 'GET',
        })
    }

    const quote = async() => {
        const url = 'http://dummyjson.com/quotes/random/'
        const rq = await request(url)
        const result = await rq.json()
        API.print(result.quote)
        return ""
    }

    const figlet = async(string)=>{
        const url = `https://asciified.thelicato.io/api/v2/ascii?text=${escape(string)}`
        const rq = await request(url)
        const result = await rq.text()
        API.print(result)
        return ""
    }

    async function getRandomTumblrImage(blog,API_KEY) {
        // Retrieve the blog's total post count
        const infoResponse = await fetch(
            `https://api.tumblr.com/v2/blog/${blog}/info?api_key=${API_KEY}`
        )

        const info = await infoResponse.json()
        const totalPosts = info.response.blog.posts

        if (!totalPosts) {
            throw new Error('This blog has no posts.')
        }

        // Pick a random starting position
        const offset = Math.floor(Math.random() * totalPosts)

        // Retrieve a photo post from that position
        const postsResponse = await fetch(
            `/tumblr-api/v2/blog/${blog}/posts/photo?api_key=${API_KEY}&offset=${offset}&limit=1`
        )

        const data = await postsResponse.json()
        const posts = data.response.posts

        if (!posts?.length) {
            throw new Error('No photo post found.')
        }

        // Pick a random image (Tumblr posts can contain multiple images)
        const photos = posts[0].photos

        console.log(posts)
        const photo = photos[Math.floor(Math.random() * photos.length)]

        return photo.original_size.url
    }

    const sexypipe = async () => {
            const API_KEY = 'bM4VMgX9geFTDmFlKSFkVchciOdLKy0qIl23qmIVjnNcKoGzRk'

            const img = await getRandomTumblrImage("pipecigarmen",API_KEY)
            
            let a =
                img.indexOf('.jpg') ||
                img.indexOf('.gif') ||
                img.indexOf('.png') ||
                img.indexOf('.jpeg')
            if (a) {
                API.print("<img src='" + img + "'/>")
            } else {
                API.print(
                    [
                        "<video width='720' height='480' autoplay>",
                        "<source src='" + img + "' type='video/mp4'>",
                        'Your browser does not support the video tag.',
                        '</video>',
                    ].join()
                )
            }
            
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
        figlet,
    }
}
export default commandConstructor
