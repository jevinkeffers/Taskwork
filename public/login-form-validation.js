window.addEventListener('keyup', (event) => {
    // Retrieves value from input box
    emailInput = document.getElementById('emailInput');
    passwordInput = document.getElementById('passwordInput');
    // emailError = document.getElementById('emailError');
    emailValue = emailInput.value;
    passwordValue = passwordInput.value;
    
    //Initializing boolean tests
    var ampisthere = false;
    var spacesthere = false;
    var textbeforeamp = false;
    var textafteramp = false;
    var dotafteramp = false;
    var othererror = false;
    var textafterdor = false;
    var error = '';

    //looping through the string
    for (var i = 0; i < emailValue.length; i++) {
        //if @ is found in string
        if (emailValue.charAt(i) == '@') {
            //contine search for other possible errors
            if (ampisthere)
                othererror = true;
            //close test for @ sign
            ampisthere = true;
        } else if (!ampisthere)
            //close test for preceeding text
            textbeforeamp = true;
        //if a dot is encountered in string close test
        else if (emailValue.charAt(i) == '.')
            dotafteramp = true;


        else
            // if dot is not encountered after @ end test for preceeding text
            textafteramp = true;
        
        if(dotafteramp == true && i > i-1){
            textafterdor = true;
        }

        if (emailValue.charAt(i) == ' ' || emailValue.charAt(i) == ',')
            spacesthere = true;

    }

    if (spacesthere || !ampisthere || !textafteramp
        || !textbeforeamp || !dotafteramp || othererror ||!textafterdor) {
        error += "This email is invalid"
        document.getElementById("emailError").innerHTML = "This email is invalid";
        // error += " addresses with no commas or spaces\n";
    }else{
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("emailInput").classList.remove('is-danger');
    }


    if(passwordValue!= ''){
        document.getElementById("passwordInput").classList.remove('is-danger');
    }
  

    console.log(error)
});

