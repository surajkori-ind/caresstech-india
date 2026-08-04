const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const data = {};

const fd = new FormData(form);

for (const [key, value] of fd.entries()) {

data[key] = value;

}

data.interested_in = [];

document.querySelectorAll(
'input[name="interest"]:checked'
).forEach((item)=>{

data.interested_in.push(item.value);

});

const response = await fetch("/api/contact", {

method: "POST",

headers: {

"Content-Type":"application/json"

},

body: JSON.stringify(data)

});

if(response.ok){

alert("Thank you! Your enquiry has been submitted.");

form.reset();

}else{

alert("Submission failed.");

}

});
