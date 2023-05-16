export default class Candidate {
  constructor(basicinformation) {
    // , experiences, skills, projects
    console.log(basicinformation);
    console.log(basicinformation["name"]);
    this.name = basicinformation["name"];
    this.about = basicinformation["about"];
    this.image = basicinformation["image"];
    this.experiences = basicinformation["experiences"].map(function (e) {
      return new Experiences(e);
    });
    this.skills = basicinformation["skills"].map(function (e) {
      return new Skills(e);
    });

    this.projects = basicinformation["projects"].map(function (e) {
      return new Projects(e);
    });
  }
}

class Experiences {
  constructor(data) {
    this["name "] = data["name"];
    this["logo "] = data["logo"];
    this["time "] = data["time"];
  }
}

class Skills {
  constructor(data) {
    this["name "] = data["name"];
    this["type "] = data["type"];
    this["percentage "] = data["percentage"];
  }
}

class Projects {
  constructor(data) {
    this["name "] = data["name"];
    this["details "] = data["details"];
    this["link "] = data["link"];
  }
}
