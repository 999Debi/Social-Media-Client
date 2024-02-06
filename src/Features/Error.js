import { Link } from "react-router-dom";
import img from "../assets/not-found.svg";


const Error = () => {
  return (
    <div style={{textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%"}}>
      <div>
        <img src={img} alt="not found "  style={{display:"block",marginBottom:"2rem",maxWidth:"600px"}}/>
        <h3 style={{marginBottom:"0.5rem"}}>Ohh! Page not found</h3>
        <p style={{marginTop:"0px",marginBottom:"0.5rem"}}>qwertyuiop asdfj .jnas.</p>
        <Link to="/home">back home </Link>
      </div>
    </div>
  );
};
export default Error;