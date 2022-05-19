import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./core/Layout";
import {VideoList} from "./routes/VideoList";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // const [videoList, setVideoList]=useState()

//     useEffect(() => {
//         // POST request using fetch inside useEffect React hook
//         const requestOptions = {
//             method: 'POST',
//             headers: {},
//             body: JSON.stringify({})
//         };
//         fetch('/video/list', requestOptions)
//             .then(response => response.json())
//             .then(data => setVideoList(data));
//
// // empty dependency array means this effect will only run once (like componentDidMount in classes)
//     }, []);

  // const getVideoHtmlList = () => {
  //   const videoHtmlList = videoList.map(video => <div className="videoContent"><div>{video.title}</div><video src={"/video/get-file?filepath=" + video.path} height="200"/></div>)
  //   return videoHtmlList;
  // }
  //
  // const getChild = ()=> {
  //   let child;
  //   if (!videoList) {
  //     child="loading"
  //   } else if (videoList) {
  //     child = getVideoHtmlList();
  //   }
  //   return child
  // }
  return (

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<VideoList/>} />
                  <Route path="lala" element={"LaLA"} />
              </Route>
          </Routes>
      </BrowserRouter>

  );
}

export default App;
