// import { StatusCodes } from 'http-status-codes';   // not working

const { StatusCodes } = require("http-status-codes");
const NotImplemented = require("../errors/notImplemented.error");
const { ProblemRepository } = require("../repositories");
const { ProblemService } = require("../services");
const logger = require("../config/logger.config");

const problemService = new ProblemService(new ProblemRepository());

async function pingProblemController(req, res){
    logger.info("pingProblemController is up")
    return(
        res.status(StatusCodes.OK).json({
            message : "pingProblemController is up"
        })
    )
}


// adding problem
async function addProblem(req, res, next){
    
    try{

        console.log("req.body=>", req.body);

        const newProblem = await problemService.createProblem(req.body);

        console.log("last log problem created =>");

        return(
            res.status(StatusCodes.OK).json(
                {
                    success : true,
                    message : "Successfully create a new problem",
                    error : {},
                    data : newProblem
                }
            )
        )
        
    }catch(error){

        // last middleware going to call here "errorHandler"
        next(error);
    }

}

// get all problems
async function getProblems(req, res, next){
    try{
        const allProblems = await problemService.getAllProblems();

        return(
            res.status(StatusCodes.OK).json(
                {
                    success : true,
                    message : "Successfully got all Problems",
                    error : {},
                    data : allProblems
                }
            )
        )
    }catch(error){
        next(error);
    }
}

// get single problems
async function getProblem(req, res, next){
    try{
        
        const problem = await problemService.getProblem(req?.params?.id);

        console.log("getProblem single=>", problem);

        return(
            res.status(StatusCodes.OK).json(
                {
                    success : true,
                    message : "Successfully got Problem",
                    error : {},
                    data : problem
                }
            )
        )
        
    }catch(error){
        next(error);
    }
}

// delete single problem
async function deleteProblem(req, res, next) {
    try {
        const deletedProblem = await problemService.deleteProblem(req.params.id);
        console.log("deletedProblem=>", deletedProblem);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully deleted the problem',
            error: {},
            data: deletedProblem
        });
    } catch(error) {
        next(error);
    }
}

// update problem
async function updateProblem(req, res, next){
    try{
        throw new NotImplemented("updateProblem");
        
    }catch(error){
        next(error);
    }
}

module.exports = {
    addProblem,
    getProblems,
    getProblem, 
    deleteProblem,
    updateProblem,
    pingProblemController
}