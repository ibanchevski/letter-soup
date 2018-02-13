const TeacherModel = require('../models/Teacher');
const Q = require('q');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
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
                deferred.resolve('Регистрацията успешна!');
            });
        });

        return deferred.promise;
    }

    /**
     * Authenticate a teacher with given email and password
     * @param {string} email Teacher's email
     * @param {string} password Teacher's password
     */
    static authenticate(email, password) {
        const deferred = Q.defer();
        let teacherToken;
        TeacherModel.findOne({"email": String(email)}, function(error, teacherDoc) {
            let matchingPassword;
            if (error) {
                deferred.reject(error);
                return;
            }
            if (teacherDoc === null) {
                deferred.reject(new Error('Няма регистриран учител с този email адрес!'))
                return;
            }
            matchingPassword = bcrypt.compareSync(password, teacherDoc.password);
            if (matchingPassword === false) {
                deferred.reject(new Error('Грешен email адрес или парола!'))
                return;
            }
            
            // Sign new token that expires in 8 hours
            teacherToken = jwt.sign({ email: teacherDoc.email }, config.tokenSecret, { expiresIn: '8h' });
            deferred.resolve(teacherToken);
        });

        return deferred.promise;
    }
}
module.exports = Teacher;