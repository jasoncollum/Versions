import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

export default class SongList extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <h1>Under Construction</h1>
                {console.log(this.props.songs)}
                <section className="songList">
                    {
                        this.props.requests.map(request =>
                            // <AnimalCard key={animal.id} animal={animal} {...this.props} />
                            <div key={request.id}>{request.requestText}</div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}
