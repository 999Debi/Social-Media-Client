import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SkateboardingIcon from "@mui/icons-material/Skateboarding";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useMediaQuery } from "@mui/material";
const AboutInfo = ({ User }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:700px)");
  const { firstname, lastname, About } = User;
  // const { Graduationyear, Specialization, Skills, Work, Clubs, Hobbies } =
  //   About;
  return (
    <>
      (
      <div
        style={{
          position: "relative",
          // top: "7em",
          top: "6.5em",
          width: "40vw",
          minWidth: `${isNonMobileScreens ? "500px" : "0px"}`,
          margin: "auto",
          backgroundColor: "white",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            padding: "2em",
            borderRadius: "20px",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "1em" }}>About</h3>
          <table className="about-table">
            {/* <tr>
              <th>INFO</th>
            </tr> */}
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{About.firstname}</td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td>Last Name</td>
                <td>{About.lastname}</td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td>
                  <SchoolIcon />
                  Graduation year
                </td>

                <td>{About.Graduationyear}</td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td>
                  <AutoStoriesIcon />
                  Specialization
                </td>
                <td>{About.Specialization}</td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td>
                  <EngineeringIcon />
                  Skills ans Experties
                </td>
                <td>{About.Skills}</td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td>
                  <WorkIcon />
                  Work Experience
                </td>
                <td>{About.Work}</td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td>
                  <ApartmentIcon />
                  Clubs/Fest
                </td>
                <td>{About.Clubs}</td>
              </tr>
            </tbody>


          </table>
        </div>
      </div>
      )
    </>
  );
};
export default AboutInfo;
