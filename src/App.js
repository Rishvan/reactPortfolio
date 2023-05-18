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

import apiBaseUrl from "./constants/constants.js";

const Home = React.forwardRef((props, ref) => {
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}candidate/rizvan`)
      .then((response) => response.json())
      .then((response) => {
        const { data } = response;
        // const newdata = new Candidate(data);
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
        message={`the sample messege is hello`}
        icons={mainBody.icons}
        ref={ref}
      />

      {candidate != null ? (
        <>
          {about.show && (
            <AboutMe
              heading={`${candidate.about}`}
              message={about.message}
              link={about.imageLink}
              imgSize={about.imageSize}
              resume={about.resume}
            />
          )}
          {experiences.show && (
            <Experience experiences={experiences} candidate={candidate} />
          )}
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
});

const App = () => {
  const titleRef = React.useRef();
  const [viewcount, setViewCount] = useState(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}viewCount`)
      .then((response) => response.json())
      .then((response) => {
        const { data } = response;

        setViewCount(data);
      });

    fetch(`${apiBaseUrl}addCount`)
      .then((response) => response.json())
      .then((response) => {
        const { data } = response;

        // setViewCount(data);
      });
  }, []);

  console.log("count : ", viewcount);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL + "/"}>
      {navBar.show && <Navbar ref={titleRef} viewcount={viewcount} />}
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
