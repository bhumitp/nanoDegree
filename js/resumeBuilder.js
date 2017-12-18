//Education Object
var education = {
  "schools": [{
    "name": "Kennesaw State University",
    "location": "Marietta, GA",
    "degree": "BS",
    "majors": ["Computer Science"],
    "dates": "2009 - 2014",
    "url": "http://www.ksu.edu"
  }],
  "onlineCourses": [{
    "title": "JavaScript Crash Course",
    "school": "udacity",
    "dates": "2014",
    "url": "http://www.udacity.com/course/ud804"
  }]
}

//Bio Object
var bio = {
  "name": "Bhumit Patel",
  "role": "Web Developer",
  "contacts": {
    "mobile": "650-555-5555",
    "email": "bhumit@gmail.com",
    "github": "bhumitp",
    "twitter": "@bhumitp",
    "location": "Atlanta"
  },
  "welcomeMessage": "Hello there!! Welcome to my portfolio",
  "skills": ["JAVA", "SQL", "HTML", "JS"],
  "biopic": "images/fry.jpg"
}

//work Object
var work = {
  "jobs": [{
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
    "images": ["images/project1.jpg"],
    "url": "http://google.com/"
  }]
}

//Adding code for template

// Added encapsulation in one of the functions. I wanted to try out both so kept both ways in here

//Bio function
bio.display = function(){
  //Adding name and role
  var formattedName = HTMLheaderName.replace("%data%", bio.name);
  var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
  var formattedPicture = HTMLbioPic.replace("%data%", bio.biopic);
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

  for (i = 0; i < bio.skills.length; i++) {
    $("ul#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
    //$("ul#skills").append(formattedSkills);
  }
  $("ul#footerContacts").append(formattedMobile, formattedEmail, formattedGithub,
    formattedTwitter, formattedLocation);;
}

//Work function
work.display = function() {
  if (work.jobs.length > 0) {
        $("#workExperience").append(HTMLworkStart);
        for (i in work.jobs) {
          //Formatting work Object
            var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[i].employer);
            var formattedWorkTitle = HTMLworkTitle.replace("%data%", work.jobs[i].title);
            var formattedWorkLocation = HTMLworkLocation.replace("%data%", work.jobs[i].location);
            var formattedDatesWorked = HTMLworkDates.replace("%data%", work.jobs[i].dates);
            var formattedWorkDescription = HTMLworkDescription.replace("%data%", work.jobs[i].description);

            //Adding employer and title
            var formattedEmployerWorkTitle = formattedEmployer + formattedWorkTitle;

            //Appending to work object
            $(".work-entry:last").append(formattedEmployerWorkTitle);
            $(".work-entry:last").append(formattedWorkLocation);
            $(".work-entry:last").append(formattedDatesWorked);
            $(".work-entry:last").append(formattedWorkDescription);
        }
    }
}

//Project Function
projects.display = function() {
  if (projects.projects.length > 0) {
      for (i in projects.projects) {
          $("#projects").append(HTMLprojectStart);

          var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title).replace("#", projects.projects[i].url);
          $(".project-entry:last").append(formattedTitle);

          var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[i].dates);
          $(".project-entry:last").append(formattedDates);

          var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);
          $(".project-entry:last").append(formattedDescription);

          for (var images in projects.projects[i].images) {
              var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[i].images[images]);
              $(".project-entry:last").append(formattedImage);
          }
      }
  }
};

//Education Function
education.display = function() {
  if (education.schools.length > 0 || education.onlineCourses.length > 0) {
         for (i in education.schools) {
    //Adding work experience
    $("#education").append(HTMLschoolStart);

    //Formatting school
    var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[i].name).replace("#", education.schools[i].url);
    var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[i].degree);
    $(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree);

     //Formatting Dates
     var formattedDates = HTMLschoolDates.replace("%data%", education.schools[i].dates);
     $(".education-entry:last").append(formattedDates);

     //Formatting Major
     var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[i].majors);
     $(".education-entry:last").append(formattedMajor);

    //Formatting Location
    var formattedCity = HTMLschoolLocation.replace("%data%", education.schools[i].location);
    $(".education-entry:last").append(formattedCity);

    //Formatting Online onlineCourses
    if (education.onlineCourses.length > 0) {
            $("#education").append(HTMLonlineClasses);
            for (i in education.onlineCourses) {
                $("#education").append(HTMLschoolStart);
                var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[i].title).replace("#", education.onlineCourses[i].url);
                var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[i].school);
                var formattedOnlineDates = HTMLonlineDates.replace("%data%", education.onlineCourses[i].dates);
                var formattedOnlineURL = HTMLonlineURL.replace("%data%", education.onlineCourses[i].url).replace("#", education.onlineCourses[i].url);
                $(".education-entry:last").append(formattedOnlineTitle + formattedOnlineSchool);
                $(".education-entry:last").append(formattedOnlineDates);
                $(".education-entry:last").append(formattedOnlineURL);
              }
          }
      }
    }
  }


//Calling all the functions
work.display();
projects.display();
education.display();
bio.display();

//Adding google map
$("#mapDiv").append(googleMap);
