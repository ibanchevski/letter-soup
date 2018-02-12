const TeacherModel = require('../models/Teacher');
const Q = require('q');
const bcrypt = require('bcrypt');

const saltRounds = 8;

class Teacher {
    constructor() {}

    /**
     * Registers new teacher by given teacherObject
     * @param {Object} teacherObject The object containig all teacher's data (name, school, subject, etc.)
     */
    static register(teacherObject) {
        const deferred = Q.defer();

        // Hash teacher's password
        const teacherPassword = bcrypt.hashSync(teacherObject.password, saltRounds);
        TeacherModel.count({"email": teacherObject.email}, function(error, count) {
            if (error) {
                deferred.reject(error);
                return;
            }
            
            if (count !== 0) {
                deferred.reject('Вече съществува регистриран потребител с този email адрес!');
                return;
            }

            // Create the teacher record
            new TeacherModel({
                firstName: String(teacherObject.firstName),
                lastName: String(teacherObject.lastName),
                city: String(teacherObject.city),
                school: String(teacherObject.school),
                email: String(teacherObject.email),
                password: teacherPassword,
                subjects: [teacherObject.subject]
            }).save(function(error) {
                if (error) {
                    // TODO: Handle errror
                    deferred.reject(error);
                    return;
                }
                deferred.resolve('Registration successful!');
            });
        });

        return deferred.promise;
    }
}
module.exports = Teacher;