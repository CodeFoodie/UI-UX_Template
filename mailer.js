$(function(){
  document.getElementById('message').oninput= function () {
    if(this.value.length < 8){
      this.setCustomValidity("Please provide a comprehensive message");
    } else {
      this.setCustomValidity("");
    }
  };
});

const sendMail = () => {
    let subject = document.getElementById('subject').value;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    if(message.trim() == ''){
      document.getElementById('message').value = '';
      document.getElementById('message').focus();
      return false;
    }

    if(message.trim() != '' && message.trim().length < 8 ){
     return false; 
    }
    
    message = `${name} ${email} </br> ${message}`;

    document.getElementById('form-messages').innerHTML = '<p style="color: yellow">Please wait ...</p>';

    const uri = `https://openemailapi.herokuapp.com/api/v1/sendmail`;
    const h = new Headers({ 'content-type': 'application/json'});
    const body = {
        receiver: 'torsami77@gmail.com',
        subject,
        message
    };


  const req = new Request(uri, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(body),
  });


  fetch(req)
    .then(resp => resp.json())
    .then((data) => {
      if (data.suceess) {
        document.getElementById('form-messages').innerHTML = `<div class="dialog true"> We have received your feedback and would get to you shortly, </br>Thanks so much...</div>`;
        document.getElementById('form-messages').class = 'true';
        document.getElementById('subject').value = '';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        return false;
      } else {
        const errs = data.errors;
        let errorValues = '';

        for (let key in errs) {
          errorValues = errorValues + `${errs[key]} </br>`;
        }
        document.getElementById('form-messages').innerHTML = `<div class="dialog false"> ${errorValues} </div>`;
        document.getElementById('form-messages').class = 'false';
        document.getElementById('subject').focus();
        return false;
      }

    });
  return false;
}