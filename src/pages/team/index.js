import Preview from './components/preview'
import { useParams } from "react-router-dom";

const Team = () => {
  let { id } = useParams();
  return (<Preview id={id}></Preview>)
}

export default Team