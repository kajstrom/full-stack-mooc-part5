import React from 'react'
import Blog from './components/Blog'
import BlogForm from "./components/BlogForm"
import blogService from './services/blogs'
import loginService from "./services/login"
import Togglable from "./components/Togglable"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      loginUsername: "",
      loginPassword: "",
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    let user = window.localStorage.getItem("loggedInUser")
    if (user) {
      user = JSON.parse(user)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  handleLoginFormChanges = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  login = async (e) => {
    e.preventDefault()
    
    try {
      const user = await loginService.login({
        username: this.state.loginUsername,
        password: this.state.loginPassword
      })

      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({loginUsername: "", loginPassword: "", user})
    } catch (exception) {
      this.setState({
        notification: {
          message: "wrong username or password",
          type: "error"
        }
      })
    }
  }

  logout = () => {
    window.localStorage.removeItem("loggedInUser")
    this.setState({user: null})
  }

  add = async (newBlog) => {  
    try {
        const blog = await blogService.create(newBlog)
        this.setState({
          blogs: this.state.blogs.concat(blog),
          notification: {
            message: `a new blog "${blog.title}" by ${blog.author} added`,
            type: "success"
          }
        })
    } catch (exception) {
        console.log(exception)
    }
  }

  incrementLikes = async (blog) => {
      let {likes, author, title, url, user, _id} = blog
      user = user === undefined ? undefined : user._id

      likes += 1

      try {
        const updatedBlog = {
          user,
          likes,
          author,
          title,
          url
        }

        const resp = await blogService.update(_id, updatedBlog)
        
        this.setState({
          blogs: this.state.blogs.filter((b) => b._id !== _id).concat(resp)
        })
      } catch (exception) {
        console.log(exception)
      }
  }

  remove = async (id) => {
    try {
      await blogService.remove(id)

      this.setState({
        blogs: this.state.blogs.filter((b) => b._id !== id)
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  flashMessage = () => {
    setTimeout(() => {
      this.setState({notification: null})
    }, 5000)

    return (
      <div className={this.state.notification.type}>
        {this.state.notification.message}
      </div>
    )
  }

  render() {
    const sortedBlogs = this.state.blogs.sort((b1, b2) => {
      if (b1.likes === b2.likes) {
        return 0
      }

      return b1.likes < b2.likes ? 1 : -1
    })


    if (this.state.user === null) {
      return (
        <div>
          <h2>Log in to application</h2>

          {this.state.notification !== null ?
            this.flashMessage() : ""}

          <Togglable buttonLabel="login">
            <form onSubmit={this.login}>
            <div>
              <label>username</label>
              <input type="text" value={this.state.loginUsername} onChange={this.handleLoginFormChanges} name="loginUsername" />
            </div>
            <div>
              <label>password</label>
              <input type="password" value={this.state.loginPassword} onChange={this.handleLoginFormChanges} name="loginPassword" />
            </div>
            <input type="submit" value="login" />
            </form>
          </Togglable>
        </div>
      )
    } else {
      return (
        <div>
          <h2>blogs</h2>
          {this.state.notification !== null ?
            this.flashMessage() : ""}
          <p>
            {this.state.user.name} logged in
            <input type="button" value="logout" onClick={this.logout} />
          </p>

          <BlogForm addFn={this.add} />

          {sortedBlogs.map(blog => 
            <Blog 
              currentUsername={this.state.user.username}
              removeFn={this.remove}
              likeFn={this.incrementLikes}
              key={blog._id} blog={blog}
              />
          )}
        </div>
      );
    }
  }
}

export default App;
