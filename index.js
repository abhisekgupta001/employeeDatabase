(async function(){
    const data = await fetch('./data.json')
    const res = await data.json();
    console.log(res);

    let employees = res;
    let selectedEmployeeId = employees[0].id;  //default value
    let selectedEmployee= employees[0];  //default selected object when page loads


    const employeeList = document.querySelector('.employeeList');
    const employeeInfo = document.querySelector('.employeeInfo');

    //Add Empoyee logic
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee__create");

    createEmployee.addEventListener("click",()=>{
        addEmployeeModal.style.display = "flex";
    });

    addEmployeeModal.addEventListener("click",(e)=>{
        if(e.target.className === 'addEmployee')
        {
            addEmployeeModal.style.display = "none";
        }
    })

    const dobInput = document.querySelector('.addEmployee__create--dob');
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5,10)}`;

    addEmployeeForm.addEventListener("submit",(e)=>{
        e.preventDefault();

        const formData = new FormData(addEmployeeForm)

        const values = [...formData.entries()];
        console.log(values);
        let empData = {};
        values.forEach((val)=>{
            empData[val[0]] = val[1];
        })

        empData.id = employees[employees.length - 1]?.id + 1;
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0,4),10);
        empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        employees.push(empData);
        selectedEmployeeId = empData.id;
        selectedEmployee = empData;
        renderEmployees();
        renderSingleEmployee();
        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none";
    })



    //selecting employee logic
    employeeList.addEventListener("click",(e)=>{
        if(e.target.tagName === "DIV" && selectedEmployeeId != e.target.id)
        {
            selectedEmployeeId = e.target.id;
            renderEmployees();
            renderSingleEmployee();
        }
        //deleting employee
        if(e.target.tagName === 'I')
        {
            employees = employees.filter((emp) => String(emp.id) !== e.target.parentNode.id);  
        }
        if(String(selectedEmployeeId) === e.target.parentNode.id)
        {
            selectedEmployeeId = employees[0]?.id || -1;
            selectedEmployee = employees[0] || {};
            renderSingleEmployee();
        }
        renderEmployees();
        
    })
    

    const renderEmployees=()=>{
        employeeList.innerHTML = ""
        employees.forEach(emp => {
            const employee = document.createElement("div");
            employee.classList.add("employee");

            if(parseInt(selectedEmployeeId,10) === emp.id)
            {
                employee.classList.add("active");
                selectedEmployee = emp;
            }
            employee.setAttribute("id", emp.id);
            employee.innerHTML =   `${emp.firstName} ${emp.lastName} <i class='bx bx-x'></i>`;
            employeeList.append(employee);
            renderSingleEmployee();
        });
    }


    //render single employee info
    const renderSingleEmployee = () =>{
        if(selectedEmployeeId === -1){
            employeeInfo.innerHTML = "";
            return;
        }

            employeeInfo.innerHTML = `
        <img class="dp" src=${selectedEmployee.imageUrl} alt="">
                    <p class="name">${selectedEmployee.firstName} ${selectedEmployee.lastName}</p>
                    <p class="address">${selectedEmployee.address}</p>
                    <p class="email">${selectedEmployee.email}</p>
                    <p class="mobile">Mobile: ${selectedEmployee.contactNumber}</p>
                    <p class="dob">DOB: ${selectedEmployee.dob}</p>
        `;

    }



    renderEmployees()
})()