const getId = () => (100000*Math.random()).toFixed(0)

const actionCreatorFor = {
    vote(id) {
        return {
            type: "VOTE",
            data: {id}
        }
    },

    create(anecdote) {
        return {
            type: "CREATE",
            data: {
                id: getId(),
                content: anecdote,
                votes: 0
            }
        }
    }
}

export default actionCreatorFor