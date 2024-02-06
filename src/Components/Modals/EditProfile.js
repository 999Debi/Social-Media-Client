import { useSelector } from "react-redux"
const EditProfile = () => {

  const {Modaltext}=useSelector((state)=>state);
  return (
    <div  className="modal-box" >
      <div style={{padding:"0.6em"}}>
        <h4 style={{margin:"0px"}}>{Modaltext}</h4>
      </div>
      
    </div>
  )
}
export default EditProfile