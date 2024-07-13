let sections = document.querySelectorAll("section"); // Node list of all section
let list = document.getElementById("navbar__list"); // ul in nav bar
// add links in the nav bar
for (const section of sections) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  li.appendChild(link);
  list.appendChild(li);
  link.className = "menu__link";
  link.textContent = section.dataset.nav;
  link.setAttribute("href", `#${section.id}`);
}
// smooth scrolling code
list.addEventListener("click", (evnt) => {
  if (evnt.target.matches("a")) {
    evnt.preventDefault();
    sections.forEach((section) => {
      if (evnt.target.textContent === section.dataset.nav) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
    // this for actice state
    sections.forEach((section) => {
      changeClass(section, isActive(secPos(section)));
    });
  }
});
// active state
function secPos(section) {
  return section.getBoundingClientRect();
}
function isActive(position) {
  if (position.top < 70 && position.top > -200) {
    return true;
  } else {
    return false;
  }
}
function changeClass(section, isActive) {
  if (isActive) {
    section.classList.add("active");
  } else {
    section.classList.remove("active");
  }
}
document.addEventListener("scroll", () => {
  sections.forEach((section) => {
    changeClass(section, isActive(secPos(section)));
  });
});

// comments section
const emailReg = /^[\w\.-]+@[\w\.-]+\.[a-z]+$/; //a regular expression to check the validilty of the email name
const subBtn = document.getElementById("submit-btn");
const allInp = document.forms[0].querySelectorAll("[required]");

subBtn.addEventListener("click", (evnt) => {
  evnt.preventDefault();
  let isFilled = true;
  for (const input of allInp) {
    if (!input.value) {
      // check if the value is falsy value
      alert(input.name + ": is not filled");
      isFilled = false;
    }
  }
  if (isFilled) {
    const emailVal = document.getElementById("email").value;

    if (!emailReg.test(emailVal)) {
      window.alert("Invalid Email adress");
    } else {
      const form = document.forms[0]; //the form form
      // form inputs
      const name = form.name.value;
      const comment = form.comment.value;
      const email = form.email.value;
      // ------------------------------------

      const commentsContainer = document.getElementById("appended-comments");
      const appendedComment = document.createElement("div");
      const paraComment = document.createElement("p");
      //button controll the show more or show less
      const showBtn = document.createElement("button");

      appendedComment.className = "comment";
      paraComment.textContent = comment.trim();
      appendedComment.insertAdjacentHTML(
        "beforeend",
        `<h3>${name}</h3><span>${email}</span>`
      );
      appendedComment.appendChild(paraComment);
      commentsContainer.appendChild(appendedComment);

      if (paraComment.clientHeight > 80) {
        appendedComment.appendChild(showBtn);
        showBtn.textContent = "Show More";
        paraComment.style.height = "80px";
      } else {
        showBtn.remove();
      }
      showBtn.addEventListener("click", function () {
        // in each click it checks  the value of the button button
        let isShowMore = showBtn.textContent === "Show More" ? true : false;
        if (isShowMore) {
          paraComment.style.height = "auto";
          showBtn.textContent = "Show Less";
          isShowMore = false;
        } else {
          paraComment.style.height = "80px";
          showBtn.textContent = "Show More";
          isShowMore = true;
        }
      });
    }
    // reset the form 
    document.forms[0].reset();
  }
});
