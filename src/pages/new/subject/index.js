import EditView from './components/editview'
import { useParams } from "react-router-dom";

const NewSubject = () => {
  let { id } = useParams();
  return (<EditView id={id}></EditView>)
}

export default NewSubject