import React from "react"
import PropTypes from "prop-types"

class BlogForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            author: "",
            url: ""
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    addHandler = (e) => {
        e.preventDefault()
        this.props.addFn(this.state)
        this.setState({
            title: "",
            author: "",
            url: ""
        })
    }

    render() {
        return (
            <form onSubmit={this.addHandler}>
                <div>
                    <label>title</label>
                    <input type="text" name="title" onChange={this.changeHandler} value={this.state.title} />
                </div>
                <div>
                    <label>author</label>
                    <input type="text" name="author" onChange={this.changeHandler} value={this.state.author} />
                </div>
                <div>
                    <label>url</label>
                    <input type="text" name="url" onChange={this.changeHandler} value={this.state.url} />
                </div>
                <input type="submit" value="create" />
            </form>
        )
    }
}

BlogForm.propTypes = {
    addFn: PropTypes.func.isRequired
}

export default BlogForm