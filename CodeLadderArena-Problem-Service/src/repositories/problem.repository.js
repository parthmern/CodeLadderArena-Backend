const logger = require("../config/logger.config");
const NotFound = require("../errors/notfound.error");
const { Problem } = require("../models");


class ProblemRepository {

    async createProblem(problemData){

        try{
            const problem = await Problem.create({
                title : problemData.title ,
                description : problemData.description ,
                difficulty : problemData.difficulty ,
                testCases : problemData.testCases ? problemData.testCases : [] ,
                editorial : problemData.editorial
            })

            return problem ;
        }
        catch(error){
            console.log("error ==>", error);
            throw error; 
        }   
        
    }

    async getAllProblems(){
        try{
            const problems = await Problem.find({});

            return problems ;
        }
        catch(error){
            console.log("error at getAllProblems repository lvl ==>", error);
            throw error; 
        }   
    }


    async getProblem(id){
        try{
            const problem = await Problem.findById(id);
            if(!problem){
                throw new NotFound("Problem", id);
            }
            return problem;
        }
        catch(error){
            console.log("error at getProblem repository lvl ==>", error);
            throw error; 
        }
    }

    async deleteProblem(id) {
        try {
            const deletedProblem = await Problem.findByIdAndDelete(id);
            if(!deletedProblem) {
                logger.error(`problem.repository: Problem with Id: ${id} not found in db`);
                throw new NotFound("problem", id);
            }
            return deletedProblem;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


}

module.exports = ProblemRepository ;