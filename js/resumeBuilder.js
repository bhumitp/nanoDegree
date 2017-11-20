//Education Object
var education = {
  "schools": [{
    "name": "Kennesaw State University",
    "city": "Marietta, GA",
    "degree": "BS",
    "major": "Computer Science",
    "dates": "2009 - 2014",
    "url": "http://www.ksu.edu"
  }],
  "onlineCourses": [{
    "title": "JavaScript Crash Course",
    "school": "udacity",
    "dates": 2014,
    "url": "http://www.udacity.com/course/ud804"
  }]
}

//Bio Object
var bio = {
  "name": "Bhumit Patel",
  "role": "Web Developer",
  "contacts": {
    "mobile": "650-555-5555",
    "email": "bhumitvpatel@gmail.com",
    "github": "bhumitp",
    "twitter": "@bhumitp",
    "location": "Atlanta"
  },
  "welcomeMessage": "Hello there!! Welcome to my portfolio",
  "skills": ["JAVA", "SQL", "HTML", "JS"],
  "bioPic": "images/fry.jpg"
}

//work Object
var work = {
  "jobs": [
    {
      "employer": "AT&T",
      "title": "Software Engineer",
      "location": "Atlanta, GA",
      "dates": "June 2014 - Current",
      "description": "Apply the principles and techniques of computer science, engineering, and mathematical analysis to the design, development, testing, and evaluation of the software and the systems that enable computers to perform their many applications."
    },
    {
      "employer": "AT&T",
      "title": "Software Intern",
      "location": "Atlanta, GA",
      "dates": "June 2013 - June 2014",
      "description": "Apply the principles and techniques of computer science, engineering, and mathematical analysis to the design, development, testing, and evaluation of the software and the systems that enable computers to perform their many applications."
    }
  ]
}

//project Object
var projects = {
  "projects": [{
    "title": "Sample project",
    "dates": "2014",
    "description": "Did project for school assignment",
    "images": [
      "https://www.google.com",
      "https://www.yahoo.com"
    ]
  }]
}

//Adding code for template

//Bio function
function displayBio() {
    //Adding name and role
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedPicture = HTMLbioPic.replace("%data%", bio.bioPic);
    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    var formattedMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);


    $("#header").prepend(formattedName, formattedRole);
    $("ul#topContacts").append(formattedMobile, formattedEmail, formattedGithub,
                               formattedTwitter, formattedLocation);
    $("#header").append(formattedPicture, formattedMessage, HTMLskillsStart);

    for(i = 0; i < bio.skills.length; i++){
      $("ul#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
      //$("ul#skills").append(formattedSkills);
    }
    $("ul#footerContacts").append(formattedMobile, formattedEmail, formattedGithub,
                               formattedTwitter, formattedLocation);;
}

//Work function
function displayWork() {
  for (job in work.jobs) {
    //Adding work experience
    $("#workExperience").append(HTMLworkStart);

    //Formatting work experience and title
    var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
    var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
    var formattedEmployerTitle = formattedEmployer + formattedTitle;
    $(".work-entry:last").append(formattedEmployerTitle);

    //Formatting dates
    var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
    $(".work-entry:last").append(formattedDates);

    //Formatting description
    var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
    $(".work-entry:last").append(formattedDescription);
  }
}

//Project Function
projects.display = function () {
  for(project in projects.projects){
    $("#projects").append(HTMLprojectStart);

    var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
    $(".project-entry:last").append(formattedTitle);

    var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
    $(".project-entry:last").append(formattedDates);

    var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
    $(".project-entry:last").append(formattedDescription);

    if (projects.projects[project].images.length > 0) {
      for(image in projects.projects[project].images){
        var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
        $(".project-entry:last").append(formattedImage);
      }
    }
  };
}

//Education Function
function displayEducation() {
  for (school in education.schools) {
    //Adding work experience
    $("#education").append(HTMLschoolStart);

    //Formatting school
    var formattedSchool = HTMLschoolName.replace("%data%", education.schools[school].name);
    $(".education-entry:last").append(formattedSchool);

    //Formatting Dates
    var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
    $(".education-entry:last").append(formattedDates);

    //Formatting Major
    var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].major);
    $(".education-entry:last").append(formattedMajor);

    //Formatting Location
    var formattedCity = HTMLschoolLocation.replace("%data%", education.schools[school].city);
    $(".education-entry:last").append(formattedCity);
  }
}

//Calling all the functions
displayWork();
projects.display();
//displayProjects();
displayEducation();
displayBio();




// //Collecting click locations
// $(document).click(function(loc){
//   var x = loc.pageX;
//   var y = loc.pageY;
//
//   logClicks(x,y);
// });
//
// function locationizer(work_obj){
//   var locationArray = [];
//
//   for (job in work_obj.jobs){
//     var newLocation = work_obj.jobs[job].location;
//     locationArray.push(newLocation);
//   }
//   return locationArray;
// }
// console.log(locationizer(work));
