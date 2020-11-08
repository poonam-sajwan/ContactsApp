// to show all contacts and all messages
const toggler=()=>{

  const message=document.querySelector(".message-button");
  const contact=document.querySelector(".contact-button");

  contact.addEventListener('click',()=>{
    contact.classList.add('selected');
  });

  message.addEventListener('click',()=>{
    message.classList.add('selected');
  });

}

toggler();
//
//
// // to show respective messages of single contactSchema
// const singleContact=()=>{
//   const singlePerson=document.querySelectorAll(".message-info");
//   var i;
//   for(i=0;i<singlePerson.length;i++)
//   {
//     // console.log(i);
//     singlePerson[i].addEventListener('click',()=>{
//     // console.log(i);
//
//       // singlePerson[i].style.color = "red";
//     });
//   }
//
// }
// singleContact();
