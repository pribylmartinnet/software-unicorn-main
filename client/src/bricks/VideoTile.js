import React, {useState} from "react";
import {Card, Col} from "react-bootstrap";
import JoLPlayer from "jol-player";



    export const VideoTile = (props) => {


    return (

        <Col>
            <Card>
                <JoLPlayer
                    option={{
                        videoSrc:"/video/get-file?filepath=" + props.video.path, //getting video from the sever
                        width: 400,
                        height: 300,
                        pausePlacement: "center",
                        language: "en",
                    }}
                />
                <Card.Body>
                    <Card.Title>{props.video.title}</Card.Title>
                    <Card.Text>
                        Tags: {props.video.tagIds}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>

    )}
