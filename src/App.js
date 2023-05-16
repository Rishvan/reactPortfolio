import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  navBar,
  mainBody,
  about,
  repos,
  leadership,
  skills,
  getInTouch,
  experiences,
} from "./editable-stuff/config.js";
import MainBody from "./components/home/MainBody";
import AboutMe from "./components/home/AboutMe";
import Project from "./components/home/Project";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Skills from "./components/home/Skills";
// import { Blog } from "./components/blog/Blog";
// import BlogPost from "./components/blog/BlogPost";
import GetInTouch from "./components/home/GetInTouch.jsx";
import Leadership from "./components/home/Leadership.jsx";

import Experience from "./components/home/Experience";

import { useEffect } from "react";
import Candidate from "./models/candidate.js";
import { Spinner } from "react-bootstrap";

const Home = React.forwardRef((props, ref) => {
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    fetch("http://192.168.1.28/api/candidate/rizvan")
      .then((response) => response.json())
      .then((response) => {
        const { data } = response;
        const newdata = new Candidate(data);
        setCandidate(data);
        // console.log("newdata", newdata);
      });
  }, []);

  console.log("candidatesssss", candidate);
  // if (candidate == null) {
  //   return (
  //     <view>
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </view>
  //   );
  // }

  return (
    <>
      <MainBody
        gradient={mainBody.gradientColors}
        // title={`${mainBody.firstName} ${mainBody.middleName} ${mainBody.lastName}`}
        title={`${candidate?.name}`}
        message={mainBody.message}
        icons={mainBody.icons}
        ref={ref}
      />

      {candidate != null ? (
        <>
          {about.show && (
            <AboutMe
              heading={about.heading}
              message={about.message}
              link={about.imageLink}
              imgSize={about.imageSize}
              resume={about.resume}
            />
          )}
          {experiences.show && <Experience experiences={experiences} />}
          {repos.show && (
            <Project
              heading={repos.heading}
              username={repos.gitHubUsername}
              length={repos.reposLength}
              specfic={repos.specificRepos}
            />
          )}
          {leadership.show && (
            <Leadership
              heading={leadership.heading}
              message={leadership.message}
              img={leadership.images}
              imageSize={leadership.imageSize}
            />
          )}
          {skills.show && (
            <Skills
              heading={skills.heading}
              hardSkills={skills.hardSkills}
              softSkills={skills.softSkills}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <>
      <MainBody
        gradient={mainBody.gradientColors}
        title={`${mainBody.firstName} ${mainBody.middleName} ${mainBody.lastName}`}
        // title={`${candidate.name}`}
        message={mainBody.message}
        icons={mainBody.icons}
        ref={ref}
      />
      {about.show && (
        <AboutMe
          heading={about.heading}
          message={about.message}
          link={about.imageLink}
          imgSize={about.imageSize}
          resume={about.resume}
        />
      )}
      {experiences.show && <Experience experiences={experiences} />}
      {repos.show && (
        <Project
          heading={repos.heading}
          username={repos.gitHubUsername}
          length={repos.reposLength}
          specfic={repos.specificRepos}
        />
      )}
      {leadership.show && (
        <Leadership
          heading={leadership.heading}
          message={leadership.message}
          img={leadership.images}
          imageSize={leadership.imageSize}
        />
      )}
      {skills.show && (
        <Skills
          heading={skills.heading}
          hardSkills={skills.hardSkills}
          softSkills={skills.softSkills}
        />
      )}
    </>
  );
});

const App = () => {
  const titleRef = React.useRef();

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL + "/"}>
      {navBar.show && <Navbar ref={titleRef} />}
      <Routes>
        <Route path="/" exact element={<Home ref={titleRef} />} />
      </Routes>
      {/* {false && <Route path="/blog" exact component={Blog} />}
      {false && <Route path="/blog/:id" component={BlogPost} />} */}
      <Footer>
        {getInTouch.show && (
          <GetInTouch
            heading={getInTouch.heading}
            message={getInTouch.message}
            email={getInTouch.email}
          />
        )}
      </Footer>
    </BrowserRouter>
  );
};

export default App;
