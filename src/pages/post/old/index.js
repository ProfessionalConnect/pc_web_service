import PostView from './components/postview'
import { useParams } from "react-router-dom";

const OldPost = () => {
  let { id } = useParams();
  return (<PostView id={id}></PostView>)
}

export default OldPost