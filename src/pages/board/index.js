import DetailView from './components/detailview'
import { useParams } from "react-router-dom";

const Board = () => {
  let { id } = useParams();
  return (<DetailView id={id}></DetailView>)
}

export default Board