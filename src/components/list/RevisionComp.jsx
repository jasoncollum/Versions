import React, { Component } from 'react'
import { Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { FiMinus } from 'react-icons/fi'

export default class RevisionComp extends Component {
    state = {
        hide: false
    }

    render() {
        const hide = this.state.hide ? 'none' : '';
        return (
            <React.Fragment>
                {
                    <InputGroup>
                        <Input
                            id={this.props.revision.id}
                            name={this.props.revision.id}
                            type="text"
                            placeholder="Enter a mix revision"
                            defaultValue={this.props.revision.revisionText}
                            onChange={this.props.handleFieldChange}
                            style={{ marginBottom: '5px', display: `${hide}` }}
                        />
                        <InputGroupAddon addonType="append">
                            <FiMinus
                                onClick={() => this.setState({ hide: true })}
                                style={{ margin: 'auto', display: `${hide}` }} />
                        </InputGroupAddon>
                    </InputGroup>

                }
            </React.Fragment>
        )
    }
}