import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false
    }
  }

  toggleShowDetails = () => {
    this.setState({showDetails: !this.state.showDetails})
  }

  likeClickHandler = (e) => {
    e.preventDefault()
    this.props.likeFn(this.props.blog)
  }

  removeClickHandler = (e) => {
    e.preventDefault()

    if (window.confirm(`delete '${this.props.blog.title}' by ${this.props.blog.author}`)) {
      this.props.removeFn(this.props.blog._id)
    }
  }

  render() {
    const {blog} = this.props
    //Older entries in DB do not have a user specified.
    const addedBy = blog.user === undefined ? "Unknown" : blog.user.name

    const details = () => {
      return (
        <div className="blog-item-details">
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={this.likeClickHandler}>like</button></p>
          <p>added by {addedBy}</p>
          {(blog.user === undefined || this.props.currentUsername === blog.user.username) ?
            <button onClick={this.removeClickHandler}>delete</button>
            : ""
          }
          
        </div>
      )
    }

    return (
      <div className="blog-item">
        <span className="js-toggle-details" onClick={this.toggleShowDetails}> {blog.title} {blog.author}</span>
        {this.state.showDetails === true ? details() : ""}
      </div>
    )
  }
}

export default Blog