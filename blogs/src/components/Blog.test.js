import React from "react"
import {shallow} from "enzyme"
import Blog from "./Blog"

describe.only("<Blog />", () => {
    it("displays only title and author in initial state", () => {
        const blog = {
            title: "Test",
            author: "Author",
            url: "http://google.com",
            likes: 2
        }

        const blogComponent = shallow(<Blog blog={blog} />)

        const blogItem = blogComponent.find(".blog-item")
        const blogDetails = blogComponent.find(".blog-item-details")

        expect(blogItem.text()).toContain(`${blog.title} ${blog.author}`)
        expect(blogDetails.length).toBe(0)
    })

    it("displays details when title and author is clicked", () => {
        const blog = {
            title: "Test",
            author: "Author",
            url: "http://google.com",
            likes: 2
        }

        const blogComponent = shallow(<Blog blog={blog} />)
        
        const blogTitle = blogComponent.find(".js-toggle-details")
        blogTitle.simulate("click")

        const blogDetails = blogComponent.find(".blog-item-details")
        expect(blogDetails.text()).toContain("2 likes")
    })
})