import React from "react"
import {mount} from "enzyme"
import App from "./App"
import Blog from "./components/Blog"
jest.mock("./services/blogs")
import blogService from "./services/blogs"

describe("<App />", () => {
    let app 

    describe("when user is not logged in", () => {
        beforeAll(() => {
            app = mount(<App />)
        })

        it("does not render blogs", () => {
            app.update()
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toBe(0)
        })
    })

    describe("when user is logged in", () => {
        beforeAll(() => {
            localStorage.setItem("loggedInUser", JSON.stringify({
                name: "Kaj Ström",
                token: "asdasdasda",
                username: "Kaj"
            }))
            app = mount(<App />)
        })

        it("renders blogs", () => {
            app.update()

            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toBe(blogService.blogs.length)
        })
    })
})