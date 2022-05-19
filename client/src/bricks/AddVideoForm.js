import {Button, Modal, Form} from "react-bootstrap";
import {useState} from "react";

export const VideoForm = (props) => {
    const [formData, setFormData] = useState(false);
    console.log(formData)

    const createVideo = () => {
        fetch("video/create", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => response.json())
            .then(data=> {
                props.setVideoList(current => {
                    const newList = current.slice();//making a coppy of array
                    newList.push(data)
                    return newList
                })
                props.setFormShown(false);
                console.log(data)
            })
    }

    return (
        <>

            <Modal show={props.formShown} onHide={()=>props.setFormShown(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter a title for the video</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                          onChange={(event)=>
                                          {setFormData(current=>{
                                              const newData = {...current};
                                              newData.title = event.target.value;
                                              return newData;
                                          })}}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Add tags</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="#smellycat #tiktoktrends"
                                          onChange={(event)=>
                                          {setFormData(current=>{
                                              const newData = {...current};
                                              newData.tagIds = Object.values(event.target.value);
                                              // newData.tagIds.push(event.target.value)
                                              return newData;
                                          })}}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>props.setFormShown(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={createVideo} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
