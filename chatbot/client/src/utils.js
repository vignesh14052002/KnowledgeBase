function handleAddContact(states) {
  let val = document.querySelector("#addcontact").value;
  console.log(val);
  postdata("contact", {
    user_name: states.user.name,
    user_email: states.user.email,
    contact_name: val,
  });
}
function postdata(path, data) {
  fetch("http://localhost:3001/" + path, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((r) => console.log(r));
}
function handleSearch(e, states) {
  states.setDisplay_contacts(
    states.user_contacts.filter((v) => v.name.startsWith(e.target.value))
  );
}
function getProfileImg(imageNumber) {
  if (typeof imageNumber == "number")
    return `https://picsum.photos/id/${Math.floor(imageNumber)}/100/100`;
  return imageNumber;
}


export {
  handleAddContact,
  handleSearch,
  getProfileImg,
};
