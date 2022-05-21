import {Button, Modal, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

export const AddVideoForm = (props) => {
    const [formData, setFormData] = useState(false);
    const [formDataVideo, setFormDataVideo] = useState()

    // console.log(formData)
    // console.log(formDataVideo)
    // console.log(props.videoList.id)

    const createVideo = () => { // creating a new object with a title, then id is added on the backend side
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
                    const newList = current.slice();//making a copy of array
                    newList.push(data)
                    return newList
                })
                // props.setFormShown(false); - change after
                console.log(data)
            })
    }


    async function uploadVideo() {

        const form_data = new FormData();
        // form_data.append(3);
        // form_data.append();

        let res = await axios.post('/video/upload', form_data)
            // { headers: form_data.getHeaders() });

        let data = res.data;
        console.log(data);
    }


    const mergingIdAndFile = () => {
        let a = Object.keys(props.videoList).pop(); //getting id of the last added object/ should press "Save Changes" before adding a video file to get the latest id of an object from server
        let b = formDataVideo //uploaded video
        const c = {}
        c.id = a
        c.file = b
        return c // merged id and video to a new variable for sending on server
    }
    console.log(mergingIdAndFile())


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
                        <Button variant="primary" onClick={createVideo} >
                            Save Changes
                        </Button>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Add video</Form.Label>
                            <Form.Control type="file"
                                          onChange={(e) =>
                                              setFormDataVideo(e.target.files[0])}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={uploadVideo}>
                        Upload video
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
