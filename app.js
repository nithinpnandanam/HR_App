// localStorage.clear();
const getDataLocation = () => {
    fetch("JSON/employee.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("employeeData", JSON.stringify(data));
        window.location.reload()
      });
  };
  
  localStorage.getItem("employeeData") === null && getDataLocation();
  
  //Common Selections
  let employee_id = document.getElementById("employee_id");
  let name = document.getElementById("name");
  let DOB = document.getElementById("DOB");
  let age = document.getElementById("age");
  let email = document.getElementById("email");
  let experiance = document.getElementById("experiance");
  let DOJ = document.getElementById("DOJ");
  let designation = document.getElementById("designation");
  let skills = document.getElementById("skills");
  let location_detail = document.getElementById("location_detail");
  let modal_box_add = document.getElementById("modal_box_add");
  let modal_box_edit = document.getElementById("modal_box_edit");
  let employee_id_v = document.getElementById("employee_id_v");
  let name_v = document.getElementById("name_v");
  let DOB_v = document.getElementById("DOB_v");
  let age_v = document.getElementById("age_v");
  let email_v = document.getElementById("email_v");
  let experiance_v = document.getElementById("experiance_v");
  let DOJ_v = document.getElementById("DOJ_v");
  let designation_v = document.getElementById("designation_v");
  let skills_v = document.getElementById("skills_v");
  let location_detail_v = document.getElementById("location_detail_v");
  let idOfEmployee=106
  localStorage.setItem("idOfEmployee",JSON.stringify(idOfEmployee));
  
  
  // Creating table and adding the initial data
  let parent = document.getElementById("parent");
  
  let main_table = document.createElement("table");
  main_table.setAttribute("id", "main_table");
  parent.appendChild(main_table);
  
  // Function to add initial data
  function addInitialData(X) {
    let tbody = document.createElement("tbody");
    let t_r_1 = document.createElement("tr");
    let t_h_1 = document.createElement("th");
    t_h_1.setAttribute("id","empIDhead")
    t_h_1.innerHTML = "Employee ID";
    let t_h_2 = document.createElement("th");
    t_h_2.innerHTML = "Name";
    let t_h_3 = document.createElement("th");
    t_h_3.innerHTML = "Email";
    let t_h_4 = document.createElement("th");
    t_h_4.innerHTML = "Skills";
    let t_h_5 = document.createElement("th");
    t_h_5.innerHTML = "Actions";
    tbody.appendChild(t_r_1);
    t_r_1.appendChild(t_h_1);
    t_r_1.appendChild(t_h_2);
    t_r_1.appendChild(t_h_3);
    t_r_1.appendChild(t_h_4);
    t_r_1.appendChild(t_h_5);
  
    const full_data = JSON.parse(localStorage.getItem(X));
    full_data["details"].forEach((element) => {
      let table_row = document.createElement("tr");
      table_row.setAttribute("class", "tableRow");
      for (let i = 1; i <= 5; i++) {
        let table_data = document.createElement("td");
        if (i === 1) {
          table_data.setAttribute('class',"right-align")
          table_data.innerHTML = `${element.employee_id}`;
          table_row.appendChild(table_data);
        } else if (i === 2) {
          table_data.innerHTML = `${element.name}`;
          table_row.appendChild(table_data);
        } else if (i === 3) {
          table_data.innerHTML = `${element.email_id}`;
          table_row.appendChild(table_data);
        } else if (i === 4) {
          table_row.appendChild(addSkillInTableData(element["skills"]));
        } else {
          let icons = document.createElement("div");
          icons.setAttribute("class", "icons");
          let sub_icon_1 = document.createElement("i");
          sub_icon_1.setAttribute("class", "fa-solid fa-eye");
          sub_icon_1.setAttribute("id", element.employee_id);
          sub_icon_1.setAttribute("onclick", modal_box_view_fn);
          sub_icon_1.onclick = () => modal_box_view_fn();
  
          
          let sub_icon_2 = document.createElement("i");
          sub_icon_2.setAttribute("class", "fa-solid fa-pen-to-square");
          sub_icon_2.setAttribute("id", element.employee_id);
          sub_icon_2.setAttribute("onclick", modal_box_edit_fn);
          sub_icon_2.onclick = () => modal_box_edit_fn()
  
  
  
          let sub_icon_3 = document.createElement("i");
          sub_icon_3.setAttribute("class", "fa-solid fa-trash");
          sub_icon_3.setAttribute("id", element.employee_id);
          sub_icon_3.setAttribute("onclick", modal_delete);
          sub_icon_3.onclick = () => modal_delete();
          
          icons.appendChild(sub_icon_1);
          icons.appendChild(sub_icon_2);
          icons.appendChild(sub_icon_3);
          table_data.appendChild(icons);
          table_row.appendChild(table_data);
        }
      }
      tbody.appendChild(table_row);
  
    });
    main_table.replaceChildren(tbody);
  }
  
  addInitialData("employeeData");
  
  // Clicking add new employee button to show modal box
  let add_new_btn = document.getElementById("add_new");
  add_new_btn.addEventListener("click", () => {
    modal_box_add.style.display = "block";
    const id_of_employee = JSON.parse(localStorage.getItem("idOfEmployee"));
    employee_id.value= id_of_employee ;
    clearInput()
    employee_id.readOnly = true;
  });
  
  //closng after adding new employee using both cross and submit button
  let add_cross = document.getElementById("add_cross");
  add_cross.addEventListener("click", add_modal_close);
  
  
  function add_modal_close() {
    modal_box_add.style.display = "none";
  }
  
  let submit_btn = document.getElementById("submit_btn");
  submit_btn.addEventListener("click", add_modal_submit_close);
  
  //closing add modal using close button
  let close_btn_add = document.getElementById("add_close");
  close_btn_add.addEventListener("click", add_modal_close);
  
  //Adding details of the employee using submit button
  submit_btn.addEventListener("click", addingData);
  
  function addingData() {
    let new_data_obj = {};
    let table_row = document.createElement("tr");
    // adding data to table when user fills data
  
    let submit_count = 0;
    for (let i = 1; i <= 12; i++) {
      let table_data = document.createElement("td");
      if (i === 1) {
        table_data.setAttribute('class',"right-align")
        table_data.innerHTML = employee_id.value;
        if (appendDataToRow(table_row,table_data)){
          submit_count++
        }
        
        new_data_obj["employee_id"] = +employee_id.value;
        
        // new_data_obj["employee_id"] = id_of_employee 
        
      } else if (i === 2) {
        table_data.innerHTML = name.value;
        if (appendDataToRow(table_row,table_data)){
          submit_count++
        }
        new_data_obj["name"] = name.value;
      } else if (i === 3) {
        if (ValidateEmail(email.value) === true) {
          table_data.innerHTML = email.value;
          new_data_obj["email_id"] = email.value;
          if (appendDataToRow(table_row,table_data)){
            submit_count++
          }
        } else {
          modal_box_add.style.display = "block";
        }
      } else if (i === 4) {
      employee_skill_array=[]
      Object.values(document.getElementById("inner_skill_div").children).forEach((element)=>{
          employee_skill_array.push(element.textContent)
      })
    
      if (employee_skill_array.length>=1){
          submit_count++
          new_data_obj["skills"]=employee_skill_array
          table_row.appendChild( addSkillInTableData(employee_skill_array));
  
      }else{
        modal_box_add.style.display = "block";
      }
      } else if (i === 5) {
        let table_data = document.createElement("td");
        let icons = document.createElement("div");
        icons.setAttribute("class", "icons");
        let sub_icon_1 = document.createElement("i");
        sub_icon_1.setAttribute("class", "fa-solid fa-eye");
        sub_icon_1.setAttribute("id", employee_id.value);
        sub_icon_1.setAttribute("onclick", modal_box_edit_fn);
        sub_icon_1.onclick = () => modal_box_view_fn();
  
        let sub_icon_2 = document.createElement("i");
        sub_icon_2.setAttribute("class", "fa-solid fa-pen-to-square");
        sub_icon_2.setAttribute("id", employee_id.value);
        sub_icon_2.setAttribute("onclick", modal_box_edit_fn);
        sub_icon_2.onclick = () => modal_box_edit_fn()
  
  
        let sub_icon_3 = document.createElement("i");
        sub_icon_3.setAttribute("class", "fa-solid fa-trash");
        sub_icon_3.setAttribute("id", employee_id.value);
        sub_icon_3.setAttribute("onclick", modal_delete);
        sub_icon_3.onclick = () => modal_delete();
        icons.appendChild(sub_icon_1);
        icons.appendChild(sub_icon_2)
        icons.appendChild(sub_icon_3);
        table_data.appendChild(icons);
        table_row.appendChild(table_data);
  
        
      } else if (i === 6) {
        new_data_obj["DOB"] = DOB.value;
        submit_count++;
      } else if (i === 7) {
        if(age.value===""){
          
        }else if(new_data_obj["Age"] = age.value){
          submit_count++;
        }
        // new_data_obj["Age"] = getAge(DOB.value)
      } else if (i === 9) {
        new_data_obj["experiance"] = experiance.value;
        submit_count++;
      } else if (i === 10) {
        if(designation.value!==''){
          new_data_obj["designation"] = designation.value;
          submit_count++;
        } 
      }else if (i === 11) {
        if(location_detail.value!==""){
          new_data_obj["contact_details"] = location_detail.value;
          submit_count++;
        }
      } else if (i === 12) {
        if(DOJ.value!==""){
          new_data_obj["DOJ"] = DOJ.value;
          submit_count++;
        }
      }
    }
    if (submit_count === 10) {
        const full_data = JSON.parse(localStorage.getItem("employeeData"));
        full_data["details"].push(new_data_obj);
        localStorage.setItem("employeeData", JSON.stringify(full_data));
        main_table.appendChild(table_row);
        clearInput()
        employee_id.value++
        localStorage.setItem("idOfEmployee",JSON.stringify(employee_id.value));
        modal_box_add.style.display = "none";
    }
    
  }
  
  
  function add_modal_submit_close() {
    if(employee_id.value === "" ||
    name.value === "" ||
    DOB.value === "" ||
    age.value === "" ||
    email.value === "" ||
    experiance.value === "" ||
    DOJ.value === "" ||
    designation.value === "" ||
    location_detail.value === ""){
      modal_box_add.style.display = "block";
      alert("You have to fill all the fields")
    }
    else if(ValidateEmail(email.value)===false){
      modal_box_add.style.display = "block";
      alert("Email is invalid")
    }
    else if (
      employee_id.value !== "" &&
      name.value !== "" &&
      DOB.value !== "" &&
      age.value !== "" &&
      email.value !== "" &&
      experiance.value !== "" &&
      DOJ.value !== "" &&
      designation.value !== "" &&
      location_detail.value !== ""
    ) {
      modal_box_add.style.display = "none";
    }
  
  }
  
  
  function appendDataToRow(table_row,table_data){
    if (table_data.innerHTML !== "") {
      table_row.appendChild(table_data);
      return true
    }
  }
  
  addingSkillChips(skills,"inner_skill_div")
  
  
  // Viewing details of the employee
  function modal_box_view_fn() {
    let id = event.target.id;
    modal_box_view.style.display = "block";
    const full_data = JSON.parse(localStorage.getItem("employeeData"));
    full_data["details"].forEach((element) => {
      
      if (+event.target.id === +element.employee_id) {
        
        employee_id_v.value = element.employee_id 
        name_v.value = element.name;
        DOB_v.value = element["DOB"];
        age_v.value = element.Age;
        email_v.value = element.email_id;
        experiance_v.value = element.experiance;
        DOJ_v.value=element.DOJ
        designation_v.value = element.designation;
        location_detail_v.value = element.contact_details;
        
        employee_id_v.readOnly = true;
        name_v.readOnly = true;
        DOB_v.readOnly = true;
        age_v.readOnly = true;
        email_v.readOnly = true;
        experiance_v.readOnly = true;
        DOJ_v.readOnly = true;
        designation_v.readOnly = true;
        location_detail_v.readOnly = true;
  
        let outer_skill_div_v = document.getElementById("outer_skill_div_v")
        removeAllChildNodes(outer_skill_div_v)
        element.skills.forEach((element, index) => {
          let table_data_new = document.createElement("p");
          table_data_new.setAttribute("class", "inline_prop");
          let skillButton = document.createElement("button");
          skillButton.setAttribute("class","allSkillBtnStyle")
          skillButton.innerHTML = `${element}`;
          table_data_new.appendChild(skillButton);
          outer_skill_div_v .appendChild(table_data_new);
        })
          
        
        
        
      }
    });
  }
    addingSkillChips(skills_new,"inner_skill_div_new")
  
    // Editing details
    function modal_box_edit_fn() {
      let id=event.target.id
      modal_box_edit.style.display = "block";
      const full_data = JSON.parse(localStorage.getItem("employeeData"));
      full_data["details"].forEach((element) => {
        
        if (+event.target.id === +element.employee_id) {
           document.getElementById("name_!").value= element.name;
           element.name=document.getElementById("name_!").value
           document.getElementById("email_!").value= element.email_id;
           element.email_id=document.getElementById("email_!").value
           document.getElementById("experiance_!").value= element.experiance;
           element.experiance=document.getElementById("experiance_!").value
           document.getElementById("designation_!").value= element.designation;
           element.designation=document.getElementById("designation_!").value
           document.getElementById("location_detail_!").value=element.contact_details;
           element.contact_details=document.getElementById("location_detail_!").value
           
          
          let parentInner=document.getElementById("inner_skill_div_new")
          removeAllChildNodes(parentInner)
          element.skills.forEach((element)=>{
            let span_data = document.createElement("span");
            span_data.setAttribute("class","skill_button allSkillBtnStyle countBtn span_data")
            span_data.innerHTML = element;
            let i_tag=document.createElement("i")
            i_tag.setAttribute("class","fa-solid fa-xmark")
            i_tag.setAttribute("id",element)
            i_tag.setAttribute("onclick",closeSkill)
            i_tag.onclick=()=>closeSkill("inner_skill_div_new")
            span_data.appendChild(i_tag)
            document.getElementById("inner_skill_div_new").prepend(span_data)
          })
          
          employee_skill_array=[]
          Object.values(document.querySelector("#inner_skill_div_new").children).forEach(element=>{
              employee_skill_array.push(element.textContent)
          })
          if(employee_skill_array.length>=1){
            element.skills=employee_skill_array
          }
        }
      })
      function edit_btn_fn(id) {
        let isEdited=false
        const full_data = JSON.parse(localStorage.getItem("employeeData"));
        full_data["details"].forEach((element) => {
          if (+id === +element.employee_id) {
            // document.getElementById("name_!").value !== "" ? (element.name = document.getElementById("name_!").value):((alert("You have to fill all the fields"))&&(modal_box_edit.style.display = block));
  
            if(document.getElementById("name_!").value !== ""){
              element.name = document.getElementById("name_!").value
            }else{
              alert("You have to fill all the fields")
              modal_box_edit.style.display = block
            }
            
    
            if ((document.getElementById("email_!").value !== "") &&(ValidateEmail(document.getElementById("email_!").value) === true)) {
              element.email_id = document.getElementById("email_!").value;
            }else if(ValidateEmail(document.getElementById("email_!").value) === false) {
              alert("plaese enter a valid email")
              modal_box_edit.style.display = block;
            }
    
            if(document.getElementById("designation_!").value !== "" ){
              element.designation = document.getElementById("designation_!").value
            }else{
              alert("You have to fill all the fields")
              modal_box_edit.style.display = block
            }
            // document.getElementById("designation_!").value !== "" ? (element.designation = document.getElementById("designation_!").value):(modal_box_edit.style.display = block);
            employee_skill_array=[]
            Object.values(document.querySelector("#inner_skill_div_new").children).forEach(element=>{
                employee_skill_array.push(element.textContent)
            })
            if(employee_skill_array.length>=1){
              element.skills=employee_skill_array
              isEdited=true
            }
  
            if(document.getElementById("location_detail_!").value !== ""){
              element.contact_details = document.getElementById("location_detail_!").value
            }else{
              alert("You have to fill all the fields")
              modal_box_edit.style.display = block
            }
  
            // document.getElementById("location_detail_!").value !== ""? (element.contact_details = document.getElementById("location_detail_!").value) :(modal_box_edit.style.display = block);
            if(isEdited===true){
              localStorage.setItem("employeeData", JSON.stringify(full_data));
              addInitialData("employeeData");
              modal_box_edit.style.display = "none";
            }
          }
        });
      }
      edit_btn.setAttribute("onclick", edit_btn_fn);
      edit_btn.onclick = () => edit_btn_fn(id);
    }
  
  
  
  // for closing the modal for view
  let view_cross = document.getElementById("view_cross");
  view_cross.addEventListener("click", modal_view_close);
  function modal_view_close() {
    modal_box_view.style.display = "none";
  }
  
  //for closing the modal box for edit
  let edit_cross = document.getElementById("edit_cross");
  edit_cross.addEventListener("click", modal_edit_close);
  function modal_edit_close() {
    modal_box_edit.style.display = "none";
  }
  
  //closing edit modal box by clicking close button
  let edit_close = document.getElementById("edit_close");
  edit_close.addEventListener("click", modal_edit_close);
  
  // for showing delete confirmation box
  function modal_delete() {
    let modal_box_delete = document.getElementById("modal_box_delete");
    modal_box_delete.style.display = "block";
    let id = event.target.id;
    deleteEmployee(id);
  }
  
  // for hiding delete confirmatio box
  let delete_cross = document.getElementById("delete_cross");
  delete_cross.addEventListener("click", modal_confirmation_close);
  let no_btn = document.getElementById("no");
  no_btn.addEventListener("click", modal_confirmation_close);
  function modal_confirmation_close() {
    let modal_box_delete = document.getElementById("modal_box_delete");
    modal_box_delete.style.display = "none";
  }
  
  //for deleting the detalils when yes is clicked in the confirmation box
  function deleteEmployee(id) {
    const full_data = JSON.parse(localStorage.getItem("employeeData"));
    let yesBtn = document.getElementById("yes");
    yesBtn.addEventListener("click", modal_confirmation_close);
    yesBtn.addEventListener("click", () => {
      full_data["details"].forEach((element, index) => {
        if (id == element.employee_id) {
          full_data["details"].splice(index, 1);
          localStorage.setItem("employeeData", JSON.stringify(full_data));
          addInitialData("employeeData");
        }
      });
    });
  }
  
  // Validating Email
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    else{
      return false;
    }
    
  }
  
  const sortName = (array) => {
    return array.sort(function (a, b) {
      let firstTest = a.name.toUpperCase();
      let secondText = b.name.toUpperCase();
      return firstTest < secondText ? -1 : firstTest > secondText ? 1 : 0;
    });
  };
  
  const sort_employee_id = (array) => {
    return array.sort(function (a, b) {
      let x = a.employee_id;
      let y = b.employee_id;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };
  
  // Sorting value
  let getSortValue = () => {
    if (
      sort_label.options[sort_label.selectedIndex].innerHTML === "Sort By Employee ID"
    ) {
      const full_data = JSON.parse(localStorage.getItem("employeeData"));
      sort_employee_id(full_data.details);
      localStorage.setItem("employeeData", JSON.stringify(full_data));
      addInitialData("employeeData");
    } else if (
      sort_label.options[sort_label.selectedIndex].innerHTML === "Sort By Employee Name"
    ) {
      const full_data = JSON.parse(localStorage.getItem("employeeData"));
      sortName(full_data.details);
      localStorage.setItem("employeeData", JSON.stringify(full_data));
      addInitialData("employeeData");
    }
  };
  getSortValue();
  
  
  //Filtering
  let filter_search = document.getElementById("filter_search");
  filter_search.addEventListener("keyup", function (event) {
    let tableRow = document.querySelectorAll(".tableRow");
    let word = event.target.value.toLowerCase();
    tableRow.forEach((element) => {
      let skillArray = element.querySelectorAll(".skill_td p button ");
      let isAvailable = false;
      skillArray.forEach((x) => {
        x.innerHTML.toLowerCase().startsWith(word) && (isAvailable = true);
        isAvailable
          ? (element.style.display = "")
          : (element.style.display = "none");
      });
    });
  });
  
  //getting of an array of all the skills rom JSON
  function get_all_skill(boolCondition){
      const full_data = JSON.parse(localStorage.getItem("employeeData"));
      allSkillArray=[]
      if(boolCondition===true){
          full_data.skill_info.forEach(element => {
              skill= element.skill.toLowerCase().replace(/\s/g, '')
              allSkillArray.push(skill)
          });
          return allSkillArray
      }else{
          full_data.skill_info.forEach(element => {
              allSkillArray.push(element.skill)
          });
          return allSkillArray
      } 
  }
  
  // Function to clear input after adding employee details
  function clearInput(){
      name.value= ''
      DOB.value= ''
      age.value = ''
      email.value = ''
      experiance.value = ''
      DOJ.value = ''
      designation.value = ''
      skills.value = ''
      location_detail.value = ''
      let children = document.getElementById("inner_skill_div")
      children.innerHTML=''
      
  }
  
  // Adding skills from an array to the table
  function addSkillInTableData(skillArray){
    let table_data = document.createElement("td");
    table_data.setAttribute("class", "skill_td");
    skillArray.forEach((element, index) => {
      let table_data_new = document.createElement("p");
      table_data_new.setAttribute("class", "inline_prop");
      let skillButton = document.createElement("button");
      skillButton.setAttribute("class","allSkillBtnStyle")
      skillButton.innerHTML = `${element}`;
      table_data_new.appendChild(skillButton);
      table_data.appendChild(table_data_new);
    })
    return table_data
  }
  
  // Adding skills as chips 
  function addingSkillChips(inputSkills,divForSkill){
    inputSkills.addEventListener("keyup", (e) => {
      if ((e.key === "Enter") && (inputSkills.value!=="")){
        let span_data = document.createElement("span");
        span_data.setAttribute("class","skill_button allSkillBtnStyle span_data")
        if((get_all_skill(true).includes(inputSkills.value.toLowerCase())) &&(!initialSkillArray.includes(inputSkills.value.toLowerCase()))){
          let index = get_all_skill(true).indexOf(inputSkills.value.toLowerCase())
          span_data.innerHTML = get_all_skill(false)[index]
          let i_tag=document.createElement("i")
            i_tag.setAttribute("class","fa-solid fa-xmark")
            i_tag.setAttribute("id",`${get_all_skill(false)[index]}`)
            i_tag.setAttribute("onclick",closeSkill)
            i_tag.onclick=()=>closeSkill(divForSkill)
            span_data.appendChild(i_tag)
          document.getElementById(divForSkill).prepend(span_data)
        }
        inputSkills.value = "";
      }
    
      initialSkillArray=[]
      Object.values(document.getElementById(divForSkill).children).forEach(element=>{
        initialSkillArray.push(element.textContent.toLowerCase().replace(/\s/g, ''))
      })  
    });
  }
  
  // Removing all the children fron a div
  function removeAllChildNodes(parentInner){ 
    while (parentInner.firstChild) {
        parentInner.removeChild(parentInner.firstChild);
    }
  }
  
  // deleting skills as chips
  function closeSkill(divForSkill){
    Object.values(document.getElementById(divForSkill).children).forEach(element=>{
        if(element.textContent===event.target.id){
            element.remove()
        }
    })
  }
  
  // const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
  