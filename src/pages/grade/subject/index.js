import GradeView from './components/gradeview'
import { useParams } from "react-router-dom";

const SubjectGrade = () => {
  let { id } = useParams();
  return (<GradeView id={id}></GradeView>)
}

export default SubjectGrade