import React, {useMemo} from "react";
import {useEffect, useState} from "react";
import {VideoTile} from "../bricks/VideoTile";
import {Button, Row} from "react-bootstrap";
import Icon from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import {AddVideoForm} from "../bricks/AddVideoForm";



export const VideoList = () => {


    const [videoList, setVideoList]=useState([])
    const [formShown, setFormShown]=useState(false)

    console.log(videoList)
    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'POST',
            data: {},
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        };
        fetch('/video/list', requestOptions)
            .then(response => response.json())
            .then(data => setVideoList(data));
        fetch('/tag/list', requestOptions)
            .then(response => response.json())
            //.then(data => setTagList(data));
// empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    // const tagMap = useMemo(() => {
    //     if (tagList) {
    //         const result = {};
    //         tagList.forEach(tag => result[tag.tadIds] = tag)
    //         return result;
    //         // tagList.map(tag => tag.tagIds)
    //         // return tagList
    //     }
    // }, [tagList])


        const getVideList = () => {
            const videoHtmlList = [];
            videoList.forEach(video => {
                videoHtmlList.push(<VideoTile video={video}/>)
            })
            return videoHtmlList;
        }

        const getChild = ()=> {
        let child;
        if (!videoList) {
            child="loading"
        } else if (videoList) {
            child = getVideList();
        }
        return child
    }

  return(
      <>
          <AddVideoForm formShown={formShown} setFormShown={setFormShown} setVideoList={setVideoList} videoList={videoList}/>
      <Button variant="success" onClick={()=>setFormShown(true)}>
          <Icon path={mdiPlus} size={1} />
              Add video
      </Button>
      <Row xs={1} md={2} className="g-4">
          {getChild()}
      </Row>
      </>
  )
}