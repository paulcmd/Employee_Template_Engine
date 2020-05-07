// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(_name, _id, _email, _github){
        super(_name, _id, _email)

        this.github = _github;

    }

    getSchool(){
        return this.school;
    }

    getRole(){
        return "Engineer";
    }

}

module.exports = Engineer;;