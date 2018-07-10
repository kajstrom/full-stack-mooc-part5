let token = null

const blogs = [
    {
        _id: "5a451df7571c224a31b5c8ce",
        title: "Example 1",
        author: "Author 1",
        url: "http://google.com",
        likes: 0,
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "Kaj",
            name: "Kaj Ström"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = (newToken) => {
    token = newToken
}

export default {getAll, blogs, setToken}