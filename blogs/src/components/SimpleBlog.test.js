import React from "react"
import {shallow} from "enzyme"
import SimpleBlog from "./SimpleBlog"

describe.only("<SimpleBlog />", () => {
    it("renders blog content", () => {
        const blog = {
            likes: 0,
            title: "Testing",
            author: "Tester"
        }
        const onClick = () => {}

        const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)

        const titleDiv = blogComponent.find(".title")
        const likeDiv = blogComponent.find(".likes")

        expect(titleDiv.text()).toContain(`${blog.title} ${blog.author}`)
        expect(likeDiv.text()).toContain("blog has 0 likes")
    })

    it("calls onClick twice is like button is clicked", () => {
        const blog = {
            likes: 0,
            title: "Testing",
            author: "Tester"
        }
        const onClick = jest.fn()

        const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick} />)

        const likeButton = blogComponent.find("button")
        likeButton.simulate("click")
        likeButton.simulate("click")

        expect(onClick.mock.calls.length).toBe(2)
    })
});