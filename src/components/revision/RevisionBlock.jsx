// import React, { Component } from 'react'
// import { Col, Row, Button, Form, FormGroup, Label, Input, } from 'reactstrap'

// export default class RevisionBlock extends Component {
//     render() {
//         return (
//             <Col md={12}>
//                 <FormGroup className="revisionGroup">
//                     <p>{this.props.request.requesttext}</p>
//                     {
//                         this.props.revisions.map((val, idx) => {
//                             let revisionId = `revision-${idx}`
//                             return (
//                                 <div key={idx}>
//                                     <Label for={revisionId} hidden>Mix Revisions</Label>
//                                     <Input
//                                         type="textarea"
//                                         name={revisionId}
//                                         data-id={idx}
//                                         id={revisionId}
//                                         placeholder="Enter a mix revision detail..."
//                                         onChange={this.handleFieldChange} />
//                                 </div>
//                             )
//                         })
//                     }
//                     <Button onClick={this.addRevision} id="revisionBtn">+</Button>
//                 </FormGroup>
//             </Col>
//         )
//     }
// }
